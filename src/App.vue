<template>
<v-app id="inspire" light>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-title>BarcodeFoodInfo</v-toolbar-title>
    <template v-if="isScanning">
      <v-btn color="error" @click="isScanning = !isScanning">Stop Scanning</v-btn>
    </template>
  </v-toolbar>
  <v-content>
    <div v-if="isScanning">
      <scanner 
        @codeDetected="handleDetectedCode">
      </scanner>
    </div>
    <div v-else>
      <template v-if="productFound">
        <product 
          :product="product"
          @closeProductInfo="handleClosing"
        ></product>
      </template>
      <template v-else class="entryPoint">
        <div class="text-xs-center">
          <v-btn @click="checkForCamera" color="info">Scan</v-btn>
        </div>
        <p class="text-md-center">Get information about your food / drink by simply clicking on 'SCAN', 
          scan your barcode and voilá!
        </p>
      </template>
    </div> 
  </v-content>
  <v-footer app fixed>
    <span>&copy; devilsdev 2018 - <a href="http://github.com/devilsdev">github.com/devilsdev</a></span>
  </v-footer>
</v-app>
</template>

<script>
import scanner from './components/Scanner.vue'
import product from './components/ProductInfo.vue'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {   
      currentCode: 'No Barcode',
      product: {},
      isScanning: false,
      productFound: false
    }
  },
  components: {
    scanner,
    product
  },
  methods: {
    checkForCamera () {
      let errorMessage = 'Your device does not support this application (No Camera found)'
      navigator.getUserMedia({video: true}, () => this.isScanning = true, () => alert(errorMessage))
    },
    handleDetectedCode (code) {
      this.currentCode = code
      this.isScanning = false
      this.getProductInfo(code)
    },
    getProductInfo (barcode) {
      this.resetProductInfo()
      let url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      axios.get(url)
        .then(response => {
          console.log(response)
          if(response.data.status === 0) {
            // product does not exist
            alert('No product found')
            return
          }
          // product found
          this.foundProduct(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    resetProductInfo () {
      this.hasFoundProduct = '-'
      this.productName = '-'
    },
    foundProduct(response) {
      this.isScanning = false
      this.product = response.data
      this.productFound = true
    },
    handleClosing() {
      this.productFound = false
      this.product = {}
    }
  }
}
</script>

<style>
html, 
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

#app{
  width: 100vw;
  height: 100vh;
}

.headline{
  color: black;
}

.entryPoint{
  margin-top: 30vh;
}
</style>
