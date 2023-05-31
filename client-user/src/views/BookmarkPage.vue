<template>
  <section class="bg-white md:w-3/4 flex mx-auto justify-center sm:w-screen">
    <div class="container px-6 py-10 mx-auto">
      <p class="text-center mb-8 text-4xl uppercase font-semibold">My Bookmark List</p>
      <div
        class="grid grid-cols-1 gap-8 mt-4 xl:mt-6 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3"
      >
        <CuisineCard v-for="cuisine in bookmark" :key="cuisine.id" :cuisine="cuisine.Cuisine"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'
import CuisineCard from '../components/CuisineCard.vue'

export default {
  name: 'Bookmark',
  components: {
    CuisineCard
  },
  computed: {
    ...mapState(useCustomerStore, ['bookmark'])
  },
  methods: {
    ...mapActions(useCustomerStore, ['fetchBookmark'])
  },
  created() {
    this.fetchBookmark()
  }
}
</script>

<style></style>
