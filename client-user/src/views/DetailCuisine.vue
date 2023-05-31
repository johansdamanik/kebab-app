<template>
  <section class="bg-white md:w-3/4 flex mx-auto justify-center sm:w-screen">
    <div class="container px-6 py-10 mx-auto shadow-xl rounded-lg mt-24">
      <p class="text-center mb-8 text-4xl uppercase font-semibold">{{ cuisineDetail.name }}</p>
      <div class="flex flex-col md:flex-row items-center">
        <img :src="cuisineDetail.imgUrl" class="w-full md:w-1/3 rounded-lg md:mr-8 mb-6 md:mb-0" />
        <div class="md:w-2/3">
          <p class="text-lg"><span class="font-semibold">Price:</span> {{ formattedPrice }}</p>

          <br />
          <span class="font-semibold text-lg mt-6">Description: </span>
          <p class="text-center md:text-left text-lg">{{ cuisineDetail.description }}</p>
          <br />
          <div class="w-30 flex items-center">
            <p class="mr-12 text-gray-900 font-semibold">Bookmark</p>
            <div class="w-10" @click.prevent="handleBookmark(cuisineDetail.id)">
              <BookmarkButton />
            </div>
          </div>
          <div class="w-15 flex items-center my-1" @click.prevent="handleQR(cuisineDetail.id)">
            <p class="mr-2 text-gray-900 font-semibold">Create QR Code</p>
            <div
              class="h-10 w-10 bg-orange-400 hover:bg-orange-300 rounded-lg flex items-center justify-center cursor-pointer shadow-lg"
            >
              <svg
                style="color: white"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-qr-code-scan"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"
                  fill="white"
                ></path>
                <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" fill="white"></path>
                <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" fill="white"></path>
                <path
                  d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"
                  fill="white"
                ></path>
                <path d="M12 9h2V8h-2v1Z" fill="white"></path>
              </svg>
            </div>
            <template> </template>
          </div>
        </div>
        <div class="1/3 h-full self-start">
          <QRCode />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'
import BookmarkButton from '../components/BookmarkButton.vue'
import QRCode from '../components/QRCode.vue'

export default {
  name: 'DetailCuisine',
  components: {
    BookmarkButton,
    QRCode
  },
  computed: {
    ...mapState(useCustomerStore, ['cuisineDetail', 'qrCode']),
    formattedPrice() {
      if (this.cuisineDetail && this.cuisineDetail.price) {
        return `Rp. ${this.cuisineDetail.price.toLocaleString('id-ID')}`
      }
      return ''
    }
  },
  methods: {
    ...mapActions(useCustomerStore, ['fetchCuisineDetail', 'addBookmark', 'createQRCode']),
    handleBookmark(id) {
      this.addBookmark(id)
    },
    handleQR(id) {
      this.createQRCode(id)
    }
  },
  created() {
    this.fetchCuisineDetail(this.$route.params.id)
  }
}
</script>

<style></style>
