<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        front
      </h1>
      <div class="links">
        <input v-model="name" placeholder="Name">
        <button class="button--green" v-on:click="generate">Submit</button>
        <div v-if="response">{{ this.response }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../.nuxt/axios";

export default {
  data() {
    return {
      response: '',
      name: ''

    }
  },
  methods: {
    generate: function () {
      this.$axios.$get('/api/generate?name=' + this.name)
        .then(response => (this.response = response))
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
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
