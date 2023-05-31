<template>
  <div class="flex justify-center">
    <nav aria-label="Page navigation example">
      <ul class="flex flex-col sm:flex-row list-style-none">
        <li class="pt-2">
          <button
            class="page-link relative block py-1.5 px-3 rounded rounded-full border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-md cursor-pointer w-full sm:w-auto"
            :class="
              currentCategory === null || currentCategory === undefined
                ? 'bg-orange-400 hover:bg-orange-300'
                : 'hover:bg-orange-300 bg-orange-200'
            "
            @click.prevent="handleCategory()"
          >
            All
          </button>
        </li>
        <li class="page-item px-1 pt-2" v-for="category in categories" :key="category.id">
          <button
            class="page-link relative block py-1.5 px-3 rounded rounded-full border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-md cursor-pointer w-full sm:w-auto"
            :class="
              currentCategory === category.id
                ? 'bg-orange-400 hover:bg-orange-300'
                : 'hover:bg-orange-300 bg-orange-200'
            "
            @click.prevent="handleCategory(category.id)"
          >
            {{ category.name }}
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
  name: 'CategoryMenu',
  data() {
    return {
      currentCategory: null
    }
  },
  computed: {
    ...mapState(useCustomerStore, ['categories', 'currentPage'])
  },
  watch: {
    '$route.query.category'(newCategory) {
      if (!newCategory) {
        this.currentCategory = null
      }
    }
  },
  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisines']),
    handleCategory(id) {
      this.currentCategory = id
      this.fetchCuisines({ category: id })
      this.$router.push({ path: '/home', query: { category: id } })
    }
  }
}
</script>

<style></style>
