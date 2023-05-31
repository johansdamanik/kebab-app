<template>
  <div id="google-login" class="w-full text-center py-3 flex items-center justify-center transition duration-150"></div>
</template>

<script>
export default {
    name: 'GoogleLogin',
    mounted() {
    google.accounts.id.initialize({
      client_id: '307796516631-2tjk6h42clk718or6vuaqo9k05uo31t0.apps.googleusercontent.com',
      callback: this.handleGoogleSignIn
    })
    google.accounts.id.renderButton(document.getElementById('google-login'), {
      theme: 'outline',
      size: 'large',
    })
  },
  methods: {
    handleGoogleSignIn(data) {
        this.$emit('handleGoogleSignIn', data)
    }
  }
}
</script>

<style>

</style>