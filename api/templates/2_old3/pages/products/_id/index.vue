<template>
  <div class="container edit">
    <div v-if="product[0]" class="wrapper">
      <div class="top-bar">
        <div class="image-wrapper">
          <div v-if="product[0].image">
            <img :src="product[0].image" alt="image">
          </div>
        </div>
        <div class="controls">
          <div class="name"> {{product[0].name}} </div>
          <div> Price: {{ product[0].price }} $ </div>
          <div v-if="$store.state.auth.user.role == 2">
            <nuxt-link :to="'/products/edit/' + product[0].product_id">Edit this item</nuxt-link>
          </div>
          <div v-if="available">
            <button class="butt">Add to cart</button>
          </div>
          <div v-else>
            <div style="color: red;">Out of stock</div>
            <button class="butt disabled" disabled>Add to cart</button>
          </div>
        </div>
      </div>
      <div v-if="product[0].description" v-html="product[0].description" class="description"></div>
      <div v-else class="description"> Description is not avaliable for this item</div>
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
</style>
