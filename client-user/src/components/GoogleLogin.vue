<template>
  <div
    id="google-login"
    class="w-full text-center py-3 flex items-center justify-center transition duration-150"
  ></div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCustomerStore } from '../stores/customer'

export default {
  name: 'GoogleLogin',
  mounted() {
    google.accounts.id.initialize({
      client_id: '307796516631-2tjk6h42clk718or6vuaqo9k05uo31t0.apps.googleusercontent.com',
      callback: this.googleSignIn
    })
    google.accounts.id.renderButton(document.getElementById('google-login'), {
      theme: 'outline',
      size: 'large'
    })
  },
  methods: {
    ...mapActions(useCustomerStore, ['handleGoogleSignIn']),
    googleSignIn(data) {
      this.handleGoogleSignIn(data);
    }
  }
}
</script>

<style></style>
