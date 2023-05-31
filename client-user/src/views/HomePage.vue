<template>
  

  <!-- component -->

  <section class="bg-white md:w-3/4 flex mx-auto justify-center sm:w-full">
    <div class="container px-6 py-10 mx-auto">
      <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80"></p>

      <div class="mt-8">
        <CategoryMenu />
      </div>

      <div>
        <FilterButton />
      </div>

      <div
        class="grid grid-cols-1 gap-8 mt-4 xl:mt-6 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3"
      >
        <CuisineCard v-for="cuisine in cuisines" :key="cuisine.id" :cuisine="cuisine" />
      </div>

      <div v-if="cuisines.length === 0">
        <div class="flex justify-center font-semibold font-md">
          Sorry, we couldn't find any cuisine that matches your search. Please try again with
          different keywords.
        </div>
        <div class="flex justify-center font-md cursor-pointer" @click.prevent="handleClear">
          <span class="text-blue-400 font-md underline">Clear filter</span>❌
        </div>
      </div>

      <div class="mt-8" v-if="cuisines.length > 0">
        <PaginationButton />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'
import CuisineCard from '../components/CuisineCard.vue'
import PaginationButton from '../components/PaginationButton.vue'
import CategoryMenu from '../components/CategoryMenu.vue'
import FilterButton from '../components/FilterButton.vue'

export default {
  name: 'HomePage',
  components: {
    CuisineCard,
    PaginationButton,
    CategoryMenu,
    FilterButton
  },

  computed: {
    ...mapState(useCustomerStore, ['cuisines'])
  },

  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisines', 'fetchCategories']),
    handleClear() {
      this.fetchCuisines({})
      this.$router.push({ path: '/home' })
    }
  },

  created() {
    this.fetchCuisines({})
    this.fetchCategories()
  }
}
</script>

<style></style>
