<template>
  <div class="container">
    <div id="controls" class="controls-wrapper">
      <div id="myProgress">
        <div id="myBar">10%</div>
      </div>
    </div>
    <div id="setup" class="setup-wrapper">
      <div class="setup-item get-started">
        <span>Get started</span>
        <button @click="start">Start</button>
      </div>
      <div class="setup-item app-name">
        <span>Enter shop name</span>
        <input v-model="shop.name" type="text">
      </div>
      <div class="setup-item shop-logo">
        <span>Upload shop logo</span>
        <div class="large-12 medium-12 small-12 cell">
          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
        </div>
      </div>
      <div class="setup-item template">
        <span>Select template for your shop</span>
        <input v-model="shop.template" type="text">
      </div>
      <div class="setup-item admin-account">
        <span>Create administrator account</span>
        <input v-model="shop.admin.username" type="text">
        <input v-model="shop.admin.password" type="password">
      </div>
      <div class="setup-item categories">
        <span>Add product categories</span>
        <ul>
          <li v-for="category in shop.categories">
            {{ category }}
          </li>
        </ul>
        <input v-model="category" type="text">
        <button type="button" @click="add_category">Add</button>
      </div>
      <div class="setup-item products">
        <span>Add products</span>
        <div>
          <ul>
            <li v-for="product in shop.products">
              {{ product.name }}
              <v-select v-model="product.category" :options="shop.categories"/>
            </li>
          </ul>
        </div>
        <input v-model="product_name" type="text">
        <client-only>
          <v-select v-model="selected_category" :options="shop.categories"/>
        </client-only>
        <button type="button" @click="add_product">Add</button>
      </div>
      <div class="setup-item summary">
        <span>summary</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      category: '',
      selected_category: '',
      product_name: '',
      shop: {
        name: '',
        logo: '',
        template: '',
        admin: {
          username: '',
          password: ''
        },
        categories: [],
        products: []
      }
    }
  },
  methods: {
    handleFileUpload(){
      this.shop.logo = this.$refs.file.files[0];
      console.log(this.$refs.file.files[0])
    },
    move_bar(){
      var elem = document.getElementById("myBar");
      var width = 100;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    },
    start(){
      var setup = document.getElementById("setup");
      var controls = document.getElementById("controls");
      console.log(setup.children);
      controls.style.display = 'block';
      setup.children[0].style.display = 'none';
      setup.children[1].style.display = 'block';
      this.move_bar();
    },
    add_category(){
      var category = this.category;
      this.shop.categories.push(category);
      this.category = '';
    },
    add_product(){
      var json = {name: '', category: '', description: ''};
      json.name = this.product_name;
      json.category = this.selected_category;
      this.shop.products.push(json);
      this.selected_category = '';
      this.product_name = '';
    }
  }
}
</script>

<style scoped>

.container{
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.setup-wrapper{
  border-radius: 15px;
  box-shadow: 2px 3px 8px lightgrey;
  width: 70%;
  height: 75%;
}
.controls-wrapper{
  display: none;
  border-radius: 15px;
  box-shadow: 2px 3px 8px lightgray;
  width: 25%;
  height: 75%;
}

.app-name{
  display: none;
}

.setup-item{
  width: 100%;
  height: 100%;
}

#myProgress{
  margin: 10px;
}

#myBar {
  border-radius: 5px;
  width: 10%;
  height: 30px;
  background-color: #4CAF50;
  text-align: center;
  line-height: 30px;
  color: white;
}

</style>
