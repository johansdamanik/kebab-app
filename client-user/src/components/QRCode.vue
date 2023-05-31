<template>
    <div v-html="qrCode" style="width: 200px; height: 80px;"></div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCustomerStore } from '../stores/customer'
export default {
  name: 'QRCode',
  computed: {
    ...mapState(useCustomerStore, ['qrCode'])
  }
}
</script>

<style></style>
