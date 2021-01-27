<template>
  <div class="container generator">
    <div id="controls" class="controls-wrapper">
      <div id="myProgress">
        <div id="myBar">0%</div>
      </div>
      <div class="step-list-wrapper">
        <ul class="step-list">
          <li @click="move_step(1)">Add shop name</li>
          <li @click="move_step(2)">Upload shop logo</li>
          <li @click="move_step(3)">Select shop template</li>
          <li @click="move_step(4)">Create administrator account</li>
          <li @click="move_step(5)">Add product categories</li>
          <li @click="move_step(6)">Add products</li>
          <li @click="move_step(7)">Custom JS</li>
          <li @click="move_step(8)">Summary</li>
        </ul>
      </div>
    </div>
    <div id="setup" class="setup-wrapper">
      <div class="setup-item get-started">
        <div class="title">
          <h1>Get started</h1>
        </div>
        <span>
          Welcome to generator page. <br>
          You will be guided through configuration process of your new shop. You can navigate between the configuration steps through the menu on the left. <br>
          You can also change any option at any time during the site setup process if you make a mistake or want to change options. <br>
          Once you have gone through all the configuration steps, a page summary will be displayed where you can check if the options you entered are correct. <br>
        </span>
        <button @click="start" class="button-next">Start</button>
      </div>
      <div class="setup-item app-name">
        <div class="title">
          <h1>Add shop name</h1>
        </div>
        <span>
          Enter shop name. Name is used to help identify this shop from your other generated shops.
        </span>
        <div class="input-wrapper">
          <input v-model="shop.name" type="text">
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item shop-logo">
        <div class="title">
          <h1>Upload shop logo</h1>
        </div>
        <span>
          Enter shop name. Name is used to help identify this shop from your other generated shops.
        </span>
        <div class="file-upload">
          <div>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <div v-if="logo_preview" class="logo-preview">
            <div>Logo preview</div>
            <img :src="logo_preview" alt="">
          </div>
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item template">
        <div class="title">
          <h1>Select template for your shop</h1>
        </div>
        <div class="template-selection">
          <div class="select-1">
            <div class="navbar"></div>
            <div class="content"></div>
          </div>
          <div class="select-2">
            <div class="navbar"></div>
            <div class="content-wrapper">
              <div class="side-menu"></div>
              <div class="content"></div>
            </div>
          </div>
        </div>
        <input hidden v-model="shop.template" type="text">
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item admin-account">
        <div class="title">
          <h1>Create administrator account</h1>
        </div>
        <span>Create your shop administrator account to be able to modify the content of the generated shop.</span>
        <div class="input-wrapper">
          <span>Email: </span>
          <input v-model="shop.admin.username" type="text" class="username">
          <client-only>
            <span>Password: </span>
            <password v-model="shop.admin.password" :badge="false" :toggle="true" defaultClass="test"/>
          </client-only>
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item categories">
        <div class="title">
          <h1>Add product categories</h1>
        </div>
        <ul>
          <li v-for="(category, index) in shop.categories">
            <input type="text" v-model="shop.categories[index]" disabled>
            <button @click="deleteCategory(index)">
              <img src="~/assets/images/bin.svg" alt="">
            </button>
          </li>
        </ul>
        <div class="new-item">
          <input v-model="category" type="text">
          <button type="button" @click="add_category">+</button>
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item products">
        <div class="title">
          <h1>Add products</h1>
        </div>
        <div class="products-list">
          <ul>
            <li v-for="(product, index) in shop.products">
              <div class="product-name"> {{ product.name }} </div>
              <v-select v-model="product.category" :options="shop.categories"/>
              <div class="product-price"> {{ product.price }} </div>
              <button @click="deleteProduct(index)" class="delete">
                <img src="~/assets/images/bin.svg" alt="">
              </button>
            </li>
          </ul>
        </div>
        <div class="new-product">
          <input v-model="product_name" type="text" placeholder="Name">
          <client-only>
            <v-select v-model="selected_category" :options="shop.categories" placeholder="Select category"/>
          </client-only>
          <input type="number" v-model="product_price" placeholder="Price">
          <button type="button" @click="add_product" class="add">+</button>
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item custom-js">
        <div class="title">
          <h1>Add custom Javascript file</h1>
        </div>
        <span>
          Add a custom JavaScript file to be able to use custom endpoints in the api. When you add the file it will be available at /api/user.
        </span>
        <div style="margin-top: 30px">
          <input type="file" id="fileJS" ref="JS" v-on:change="handleJSUpload()"/>
        </div>
        <button @click="next_step" class="button-next">Next</button>
      </div>
      <div class="setup-item summary">
        <div class="title">
          <h1>Summary</h1>
        </div>
        <span class="item">Shop name: {{ shop.name }}</span>
        <span class="item">Product categories added: {{ shop.categories.length }}</span>
        <span class="item">Products added: {{ shop.products.length }}</span>
        <div class="item" style="display: flex">
          <div style="margin-right: 20px">Admin account: </div>
          <div v-if="!show_admin">
            <span @click="show_admin = !show_admin">Show</span>
          </div>
          <div v-else>
            <span @click="show_admin = !show_admin">Hide</span>
            <div> Email: {{ shop.admin.username }}</div>
            <div> Password: {{ shop.admin.password }}</div>
          </div>
        </div>
        <div class="item">
          Custom JS:
          <span v-if="shop.js">Yes</span>
          <span v-else>No</span>
        </div>
        <button @click="generate" class="button-next">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

export default {
  components: {
    Password
  },
  data(){
    return{
      show_admin: false,
      step: 0,
      category: '',
      selected_category: '',
      product_name: '',
      product_price: '',
      logo: '',
      logo_preview: '',
      shop: {
        name: '',
        template: '',
        js: '',
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
    deleteCategory: function(index) {
      this.shop.categories.splice(index, 1);
    },
    deleteProduct: function(index) {
      this.shop.products.splice(index, 1);
    },
    handleFileUpload(){
      this.logo = this.$refs.file.files[0];
      var reader = new FileReader();
      var self = this;
      reader.addEventListener("load", function () {
        self.logo_preview = reader.result;
      }, false);

      if (this.$refs.file.files[0]) {
        reader.readAsDataURL(this.$refs.file.files[0]);
      }
      //this.logo = this.$refs.file.files[0];
      console.log(this.$refs.file.files[0])
    },
    handleJSUpload(){
      var reader = new FileReader();
      var self = this;
      reader.addEventListener("load", function () {
        self.shop.js = reader.result;
      }, false);

      if (this.$refs.JS.files[0]) {
        reader.readAsDataURL(this.$refs.JS.files[0]);
      }
      //this.logo = this.$refs.file.files[0];
      console.log(this.$refs.JS.files[0])
    },
    generate(){
      let formData = new FormData();
      formData.append('shop', JSON.stringify(this.shop));
      formData.append('logo', this.logo);

      var self = this;

      this.$swal({
        title: 'Are you sure you want to create your shop?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.$axios.$post( '/api/generate?name=' + self.shop.name,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(function(response){
            return response;
          }).catch(function(err){
            self.$swal({
              text: `Request failed: ${err}`,
              title: 'Error',
              icon: 'error'
            })
          });
        }
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          this.$swal({
            title: 'Shop created',
            icon: 'success',
            footer: 'Your shop will be accessible in few minutes',
            html: "Shop is accessible on <a target='_blank' href=" + result.value.shop_url+ ">" + " " + result.value.shop_url + "</a>"
          })
        }
      });
      //
      // this.$axios.$post( '/api/generate?name=' + this.shop.name,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      // ).then(function(){
      //   console.log('SUCCESS!!');
      // })
      //   .catch(function(err){
      //     console.log(err);
      //   });
    },
    move_bar(){
      var test = (this.step / (document.getElementById("setup").children.length - 1)) * 100;
      console.log(Math.ceil(test/5)*5);
      var elem = document.getElementById("myBar");
      var width = Math.ceil(test/5)*5;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    },
    start(){
      var setup = document.getElementById("setup");
      var controls = document.getElementById("controls");
      console.log(setup.children);
      var li = document.getElementById("controls").getElementsByTagName("li");
      li[this.step].classList.add('active');
      controls.style.display = 'block';
      setup.children[this.step].style.display = 'none';
      setup.children[this.step + 1].style.display = 'flex';
      this.step += 1;
      this.move_bar();
    },
    move_step(new_step){
      var setup = document.getElementById("setup");
      var li = document.getElementById("controls").getElementsByTagName("li");
      li[this.step - 1].classList.remove('active');
      li[new_step - 1].classList.add('active');
      setup.children[this.step].style.display = 'none';
      setup.children[new_step].style.display = 'flex';
      this.step = new_step;
      this.move_bar();
    },
    next_step(){
      var setup = document.getElementById("setup");
      if (this.step < setup.children.length - 1){
        var li = document.getElementById("controls").getElementsByTagName("li");
        li[this.step - 1].classList.remove('active');
        li[this.step].classList.add('active');
        setup.children[this.step].style.display = 'none';
        setup.children[this.step + 1].style.display = 'flex';
        this.step += 1;
        this.move_bar();
      }else{

      }
    },
    add_category(){
      var category = this.category;
      this.shop.categories.push(category);
      this.category = '';
    },
    add_product(){
      var json = {name: '', category: '', price: ''};
      json.name = this.product_name;
      json.category = this.selected_category;
      json.price = this.product_price;
      this.shop.products.push(json);
      this.selected_category = '';
      this.product_name = '';
      this.product_price = '';
    }
  },
  beforeRouteLeave (to, from , next) {
    const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style>

@import './styles/style.css';

</style>
