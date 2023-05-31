import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl =  'http://localhost:4000/pub'
const railUrl =  'https://kebab-lord-production.up.railway.app/pub'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    baseUrl: railUrl,
    cuisines: [],
    cuisineDetail: {},
    bookmark: null,
    categories: null,
    totalPage: null,
    currentPage: null,
    qrCode: null,
  }),

  getters: {
    formattedRupiah: (state) => (price) => {
      const formatted = price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
      return formatted
    }
  },

  actions: {
    async showError(error) {
      let title
      if (error.response.data.message === 'Invalid Token') {
        title = 'You have to log in first.'
      } else {
        title = error.response.data.message
      }
      Swal.fire({
        icon: 'error',
        title: title
      })
    },

    async handleRegister(value) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/register',
          data: value
        })
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You may now proceed to login using your newly created account'
        })
        this.router.push({ path: '/login' })
      } catch (error) {
        this.showError(error)
      }
    },

    async handleLogin(value) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/login',
          data: value
        })
        localStorage.access_token = data.access_token
        this.router.push('/home')
      } catch (error) {
        this.showError(error)
      }
    },

    async handleGoogleSignIn(googleData) {
      try {
        const response = await axios({
          method: 'POST',
          url: this.baseUrl + '/google-login',
          headers: {
            google_token: googleData.credential
          }
        })
        localStorage.access_token = response.data.access_token
        this.router.push('/home');
      } catch (error) {
        this.showError(error)
      } 
    },

    async fetchCuisines(query) {
      const { page, filter, price, category } = query
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/cuisines',
          params: {
            page,
            filter,
            price,
            category
          }
        })
        this.cuisines = data.cuisines
        this.totalPage = data.totalPage
        this.currentPage = data.currentPage
      } catch (error) {
        this.showError(error)
      }
    },

    async fetchCuisineDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/cuisines/' + id
        })
        this.qrCode = null
        this.cuisineDetail = data
      } catch (error) {
        this.showError(error)
      }
    },

    async fetchCategories() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/categories'
        })
        this.categories = data
      } catch (error) {
        this.showError(error)
      }
    },

    async addBookmark(id) {
      try {
        await axios({
          method: 'POST',
          url: this.baseUrl + '/bookmark/' + id,
          headers: { access_token: localStorage.access_token }
        })
        Swal.fire({
          icon: 'success',
          title: 'Success bookmark this cuisine'
        })
        this.fetchBookmark()
        this.router.push({ path: '/bookmark' })
      } catch (error) {
        this.showError(error)
      }
    },

    async fetchBookmark() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/bookmark',
          headers: { access_token: localStorage.access_token }
        })
        this.bookmark = data
      } catch (error) {
        this.showError(error)
      }
    },

    async createQRCode(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/qr-code/' + id,
        })

        this.qrCode = data
      } catch (error) {
        this.showError(error)
      }
    }
  }
})
