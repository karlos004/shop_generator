<template>
  <div class="container products">
      <div class="page-wrapper">
        <div class="search-wrapper">
            <input type="text" v-model="search" class="search" placeholder="Search">
            <client-only>
                <v-select v-model="selectedCategory" :options="categories" placeholder="Select category"/>
            </client-only>
            <nuxt-link to="/products/edit/add"><button class="butt">Add new</button></nuxt-link>
        </div>
        <div class="products-wrapper">
          <ul>
              <li v-for="product in filteredList">
                <nuxt-link :to="'/products/edit/' + product.product_id">
                    <div class="single-product">
                  <div class="image">
                      <img :src="product.image" alt="">
                  </div>
                  <div class="name"> {{product.name}} </div>
                  <div class="price"> {{product.price}} $ </div>
                  <div class="category"> {{product.category}} </div>
                </div>
                </nuxt-link>
              </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selectedCategory: '',
      search: ''
    }
  },
  async fetch({store}) {
      await store.dispatch('products/downloadAllProducts');
      await store.dispatch('category/downloadAllCategories');
  },
  methods: {
    
  },
  computed: {
      products() {
        return this.$store.getters['products/getAllProducts'];
      },
      categories() {
        var data = this.$store.getters['category/getAllCategories'];
        var array = [ 'All' ]
        data.forEach(element => {
            array.push(element.name);
        });
        return array;
      },
      filteredProducts: function() {
			var category = this.selectedCategory;
			if(category == "" || category == "All" || category == null) {
				return this.products;
			} else {
				return this.products.filter(function(product) {
					return product.category === category;
				});
			}
      },
      filteredList() {
        return this.filteredProducts.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()));
      }
  }
}
</script>

<style lang="css" scoped>
@import './styles/style.css';
</style>
