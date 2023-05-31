<template>
  <section id="home-page">
    <!-- Sidebar -->
    <Sidebar @changeSection="changeSection" :currentSection="currentSection" />

    <!-- Navbar -->
    <Navbar @onLogOut="onLogOut" />
    <!-- CONTENT -->
    <div class="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
      <!-- Headbar -->
      <Headbar :currentSection="currentSection" />

      <div class="bg-white p-8 rounded-md w-full dark:bg-slate-900">
        <!-- Dashboard Section -->
        <Dashboard
          v-if="currentSection === 'dashboard-section'"
          :cuisines="cuisines"
          :categories="categories"
        />

        <!-- Categories Section -->
        <CategoriesTable v-if="currentSection === 'categories-section'" :categories="categories" />

        <!-- Cuisines Section -->
        <CuisinesTable
          v-if="currentSection === 'cuisines-section'"
          :cuisines="cuisines"
          @cancelEdit="cancelEdit"
          @editCuisine="editCuisine"
          @changeStatus="changeStatus"
          @changeSection="changeSection"
        />

        <!-- Histories Section -->
        <HistoriesTable v-if="currentSection === 'histories-section'" :histories="histories" />

        <!-- <CuisineForm /> -->
        <CuisineForm
          v-if="currentSection === 'cuisines-form'"
          :categories="categories"
          :cuisineData="cuisineData"
          @changeSection="changeSection"
          @addCuisine="addCuisine"
          @updateCuisine="updateCuisine"
          @cancelEdit="cancelEdit"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TableData from '../components/TableData.vue'
import LoadingBar from '../components/LoadingBar.vue'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import Headbar from '../components/Headbar.vue'
import Dashboard from '../components/Dashboard.vue'
import CuisineForm from '../components/CuisineForm.vue'
import CategoriesTable from '../components/CategoriesTable.vue'
import HistoriesTable from '../components/HistoriesTable.vue'
import CuisinesTable from '../components/CuisinesTable.vue'

export default {
  name: 'HomePage',
  props: ['cuisines', 'categories', 'histories', 'cuisineData'],
  emits: [
    'addCuisine',
    'updateCuisine',
    'cancelEdit',
    'changeStatus',
    'editCuisine',
    'onLogOut',
    'fetchCuisines',
    'fetchHistories'
  ],
  components: {
    LoadingBar,
    Sidebar,
    Navbar,
    Headbar,
    Dashboard,
    TableData,
    CuisineForm,
    HistoriesTable,
    CategoriesTable,
    CuisinesTable
  },
  data() {
    return {
      index: 0,
      currentSection: 'dashboard-section'
    }
  },
  methods: {
    changeSection(destination) {
      switch (destination) {
        case 'cuisines-section':
          this.$emit('fetchCuisines')
          break

        case 'histories-section':
          this.$emit('fetchHistories')
          break

        default:
          break
      }
      this.currentSection = destination
    },
    onLogOut() {
      this.$emit('onLogOut')
    },
    addCuisine(data) {
      this.$emit('addCuisine', data)
    },
    editCuisine(id) {
      this.$emit('editCuisine', id)
    },
    updateCuisine(data) {
      this.$emit('updateCuisine', data)
    },
    changeStatus(data) {
      this.$emit('changeStatus', data)
    },
    cancelEdit() {
      this.$emit('cancelEdit')
    }
  }
}
</script>

<style></style>
