<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-10">
      <p class="text-gray-900 whitespace-no-wrap">{{ index + 1 }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
      <p class="text-gray-900 whitespace-no-wrap font-semibold">
        {{ cuisine.name }}
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-80">
      <img
        :src="cuisine.imgUrl"
        class="w-64 h-40 rounded-lg shadow-md hover:scale-150 ease-in duration-200"
      />
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white w-1/4 text-justify">
      <p class="text-gray-900 whitespace-no-wrap">{{ cuisine.description }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
      <p class="text-gray-900 whitespace-no-wrap">{{ formattedPrice }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
      <p class="text-gray-900 whitespace-no-wrap">{{ cuisine.User.email }}</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
      <div class="relative inline-flex">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          />
        </svg>
        <select
          @change="changeStatus(cuisine.id, $event.target.value)"
          class="font-bold border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-6 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        >
          <option :selected="cuisine.status === 'Active'">Active</option>
          <option :selected="cuisine.status === 'Inactive'">Inactive</option>
          <option>Archived</option>
        </select>
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex justify-center items-center h-full">
        <button @click.prevent="handleEdit(cuisine.id)">
          <svg
            class="h-7 w-7 text-orange-500"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CuisinesTable',
  props: ['cuisine', 'index'],
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
        this.cuisine.price
      )
    }
  },
  methods: {
    handleEdit(id) {
      this.$emit('edit-cuisine', id)
    },
    changeStatus(id, status) {
      const data = { id, status }
      this.$emit('change-status', data)
    }
  }
}
</script>

<style></style>
