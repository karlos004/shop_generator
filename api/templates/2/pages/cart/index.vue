<template>
    <div class="container">
        <div class="list-wrapper">
            <div v-for="item in selectedItems" class="single-item">
                <span>Name: {{ item.name }} </span>
                <span>|</span>
                <span>Price: {{ item.price }} $ </span>
                <span>|</span>
                <span>Qty: {{ item.quantity }} </span>
                <span>|</span>
                <a><span @click="addToCart(item)">+</span></a>
                <a><span @click="removeFromCart(item)">-</span></a>
            </div>
            Ammount: {{ price }} $
            <button>Order</button>
            <button @click="emptyList()">Clear</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyList: 'cart/emptyList'
    })
  },
  computed: {
    selectedItems() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  }
}
</script>

<style scoped>

.list-wrapper{
    width: 80%;
}

.single-item{
    font-size: 20px;
    height: 40px;
}

</style>