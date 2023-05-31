<template>
  <section id="login-section">
    <!-- Login form -->
    <section id="login-form-section">
      <img src="../assets/kebab.png" alt="" class="h-20 mx-auto mt-6" />
      <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">

        <div class="grid grid-cols-2 gap-4">
          <div
            class="p-4 cursor-pointer border-b-4 hover:bg-gray-100 border-t-4 border-t-transparent"
            @click.prevent="changePage('register-page')"
          >
            <h1 class="text-4xl font-medium text-left text-gray-400">Sign Up</h1>
          </div>
          <div class="p-4 border-t-4">
            <h1 class="text-4xl font-medium text-right">Login</h1>
          </div>
        </div>
        <form @submit.prevent="handleSubmit" class="my-10">
          <div class="flex flex-col space-y-5">
            <label for="email">
              <p class="font-medium text-slate-700 pb-2">Email address</p>
              <input
                v-model="email"
                type="email"
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>
            <label for="password">
              <p class="font-medium text-slate-700 pb-2">Password</p>
              <input
                v-model="password"
                type="password"
                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
            </label>

            <button
              type="submit"
              class="w-full my-3 py-3 font-medium text-white bg-[#FF7931] hover:bg-[#ff8247] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
          </div>
          <p class="text-center mt-3">- or -</p>

          <!-- Login Google -->
          <GoogleLogin @handleGoogleSignIn="handleGoogleSignIn"/>

          <p class="text-center">
            Not registered yet?
            <a href="#" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              ><span>Register now </span
              ><span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  /></svg></span
            ></a>
          </p>

        </form>
      </div>
    </section>
  </section>
</template>

<script>
import GoogleLogin from '../components/GoogleLogin.vue'

export default {
  name: 'LoginPage',
  components: {
    GoogleLogin,
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('login', { email: this.email, password: this.password })
    },
    changePage(destination) {
      this.$emit('changePage', destination)
    },
    handleGoogleSignIn(data) {
        this.$emit('handleGoogleSignIn', data)
    }
  }
}
</script>

<style></style>
