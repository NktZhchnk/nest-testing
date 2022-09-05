<template>
  <div>
    <font-awesome-icon icon="times"/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios.post('/auth/login', {
      username: 'john',
      password: '0000',
    }).then((response) => {

    })
  }
}
</script>

<style lang="scss">
</style>
