<template>
  <TableData :columns="columns" :data="formattedHistories"/>
</template>

<script>
import TableData from './TableData.vue'

export default {
  name: 'NewHistories',
  props: ['histories'],
  components: {
    TableData
  },
  data() {
    return {
      columns: [
        { label: '#', field: 'num', class : 'w-10', headerClass: '' },
        { label: 'Title', field: 'title', class: 'font-semibold', headerClass: '' },
        { label: 'Description', field: 'description', class : '', headerClass: '' },
        { label: 'Created At', field: 'createdAt', class : 'text-center w-1/5', headerClass: 'text-center' },
        { label: 'Updated By', field: 'updatedBy', class : 'text-center w-1/5', headerClass: 'text-center' }
      ],
      data: this.histories
    }
  },
  methods: {
    formattedDate(dateString) {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', options)
    }
  },
  computed: {
    formattedHistories() {
      return this.histories.map((history, index) => {
        history.createdAt = this.formattedDate(history.createdAt)
        history.num = index + 1
        return history
      })
    }
  }
}
</script>

<style></style>
