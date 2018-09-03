<template>
  <div id="productInfo">
    <h3 class="headline mb-0">Saved Products</h3>
    <v-list>
      <v-list-tile
        v-for="product in storedProducts"
        :key="product.code"
      >
        {{ product.product.product_name }}
      </v-list-tile>
    </v-list>
    

  </div>
</template>

<script>
export default {
  name: 'savedproductlist',
  data () {
    return {
      storedProducts: []
    }
  }
  ,
  created () {
    this.getStoredProducts()
    console.log(this.storedProducts)
  },
  methods: {
    getStoredProducts () {
      let keys = Object.keys(localStorage),
      i = keys.length;
      while ( i-- ) {
        // debug purposes
        if(keys[i] === 'loglevel:webpack-dev-server')
          continue
        
        this.storedProducts.push( JSON.parse(localStorage.getItem(keys[i])));
      }

    }
  }
}
</script>

<style scoped>

</style>
