<template>
  <div class="flex items-center justify-end pb-6">
    <button
      @click.prevent="changeSection('cuisines-form')"
      class="bg-[#FF7931] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
    >
      Add New Cuisine
    </button>
  </div>
  <TableData
    :columns="columns"
    :data="formattedCuisines"
    @editCuisine="editCuisine"
    @changeStatus="changeStatus"
  />
</template>

<script>
import TableData from './TableData.vue'

export default {
  name: 'CuisinesTable',
  props: ['cuisines'],
  emits: ['cancelEdit', 'editCuisine', 'changeStatus','changeSection'],
  components: {
    TableData
  },
  data() {
    return {
      columns: [
        { label: '#', field: 'num', class: 'w-10', headerClass: '' },
        { label: 'Name', field: 'name', class: 'font-semibold w-40', headerClass: '' },
        { label: 'Image', field: 'imgUrl', class: 'w-80 text-center', headerClass: 'text-center' },
        { label: 'Description', field: 'description', class: 'w-1/4 text-justify ', headerClass: 'text-center' },
        { label: 'Price', field: 'price', class: 'text-center', headerClass: 'text-center' },
        { label: 'Author', field: 'author', class: 'text-center', headerClass: 'text-center' },
        { label: 'Status', field: 'status', class: 'text-center', headerClass: 'text-center' },
        { label: 'Action', field: 'action', class: 'text-center', headerClass: 'text-center' },
      ],
      data: this.cuisines
    }
  },
  computed: {
    formattedCuisines() {
      return this.cuisines.map((cuisine, index) => {
        cuisine.num = index + 1
        cuisine.author = cuisine.User.email
        return cuisine
      })
    }
  },
  methods: {
    changeSection(destination) {
      this.$emit('cancelEdit')
      this.$emit('changeSection', destination)
    },
    
    editCuisine(id) {
      this.$emit('editCuisine', id)
    },

    changeStatus(data) {
      this.$emit('changeStatus', data)
    },
  }
}
</script>

<style></style>
