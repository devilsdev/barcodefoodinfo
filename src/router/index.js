import Vue from 'vue'
import Router from 'vue-router'
import Scanner from '@/components/Scanner'
import Product from '@/components/ProductInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Scanner',
      component: Scanner
    },
    {
      path: '/',
      name: 'Product',
      component: Product
    }
  ]
})
