/* eslint-disable no-console */
import shell from 'shelljs'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import dayjs from 'dayjs'

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

async function updatePackageJson (version) {
  let content = (await fs.promises.readFile('./package.json')).toString()
  content = content.replace(/"version": ".*"/, `"version": "${version}"`)
  await fs.promises.writeFile('./package.json', content)
}

function exec (command) {
  if (shell.exec(command).code !== 0) {
    shell.exit(1)
    process.exit(1)
  }
}

(async () => {
  const current_version = (await fs.promises.readFile('./cli/_version')).toString().trim()
  const version_split = current_version.split('.')
  version_split[version_split.length - 1]++
  const suggest_version = version_split.join('.')

  console.log(chalk.cyan('\nRelease a new version ') + chalk.grey(`(current: ${current_version})`))
  const result = await inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: 'Version',
    default: suggest_version,
  }, {
    type: 'confirm',
    name: 'sure',
    message: 'Sure?',
    default: false,
  }, {
    type: 'confirm',
    name: 'lint',
    message: 'Lint?',
    default: false,
    when: ans => ans.sure,
  }, {
    type: 'confirm',
    name: 'git',
    message: 'Commit to git?',
    default: true,
    when: ans => ans.sure,
  }])

  if (!result.sure)
    return

  const version = result.version.trim()

  console.log()

  if (result.lint) {
    console.log(chalk.yellow.bold('» Running lint...'))
    exec('npm run lint')
  }

  console.log(chalk.yellow.bold('» Updating files...'))
  await fs.promises.writeFile('./meta/version.js', `export default '${version}'\n`)
  await fs.promises.writeFile('./cli/_version', version)
  await fs.promises.writeFile('./meta/release_date.js', `export default '${dayjs().format('YYYY-MM-DD HH:mm')}'\n`)
  await updatePackageJson(version)
  
  exec('npm i')

  if (result.git) {
    console.log(chalk.yellow.bold('» Committing...  '))
    exec('git add -A')
    exec(`git commit -m "Release for v${version}"`)
    exec(`git tag -a ${version} -m "Release for v${version}"`)
  }

  console.log(chalk.green.bold('√ Finished  \n'))
})()
  .catch(e => {
    console.error(e)
  })
