<template>
  <div class="font-sans antialiased">
    <nav
      class="flex items-center justify-between flex-wrap bg-orange-400 sm:p-4 md:p-6 p-4 fixed w-full z-10"
    >
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight select-none">KEBAB LORD</span>
      </div>
      <div class="block sm:hidden">
        <button
          @click.prevent="toggle"
          class="flex items-center px-3 py-2 border rounded text-white border-teal-light hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <a
            @click.prevent="handlePage('/home')"
            class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4 cursor-pointer"
          >
            <p class="font-semibold text-md text-white">Home</p>
          </a>
          <a
            @click.prevent="handlePage('/bookmark')"
            class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4 cursor-pointer"
          >
            <p class="font-semibold text-md text-white">Bookmark</p>
          </a>
        </div>
        <div>
          <a
            v-if="isLoggedIn"
            @click.prevent="logout"
            class="cursor-pointer no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-orange-400 border-white bg-white hover:border-transparent hover:bg-gray-100 mt-4 sm:mt-0 font-semibold"
            >Logout</a
          >
          <a
           v-if="!isLoggedIn"
            @click.prevent="login"
            class="cursor-pointer no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-orange-400 border-white bg-white hover:border-transparent hover:bg-gray-100 mt-4 sm:mt-0 font-semibold"
            >Login</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'

export default {
  name: 'NavBar',
  data() {
    return {
      open: false
    }
  },
  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisines']),
    toggle() {
      this.open = !this.open
    },
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    login() {
      this.$router.push('/login')
    },
    handlePage(destination) {
      this.$router.push({ path: destination })
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.access_token
    }
  }
}
</script>

<style></style>
