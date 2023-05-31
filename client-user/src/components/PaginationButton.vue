<template>
  <div class="flex justify-center">
    <nav aria-label="Page navigation example">
      <ul class="flex list-style-none">
        <li class="page-item">
          <button
            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none cursor-pointer"
            :disabled="currentPage === 1"
            @click.prevent="handlePage(currentPage - 1)"
          >
            Previous
          </button>
        </li>
        <li class="page-item px-1" v-for="page in +totalPage" :key="page">
          <button
            class="page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-md cursor-pointer"
            :class="currentPage === page ? 'bg-blue-400 hover:bg-blue-300' : ''"
            @click.prevent="handlePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none cursor-pointer"
            :disabled="currentPage === totalPage"
            @click.prevent="handlePage(currentPage + 1)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCustomerStore } from '../stores/customer'

export default {
  name: 'PaginationButton',
  computed: {
    ...mapState(useCustomerStore, ['totalPage', 'currentPage'])
  },

  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisines']),
    handlePage(id) {
      const query = { ...this.$route.query, page: id }
      this.fetchCuisines(query)
      this.$router.push({ path: '/home', query })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style></style>
