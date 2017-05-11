<template>
  <div class="mdl-grid" style="background-color: gainsboro;">
    <div class="mdl-cell mdl-cell--12-col">
      <h4>{{message.title}}</h4>
      <p v-if="message.desc">{{message.desc}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'message',
  computed: {
    ...mapGetters([
      'message'
    ])
  }
}
</script>

<style>

</style>
