import Vue from 'vue'
import App from './components/App'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
