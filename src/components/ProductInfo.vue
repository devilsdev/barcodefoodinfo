<template>
  <div id="productInfo">
    <h3 class="headline mb-0">{{ product.product.product_name }}</h3>
    <p>Barcode: {{product.code}}     
      <v-btn flat color="error" @click="close">Close</v-btn> 
      <v-btn flat color="success" @click="save">Save</v-btn> 
    </p>

    <h4 class="headline mb-0">Ingredients</h4>
    <v-list>
      <v-list-tile
        v-for="ingredient in product.product.ingredients"
        :key="ingredient.id"
      >
        {{ ingredient.text }}
      </v-list-tile>
    </v-list>
    

  </div>
</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  methods: {
    close () {
      this.$emit('closeProductInfo', false)
    },
    save () {
      localStorage.setItem(this.product.code, JSON.stringify(this.product))
    }
  }
}
</script>

<style scoped>

</style>
