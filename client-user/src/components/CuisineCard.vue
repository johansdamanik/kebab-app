<template>
  <div>
    <div
      class="w-full shadow-lg rounded-lg p-3 hover:scale-105 transition ease-in-out duration-300"
    >
      <div class="h-64 bg-gray-300 rounded-lg dark:bg-gray-600">
        <img :src="cuisine.imgUrl" alt="" class="object-cover h-full w-full rounded-lg" />
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="flex-1">
          <h1 class="font-semibold text-base">{{ cuisine.name }}</h1>
          <p>{{ formattedPrice }}</p>
        </div>

        <div class="flex">
          <div
            @click.prevent="handleDetail(cuisine.id)"
            class="mr-1 h-10 w-10 bg-blue-400 hover:bg-blue-300 rounded-lg flex items-center justify-center cursor-pointer shadow-lg"
          >
            <ion-icon name="information-circle" style="color: white; font-size: 30px"></ion-icon>
          </div>
          <div v-if="$route.name !== 'bookmark'" @click.prevent="handleBookmark(cuisine.id)">
            <BookmarkButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'

import BookmarkButton from '../components/BookmarkButton.vue'

export default {
  name: 'CuisineCard',
  components: { BookmarkButton },
  props: ['cuisine'],
  computed: {
    formattedPrice() {
      return `Rp ${this.cuisine.price.toLocaleString('id-ID')}`
    }
  },
  methods: {
    ...mapActions(useCustomerStore, ['addBookmark', 'fetchBookmark']),
    handleDetail(id) {
      this.$router.push('/cuisine/' + id)
    },
    handleBookmark(id) {
      this.addBookmark(id)
    }
  }
}
</script>

<style></style>
