<template>
  <div
    class="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10"
  >
    <div
      class=" logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
    >
      <img src="../assets/kebab.png" alt="Kebab Lord" srcset="" class="h-12"/>
    </div>
    <!-- SPACER -->
    <div class="grow h-full flex items-center justify-center"></div>
    <div class="flex-none h-full flex items-center justify-end px-3 space-x-3">
      <div class="flex items-center space-x-3 ">
        <p class="hidden md:block text-sm md:text-md text-black dark:text-white">{{ email }}</p>
        <button
          @click.prevent="handleLogout"
          class="flex items-center border border-[#FF7931] hover:text-white bg-white text-[#FF7931] dark:bg-slate-900 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-100 focus:outline-none focus:shadow-outline"
        >
          <svg
            class="h-6 w-6 text-[#FF7931] mr-2 "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span class="text-sm md:text-md text-[#FF7931]">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  emits: ['onLogOut'],
  data() {
    return {
      email: localStorage.getItem('email')
    }
  },
  methods: {
    handleLogout() {
      this.$emit('onLogOut')
    }
  }
}
</script>

<style></style>
