<template>
<v-app id="inspire" light>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-title @dblclick="changeToDebugMode()">BarcodeFoodInfo</v-toolbar-title>
    <template v-if="debugMode">
      <v-toolbar-title >(developer mode) </v-toolbar-title>
      <v-flex xs12 sm6 md3>
        <v-text-field
          label="Barcode"
          placeholder="Type your Barcode here"
          box
          v-on:keyup.enter="handleDetectedCode(alterNativeInput)" 
          v-model="alterNativeInput"
          style="margin-left: 5vw;"
        ></v-text-field>
      </v-flex>
    </template>

    <template v-if="isScanning">
      <v-btn color="error" @click="isScanning = !isScanning">Stop Scanning</v-btn>
    </template>
  </v-toolbar>
  <v-content>
    <v-alert
    :value="hasError"
    type="error"
    >
      No camera found
    </v-alert>
    <v-alert
    :value="debugActivated"
    type="success"
    >
      Debug Mode activated
    </v-alert>
    <v-alert
    :value="debugDeactivated"
    type="error"
    >
      Debug Mode deactivated
    </v-alert>
    <v-alert
    :value="productNotFound"
    type="error"
    >
      No product found
    </v-alert>
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
      <div v-else >

        <v-jumbotron>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class="display-2">Track your Food & Drinks</h3>
                <span class="subheading">
                  Check out the repository on <a href="https://github.com/devilsdev/barcodefoodinfo">GitHub</a>
                </span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3">
                  With BarcodeFoodInfo you can get information about any* food/drink that has a barcode on it.<br/><br/>
                  1. Start by clicking on the 'SCAN' Button <br/>
                  2. Scan your Barcode <br/>
                  3. The App shows you information about the scanned product
                </div>
                <v-btn @click="checkForCamera" color="info">Scan</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>

      </div>
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
      productFound: false,
      hasError: false,
      productNotFound: false,
      debugMode: false,
      alterNativeInput: '',
      debugActivated: false,
      debugDeactivated: false
    }
  },
  components: {
    scanner,
    product
  },
  methods: {
    checkForCamera () {
      navigator.getUserMedia({video: true}, 
        () => this.isScanning = true, 
        // if no permission to the camera
        () => this.showCameraError()
      )
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
            this.showProductError()
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
      if(this.debugMode)
        console.log(response.data)
      this.productFound = true
    },
    handleClosing() {
      this.productFound = false
      this.product = {}
    },
    showProductError() {
      this.productNotFound = true
      setTimeout(() => {
        this.productNotFound = false
      }, 3000)
    },
    showCameraError() {
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, 3000)
    },
    changeToDebugMode() {
      if(this.debugMode) {
        this.debugMode = false
        this.debugDeactivated = true
        setTimeout(() => this.debugDeactivated = false, 3000)
      } else {
        this.debugMode = true
        this.debugActivated = true
        setTimeout(() => this.debugActivated = false, 3000)
      }
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
  margin-top: 35vh;
}

</style>
