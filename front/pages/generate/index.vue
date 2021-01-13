<template>
  <div class="container">
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
          <li @click="move_step(7)">Summary</li>
        </ul>
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
        <button @click="next_step">Next</button>
      </div>
      <div class="setup-item shop-logo">
        <span>Upload shop logo</span>
        <div class="large-12 medium-12 small-12 cell">
          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
        </div>
        <button @click="next_step">Next</button>
      </div>
      <div class="setup-item template">
        <span>Select template for your shop</span>
        <input v-model="shop.template" type="text">
        <button @click="next_step">Next</button>
      </div>
      <div class="setup-item admin-account">
        <span>Create administrator account</span>
        <input v-model="shop.admin.username" type="text">
        <input v-model="shop.admin.password" type="password">
        <button @click="next_step">Next</button>
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
        <button @click="next_step">Next</button>
      </div>
      <div class="setup-item products">
        <span>Add products</span>
        <div>
          <ul>
            <li v-for="product in shop.products">
              {{ product.name }}
              <v-select v-model="product.category" :options="shop.categories"/>
              {{ product.price }}
            </li>
          </ul>
        </div>
        <input v-model="product_name" type="text">
        <client-only>
          <v-select v-model="selected_category" :options="shop.categories"/>
        </client-only>
        <input type="number" v-model="product_price">
        <button type="button" @click="add_product">Add</button>
        <button @click="next_step">Next</button>
      </div>
      <div class="setup-item summary">
        <span>summary</span>
        {{ shop }}
        <img :src="logo_preview" alt="" width="150px" height="200px">
        <button @click="generate">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
      setup.children[this.step + 1].style.display = 'block';
      this.step += 1;
      this.move_bar();
    },
    move_step(new_step){
      var setup = document.getElementById("setup");
      var li = document.getElementById("controls").getElementsByTagName("li");
      li[this.step - 1].classList.remove('active');
      li[new_step - 1].classList.add('active');
      setup.children[this.step].style.display = 'none';
      setup.children[new_step].style.display = 'block';
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
        setup.children[this.step + 1].style.display = 'block';
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
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
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
  display: none;
}
.get-started{
  display: block;
}

.active{
  color: black;
  font-weight: 900;
  padding-left: 20px;
}

.step-list-wrapper{
  padding-left: 30px;
  margin-top: 50px;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}

.step-list{
  color: grey;
  list-style-type: none;
  padding: 0;
}

.step-list li{
  margin-top: 15px;
  transition: padding-left 0.2s;
}

#myProgress{
  margin: 20px 10px;
}

#myBar {
  border-radius: 5px;
  width: 10%;
  height: 30px;
  background-color: #4CAF50;
  text-align: center;
  line-height: 30px;
  color: white;
  transition: width 1s;
}

</style>
