<template>
  <div class="container edit">
    <div v-if="product[0]" class="wrapper">
      <div class="top-bar">
        <div class="image-wrapper">
          <div v-if="picture">
            <img :src="picture" alt="image">
          </div>
          <div v-else>
            <div v-if="product[0].image">
              <img :src="product[0].image" alt="image">
            </div>
          </div>
          <button class="butt" @click="photo">Upload photo</button>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" style="display:none;"/>
        </div>
        <div class="controls">
          <div class="name"> {{product[0].name}} </div>
          <div> <label> Price: <input type="number" :value="product[0].price" id="price"> $ </label> </div>
          <div> <label><input type="checkbox" :checked="available" id="status"> Available</label> </div>
        </div>
      </div>
      <button @click="preview" class="butt">Show preview</button>
      <div v-if="show_preview" v-html="editor" class="description"></div>
      <div class="active" v-bind:class="{ hide: show_preview }">
        <editor @newdata="handleData($event)" :prop="product[0].description"/>
      </div>
      <button class="butt save" @click="send()">Save</button>
      <button class="butt save" @click="deleteProduct()">Delete</button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor.vue';
export default {
  components: { editor },
  data(){
    return{
      editor: '',
      show_preview: false,
      picture: '',
    }
  },
  async fetch({store}) {
      await store.dispatch('products/downloadAllProducts');
  },
  methods: {
    photo(){
      document.getElementById('file').click();
    },
    handleFileUpload(){
      this.logo = this.$refs.file.files[0];
      var reader = new FileReader();
      var self = this;
      reader.addEventListener("load", function () {
        self.picture = reader.result;
      }, false);

      if (this.$refs.file.files[0]) {
        reader.readAsDataURL(this.$refs.file.files[0]);
      }
      //this.logo = this.$refs.file.files[0];
      console.log(this.$refs.file.files[0])
    },
    deleteProduct(){
      this.$axios.$post('/api/deleteProduct/' + this.$route.params.id);
      this.$router.push('/products/edit')
    },
    send(){
      var price = document.getElementById('price').value
      var status = document.getElementById('status').checked
      var description = this.editor
      var picture = this.picture
      if(status == false){
        status = 0;
      }else{
        status = 1;
      }
      if(!picture){
        picture = this.product[0].image;
      }
      var json = {'price': price, 'status': status, 'description': description, 'picture': picture}
      this.$axios.$post('/api/editProduct/' + this.$route.params.id , {
        data: json
      });
      this.$router.push('/products/edit');
      // console.log(description);
      // console.log(price);
      // console.log(status);
      // console.log(picture);
    },
    preview(){
      this.show_preview = !this.show_preview
    },
  	handleData: function(e) {
      console.log(e);
      this.editor = e;
    }
  },
  computed: {
      product() {
        return this.$store.getters['products/getByIdProduct'](this.$route.params.id);
      },
      available(){
        if(this.product[0].status == 1){
          return true;
        }else{
          return false;
        }
      }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/style.css';
@import './styles/quill.snow.css';
@import './styles/quill.bubble.css';
@import './styles/quill.core.css';
</style>
