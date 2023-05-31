<template>
  <div>
    <div class="pb-16" v-if="getPageName !== 'login' && getPageName !== 'register'" >
      <NavBar />
    </div>
    <div >
      <RouterView />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    getPageName() {
      return this.$route.name
    }
  }
}
</script>

<style></style>
