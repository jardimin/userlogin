<template>
  <div class="teste">
    <div :is="user.connected ? 'profile' : 'login'"></div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'

export default {
  name: 'Home',

  computed: mapGetters([
    'user'
  ]),

  methods: mapActions([
    'logout'
  ]),

  components: {
    Login,
    Profile
  }

}
</script>

<style>

</style>
