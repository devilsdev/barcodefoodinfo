<template>
  <div id="productInfo">
    <v-card>
        <v-card-title primary-title>
        <div>
            <h3 class="headline mb-0">{{ product.product.product_name }}</h3>
            <p>Barcode: {{product.code}}</p>
        </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="warning" @click="close">Close</v-btn>
        </v-card-actions>

        
        <v-list>
          <v-divider></v-divider>
          <li 
            v-for="nutriment in product.nutriments"
            :key="nutriment"
          ></li>
        </v-list>


    </v-card>
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
