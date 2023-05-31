<template>
  <LoadingBar v-show="isLoading" />
  <div id="app">
    <!-- Login Section -->
    <LoginPage
      v-if="page === 'login-page'"
      @login="handleLogin"
      @changePage="changePage"
      @handleGoogleSignIn="handleGoogleSignIn"
    />

    <!-- Register Section -->
    <RegisterPage
      v-if="page === 'register-page'"
      @register="handleRegister"
      @changePage="changePage"
      @handleGoogleSignIn="handleGoogleSignIn"
    />

    <!-- Home Section -->
    <HomePage
      ref="homepage"
      v-if="page === 'home-page'"
      :cuisines="cuisines"
      :categories="categories"
      :histories="histories"
      :cuisineData="cuisineData"
      @fetchCuisines="fetchCuisines"
      @fetchHistories="fetchHistories"
      @onLogOut="handleLogout"
      @addCuisine="addCuisine"
      @editCuisine="editCuisine"
      @updateCuisine="updateCuisine"
      @cancelEdit="cancelEditCuisine"
      @changeStatus="changeStatus"
    />
  </div>
</template>

<script>
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import HomePage from './views/HomePage.vue'
import LoadingBar from './components/LoadingBar.vue'

import axios from 'axios'

const baseUrl = 'http://localhost:4000'
// const baseUrl = 'https://kebab-lord-production.up.railway.app'

export default {
  data() {
    return {
      page: 'home-page',
      passwordInputType: 'password',
      cuisines: [],
      categories: [],
      histories: [],
      cuisineData: null,
      cuisineId: null,
      isLoading: false
    }
  },
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
    LoadingBar
  },

  methods: {
    //Change Page Function
    async changePage(destination) {
      this.page = destination
    },

    // Simplify method
    async postLoginRegister(response) {
      localStorage.access_token = response.data.access_token
      localStorage.email = response.data.email
      localStorage.role = response.data.role
      this.fetchCuisines()
      this.fetchCategories()
      this.changePage('home-page')
    },

    // Login Handler
    async handleLogin(userData) {
      try {
        this.isLoading = true
        const response = await axios({
          method: 'POST',
          url: `${baseUrl}/users/login`,
          data: userData
        })
        await this.postLoginRegister(response)
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Register Handler
    async handleRegister(registerData) {
      try {
        this.isLoading = true
        const response = await axios({
          method: 'POST',
          url: `${baseUrl}/users/register`,
          data: registerData
        })
        await this.postLoginRegister(response)
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    //Login with Google Account
    async handleGoogleSignIn(googleData) {
      try {
        this.isLoading = true
        const response = await axios({
          method: 'POST',
          url: `${baseUrl}/users/google-sign-in`,
          headers: {
            google_token: googleData.credential
          }
        })
        await this.postLoginRegister(response)
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Fetch Cuisines
    async fetchCuisines() {
      try {
        this.isLoading = true
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/cuisines`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.cuisines = data
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Fetch Categories
    async fetchCategories() {
      try {
        this.isLoading = true
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/categories`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.categories = data
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Fetch Histories
    async fetchHistories() {
      try {
        this.isLoading = true
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/history`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.histories = data
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    // Add Cuisine
    async addCuisine(newCuisine) {
      try {
        this.isLoading = true
        await axios({
          method: 'POST',
          url: `${baseUrl}/cuisines`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: newCuisine
        })
        this.fetchCuisines()
        this.fetchHistories()
        this.$refs.homepage.changeSection('cuisines-section')
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Edit Cuisine
    async editCuisine(cuisineId) {
      try {
        this.isLoading = true
        this.cuisineId = cuisineId
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/cuisines/${cuisineId}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.cuisineData = data
        this.$refs.homepage.changeSection('cuisines-form')
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Update Cuisine
    async updateCuisine(updateCuisine) {
      try {
        await axios({
          method: 'PUT',
          url: `${baseUrl}/cuisines/${this.cuisineId}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: updateCuisine
        })
        this.cuisineData = null
        this.fetchCuisines()
        this.fetchHistories()
        this.$refs.homepage.changeSection('cuisines-section')
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Update Cuisine's Status
    async changeStatus(cuisine) {
      try {
        this.isLoading = true
        const status = cuisine.status
        await axios({
          method: 'PATCH',
          url: `${baseUrl}/cuisines/${cuisine.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            status
          }
        })
        this.fetchCuisines()
        this.fetchHistories()
      } catch (error) {
        this.showError(error)
      } finally {
        this.isLoading = false
      }
    },

    // Cancel Cuisine
    cancelEditCuisine() {
      this.cuisineData = null
    },

    //Show Error
    async showError(error) {
      let text
      if (error.response.data.message === 'You are not authorized') {
        text = 'You can only edit the cuisine that you have added.'
      } else if (error.response.statusText === 'Forbidden') {
        text = `Only Admin can edit cuisine's status.`
      } else {
        text = 'Please fill out the following form'
      }
      Swal.fire({
        title: error.response.data.message,
        text: text,
        icon: 'error',
        confirmButtonText: 'Back'
      })
    },

    // Logout Handler
    async handleLogout() {
      try {
        this.isLoading = true
        localStorage.clear()
        this.page = 'login-page'
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  },
  created() {
    // const access_token = localStorage.getItem('access_token')
    // if (!access_token) {
    //   this.changePage('login-page')
    // } else {
    //   try {
    //     this.fetchCuisines()
    //     this.fetchCategories()
    //     this.fetchHistories()
    //     this.changePage('home-page')
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
  }
}
</script>

<style></style>
