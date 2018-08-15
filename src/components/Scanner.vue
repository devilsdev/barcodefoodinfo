<template>
  <div id="scanner">
    <div id="scanner_video" ref="videoElement"></div>
  </div>
</template>

<script>
import Quagga from 'quagga'
export default {
  name: 'scanner',
  data () {
    return {
      lastCode: ''
    }
  },
  methods: {
    openQuagga() {
      let vm = this
      Quagga.init({
          inputStream : {
            name : "Live",
            type : "LiveStream",
            target: document.querySelector('#scanner_video') 
          },
          decoder : {
            readers : ["code_128_reader", "code_39_reader", "i2of5_reader", "upc_reader", "ean_reader"]
          }
      }, function(err) {
          if (err) {
            console.log(err)
            return
          }
          console.log("Initialization finished. Ready to start")
          Quagga.start()
      })
      
      // listen for detected Barcodes
      Quagga.onDetected((result) => {
        new Audio('https://www.soundjay.com/button/sounds/beep-06.mp3').play()
        vm.$emit('codeDetected', result.codeResult.code)
        Quagga.stop()
      })
    }
  },
  mounted() {
    this.openQuagga()
  }
}
</script>

<style scoped>
#scanner{
  position: absolute;
  width: 100vw !important;
  height: 100vh !important;
  background-color: black;
  color: white;
  text-align: center;
}
</style>
