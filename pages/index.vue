<template lang="pug">
v-btn.primary
  span {{ msg }}
</template>


<script>
import axios from '~/plugins/axios'

export default {
  async asyncData() {
    const r = await axios.get('/')
    return r.data
  },
}
</script>
