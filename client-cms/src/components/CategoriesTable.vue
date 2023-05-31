<template>
  <div class="w-1/2">
    <TableData :columns="columns" :data="formattedCategories"/>
  </div>
</template>

<script>
import TableData from './TableData.vue'

export default {
  name: 'NewCategories',
  props: ['categories'],
  components: {
    TableData
  },
  data() {
    return {
      columns: [
        { label: '#', field: 'num', class : 'w-10' },
        { label: 'Name', field: 'name', class : 'font-semibold' }
      ],
      data: this.categories
    }
  },
  computed: {
    formattedCategories() {
      return this.categories.map((category, index) => {
        category.num = index + 1
        return category
      })
    }
  }
}
</script>

<style></style>
