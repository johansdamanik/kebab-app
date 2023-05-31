<template>
  <div class="flex justify-center items-center mt-3">
    <div class="flex">
      <form @submit.prevent="handleFilter">
        <input
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Search"
          v-model="filter"
        />
        <button type="submit" class="pl-4 top-0 mt-5 mr-4">
          <svg
            class="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style="enable-background: new 0 0 56.966 56.966"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </form>
    </div>

    <div class="m-1">
      <svg class="h-10 w-1 text-gray-400">
        <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div>
      <div>
        <div class="relative flex mt-1">
          <!-- Dropdown toggle button -->
          <button
            @click.prevent="show = !show"
            class="flex items-center p-2 text-gray-500 rounded-md"
          >
            <div :class="$route.query.price === 'min' ? 'rotate-180' : ''">
              <div v-if="$route.query.price">
                <ion-icon name="funnel"></ion-icon>
              </div>
              <div v-else>Sort by</div>
            </div>
            <svg
              class="w-5 h-5 text-gray-500 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            v-show="show"
            class="absolute right-0 py-2 mt-6 bg-white rounded-md shadow-xl w-32 w-32 flex flex-col justify-center"
          >
            <button
              @click.prevent="handleSort('min')"
              class="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-400"
            >
              Lowest Price
            </button>
            <button
              @click.prevent="handleSort('max')"
              class="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-400"
            >
              Highest Price
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCustomerStore } from '../stores/customer'

export default {
  name: 'SearchButton',
  data() {
    return {
      filter: '',
      show: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisines']),
    handleSort(value) {
      const query = { ...this.$route.query, price: value }
      this.fetchCuisines(query)
      this.show = false
      this.$router.push({ path: '/home', query })
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.show = false
      }
    }
  },
  watch: {
    filter(newData) {
      const query = { ...this.$route.query, filter: newData }
      this.fetchCuisines(query)
      this.$router.push({ path: '/home', query })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style></style>
