<template>
  <!-- component -->
  <section class="flex flex-col md:flex-row h-screen items-center">
    

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
    <div class="w-full h-100 ">
      <div class="flex flex-col items-center justify-center">

        <img src="https://i.ibb.co/HVzg5WV/kebab1.png" alt="" class="h-20 items-center justify-center flex" />
      </div>

        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Register to your account</h1>

        <form class="mt-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              v-model="email"
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="password"
            />
          </div>
          <button
            type="submit"
            class="w-full block bg-orange-400 hover:bg-orange-300 focus:bg-orange-300 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Sign up
          </button>
        </form>

        <div class="flex items-center justify-center mt-6">
          <hr class="border-gray-300 flex-1 mr-4" />
          <p class="text-sm">or continue with</p>
          <hr class="border-gray-300 flex-1 ml-4" />
        </div>
        <GoogleLogin />

        <p class="text-center">
          Already have an account?
          <RouterLink to="/login"  class="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">Sign in</RouterLink>
        </p>
      </div>
    </div>
    <div class="bg-white hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        src="https://i.ibb.co/XVQ0R6S/20230507144722-fpdl-in-beef-shawarma-dark-background-shawarma-with-beef-pita-bread-135427-8031.jpg"
        alt=""
        class="w-auto h-full object-cover"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia'
import { useCustomerStore } from '../stores/customer'
import GoogleLogin from '../components/GoogleLogin.vue'

export default {
  name: 'RegisterPage',
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCustomerStore, ['handleRegister']), 
    handleSubmit() {
      const value = {
        email: this.email,
        password: this.password
      }
      this.handleRegister(value)
    }
  }
}
</script>

<style></style>
