<template>
  <div class="container">
    <ul>
      <li v-for="shop in shops">
        <span> {{ shop.name }} </span>
        <span> {{ shop.uid }} </span>
        <a :href="shop.shop_url" target="_blank">Link to shop</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch({store}) {
    await store.dispatch('user_shops/downloadShopsForUser', store.state.auth.user.user_id);
  },
  computed: {
    shops() {
      return this.$store.getters['user_shops/getShopsForUser'];
    },
  },
}
</script>

<style scoped>

</style>
