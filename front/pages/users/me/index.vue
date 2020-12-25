<template>
  <div class="container">
    <div class="user-info-wrapper">
      <div class="single-user-info">
        <span>Name :</span> <span> {{ loggedInUser.name }} </span>
      </div>
      <div class="single-user-info">
        <span>Email :</span> <span> {{ loggedInUser.email }} </span>
      </div>
      <div class="button-wrapper">
        <nuxt-link to="/users/me/edit">Edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>
