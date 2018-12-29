
export default function (app) {

  app.get('/', (req, res) => {
    res.json({
      msg: 'Hello World',
    })
  })
  
}