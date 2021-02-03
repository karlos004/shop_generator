<template>
  <div class="container products">
      <div class="page-wrapper">
        <div class="delete">
          <h1>Delete category</h1>
          <div class="inputs">
            <client-only>
              <v-select v-model="selectedCategory" label="name" :options="categories" :reduce="categories => categories.id" placeholder="Select category"/>
            </client-only>
            <button @click="deleteCat()" class="butt">Delete</button>
          </div>
        </div>
        <div class="add">
          <h1>Add new category</h1>
          <div class="inputs">
            <input type="text" v-model="add">
            <button @click="addCat()" class="butt">Add</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selectedCategory: '',
      add: ''
    }
  },
  async fetch({store}) {
      await store.dispatch('products/downloadAllProducts');
      await store.dispatch('category/downloadAllCategories');
  },
  methods: {
    deleteCat(){
      this.$axios.$post('/api/deleteCategory/' + this.selectedCategory);
      this.$router.go();
    },
    addCat(){
      this.$axios.$post('/api/newCategory', {category: this.add});
      this.$router.go();
    }
  },
  computed: {
      products() {
        return this.$store.getters['products/getAllProducts'];
      },
      categories() {
        return this.$store.getters['category/getAllCategories'];
      },
  }
}
</script>

<style lang="css" scoped>
@import './styles/style.css';
</style>
