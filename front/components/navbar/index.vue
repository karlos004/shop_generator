<template>
  <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle" @click="open()">
          <img src="~/assets/images/hamburer.svg" alt="hamburger">
        </span>
    <nuxt-link to="/" class="logo">LOGO</nuxt-link>
    <ul v-if="!isAuthenticated" class="main-nav" id="js-menu">
        <li>
          <nuxt-link to="/login" class="nav-links">Login</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/register" class="nav-links">Register</nuxt-link>
        </li>
    </ul>
    <ul v-else class="main-nav" id="js-menu">
      <li>
        <nuxt-link to="/generate" class="nav-links">Generator</nuxt-link>
      </li>
      <li>
        <div class="dropdown hide-on-mobile" >
          <a class="dropbtn">{{ loggedInUser.name }}
            <i class="fa fa-caret-down"></i>
          </a>
          <div class="dropdown-content">
            <nuxt-link to="/users/me" class="nav-links">Profile</nuxt-link>
            <nuxt-link to="/shops/me" class="nav-links">My shops</nuxt-link>
            <nuxt-link to="/" @click.native="logout" class="nav-links">Logout</nuxt-link>
          </div>
        </div>
      </li>
      <li class="show-on-mobile">
        <nuxt-link to="/me" class="nav-links">Profile</nuxt-link>
      </li>
      <li class="show-on-mobile">
        <nuxt-link to="/shops/me" class="nav-links">My shops</nuxt-link>
      </li>
      <li class="show-on-mobile">
        <nuxt-link to="/" @click.native="logout" class="nav-links">Logout</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
name: "navbar",
  data(){
    return{
    }
  },
  methods: {
    open() {
      let mainNav = document.getElementById('js-menu');
        mainNav.classList.toggle('active');
    },
    async logout() {
      await this.$auth.logout();
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>

<style lang="css" scoped>
@import './styles/style.css';
</style>
