<template>
  <div class="flex p-12 flex-wrap">
    <div class="mx-auto w-full sm:w-1/2 sm:flex-col sm:mt-5 max-w-md sm:pr-8 pb-8 bg-white rounded p-3">
      <h1 class="text-2xl font-bold mb-4 dark:text-slate-800">{{ cuisineData ? 'Edit Cuisine' : 'Add Cuisine' }}</h1>

      <form class="max-w-lg" @submit.prevent="cuisineForm">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name"> Name </label>
          <input
            v-model="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            id="name"
            type="text"
            placeholder="Enter name"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2 " for="CategoryId"> Category </label>
          <select
            v-model="categoryId"
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            id="CategoryId"
          >
            <option value="" selected disabled>Select category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="description"> Description </label>
          <textarea
            v-model="description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            id="description"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="price"> Price </label>
          <input
            v-model="price"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            id="price"
            type="number"
            placeholder="Enter price"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="imgUrl"> Image URL </label>
          <input
            v-model="imgUrl"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            id="imgUrl"
            type="text"
            placeholder="Enter image URL"
          />
        </div>

        <div
          class="p-1 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
          v-if="imgUrlError"
        >
          {{ imgUrlError }}
        </div>

        <div class="grid grid-cols-2 gap-4 justify-center pt-3">
          <button
            @click.prevent="handleNav('cuisines-section')"
            class="bg-white text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ cuisineData ? 'Update Cuisine' : 'Add Cuisine' }}
          </button>
        </div>
      </form>
    </div>

    <div class="mx-auto w-full sm:w-1/2 sm:flex-col sm:mt-5 max-w-md">
      <h2 class="text-lg font-bold mb-2 dark:text-white">Preview Image</h2>
      <img
        :src="previewImgUrl"
        class="h-64 object-cover object-center rounded-lg shadow-md"
        v-if="previewImgUrl"
        alt="Preview Image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CuisineForm',
  props: ['categories', 'cuisineData'],
  data() {
    return {
      name: '',
      description: '',
      price: '',
      imgUrl: '',
      categoryId: '',
      method: 'addCuisine',
      imgUrlError: ''
    }
  },
  watch: {
    imgUrl(newValue, oldValue) {
      let validUrl = newValue.includes('http') && newValue.startsWith('http')
      if (newValue.length > 4 && !validUrl) {
        this.imgUrlError = "Please insert correct image URL that includes 'http://' or 'https://'"
      } else {
        this.imgUrlError = ''
      }
    }
  },
  computed: {
    previewImgUrl() {
      if (this.imgUrl) {
        return this.imgUrl
      } else {
        return null
      }
    }
  },
  methods: {
    handleNav(navigation) {
      this.$emit('changeSection', navigation)
      this.$emit('cancelEdit')
    },
    cuisineForm() {
      this.$emit(this.method, {
        name: this.name,
        description: this.description,
        price: this.price,
        imgUrl: this.imgUrl,
        categoryId: this.categoryId
      })
    }
  },
  created() {
    if (this.cuisineData) {
      this.name = this.cuisineData.name
      this.description = this.cuisineData.description
      this.categoryId = this.cuisineData.categoryId
      this.price = this.cuisineData.price
      this.imgUrl = this.cuisineData.imgUrl
      this.method = 'updateCuisine'
    }
  }
}
</script>

<style></style>
