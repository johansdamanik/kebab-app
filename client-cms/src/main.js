import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '307796516631-2tjk6h42clk718or6vuaqo9k05uo31t0.apps.googleusercontent.com'
})

app.mount('#app')
