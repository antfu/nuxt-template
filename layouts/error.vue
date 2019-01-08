<template lang='pug'>
.container
  .title {{ error.statusCode }}
  .info {{ error.message }}
  .button(@click='$router.push("/")', v-if='error.statusCode === 404') Back
</template>

<script>
import HttpStatus from 'http-status'

export default {
  props: ['error'],
  head() {
    return {
      title: this.error.statusCode,
    }
  },
  mounted() {
    if (this.error.statusCode === 401) {
      this.$router.push({
        name: 'index',
        query: { redirect: this.$route.path },
      })
    }
  },
  computed: {
    status() {
      return HttpStatus[this.error.statusCode]
    },
  },
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 4em;
  line-height: 1em;
}
.info
{
  font-size: 20px;
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
