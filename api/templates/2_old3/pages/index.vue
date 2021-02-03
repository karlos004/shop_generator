<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Welcome to <br> {{ $store.getters.appName }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      editor: '',
      select: 'GPU'
    }
  },
  async fetch({store}) {
      await store.dispatch('products/downloadAllProducts');
  },
  mounted: function(){
    
  },
  methods: {
  	handleData: function(e) {
      console.log(e);
      this.editor = e;
    }
  },
  computed: {
      products() {
        return this.$store.getters['products/getAllProducts'];
      },
      productsCategory() {
        return this.$store.getters['products/getByCategoryProducts'](this.select);
      }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
