<template>
  <div id="productInfo">
    <h3 class="headline mb-0">{{ product.product.product_name }}</h3>
    <p>Barcode: {{product.code}}</p>

    <v-btn flat color="warning" @click="close">Close</v-btn>
    <h4 class="headline mb-0">nutriments</h4>
    <ul>
      <li 
        v-for="nutriment in product.nutriments"
        :key="nutriment"
      >
        {{ nutriment }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  methods: {
    close () {
      this.$emit('closeProductInfo', false)
    }
  }
}
</script>

<style scoped>

</style>
