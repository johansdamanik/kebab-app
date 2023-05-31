<template>
  <aside
    class="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-40 flex h-screen bg-[#1E293B]"
  >
    <!-- open sidebar button -->
    <div
      class="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-[#FF7931] bg-[#1E293B] absolute top-2 rounded-full h-12"
    >
      <div class="flex pl-4 items-center space-x-2"></div>
      <div
        class="flex items-center space-x-3 group bg-[#FF7931] pl-10 pr-2 py-1 rounded-full text-[#1E293B]"
      >
        <div class="transform ease-in-out duration-300 mr-12 text-white">{{ formattedText }}</div>
      </div>
    </div>
    <div
      @click.prevent="openNav()"
      class="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white bg-orange-500 hover:bg-[#f93131] absolute top-2 p-3 rounded-full text-white hover:rotate-45 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{3}"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    </div>
    <!-- MAX SIDEBAR-->
    <div class="max hidden mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
      <div
        @click="handleNav('dashboard-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]': currentSection === 'dashboard-section'
        }"
        class="cursor-pointer hover:ml-4 w-full hover:text-white bg-[#1E293B] text-white p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3 border-2 border-[#FF7931]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <div>Dashboard</div>
      </div>
      <div
        @click.prevent="handleNav('categories-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]': currentSection === 'categories-section'
        }"
        class="cursor-pointer hover:ml-4 w-full hover:text-white bg-[#1E293B] text-white p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3 border-2 border-[#FF7931]"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>

        <div>Categories</div>
      </div>
      <div
        @click.prevent="handleNav('cuisines-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]':
            currentSection === 'cuisines-section' || currentSection === 'cuisines-form'
        }"
        class="cursor-pointer hover:ml-4 w-full hover:text-white bg-[#1E293B] text-white p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3 border-2 border-[#FF7931]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
        <div>Cuisines</div>
      </div>
      <div
        @click.prevent="handleNav('histories-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]': currentSection === 'histories-section'
        }"
        class="cursor-pointer hover:ml-4 w-full hover:text-white bg-[#1E293B] text-white p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3 border-2 border-[#FF7931]"
      >
        <svg
          class="h-4 w-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path
            d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"
          />
          <line x1="9" y1="7" x2="13" y2="7" />
          <line x1="9" y1="11" x2="13" y2="11" />
        </svg>
        <div>Logs</div>
      </div>
    </div>
    <!-- MINI SIDEBAR-->
    <div class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
      <div
        @click.prevent="handleNav('dashboard-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]': currentSection === 'dashboard-section'
        }"
        class="cursor-pointer hover:ml-4 justify-end pr-5 text-white w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex border-2 border-[#FF7931]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </div>
      <div
        @click.prevent="handleNav('categories-section')"
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]':
            currentSection === 'categories-section'
        }"
        class="cursor-pointer hover:ml-4 justify-end pr-5 text-white w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex flex border-2 border-[#FF7931]"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <div
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]':
            currentSection === 'cuisines-section' || currentSection === 'cuisines-form'
        }"
        @click.prevent="handleNav('cuisines-section')"
        class="cursor-pointer hover:ml-4 justify-end pr-5 text-white w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex flex border-2 border-[#FF7931]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
      </div>
      <div
        :class="{
          'bg-orange-500 text-[#1E293B] hover:text-[#1E293B]': currentSection === 'histories-section'
        }"
        @click.prevent="handleNav('histories-section')"
        class="cursor-pointer hover:ml-4 justify-end pr-5 text-white w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex flex border-2 border-[#FF7931]"
      >
        <svg
          class="h-4 w-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path
            d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"
          />
          <line x1="9" y1="7" x2="13" y2="7" />
          <line x1="9" y1="11" x2="13" y2="11" />
        </svg>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['currentSection'],
  data() {
    return {
      role: localStorage.getItem('role')
    }
  },
  computed: {
    formattedText() {
      if (this.role === 'admin') {
        return (this.role = 'Admin')
      } else {
        return (this.role = 'Staff')
      }
    }
  },
  methods: {
    openNav() {
      const sidebar = document.querySelector('aside')
      const maxSidebar = document.querySelector('.max')
      const miniSidebar = document.querySelector('.mini')
      const maxToolbar = document.querySelector('.max-toolbar')
      const logo = document.querySelector('.logo')
      const content = document.querySelector('.content')

      if (sidebar.classList.contains('-translate-x-48')) {
        // max sidebar
        sidebar.classList.remove('-translate-x-48')
        sidebar.classList.add('translate-x-none')
        maxSidebar.classList.remove('hidden')
        maxSidebar.classList.add('flex')
        miniSidebar.classList.remove('flex')
        miniSidebar.classList.add('hidden')
        maxToolbar.classList.add('translate-x-0')
        maxToolbar.classList.remove('translate-x-24', 'scale-x-0')
        logo.classList.remove('ml-12')
        content.classList.remove('ml-12')
        content.classList.add('ml-12', 'md:ml-60')
      } else {
        // mini sidebar
        sidebar.classList.add('-translate-x-48')
        sidebar.classList.remove('translate-x-none')
        maxSidebar.classList.add('hidden')
        maxSidebar.classList.remove('flex')
        miniSidebar.classList.add('flex')
        miniSidebar.classList.remove('hidden')
        maxToolbar.classList.add('translate-x-24', 'scale-x-0')
        maxToolbar.classList.remove('translate-x-0')
        logo.classList.add('ml-12')
        content.classList.remove('ml-12', 'md:ml-60')
        content.classList.add('ml-12')
      }
    },
    handleNav(navigation) {
      this.$emit('changeSection', navigation)
    }
  }
}
</script>

<style></style>
