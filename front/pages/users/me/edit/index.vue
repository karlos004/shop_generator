<template>
  <div class="container">
    <div class="user-info-edit-wrapper">
      <div class="single-user-info">
        <span>Name :</span>
        <input type="text" v-model="name">
      </div>
      <div class="single-user-info">
        <span>Email :</span>
        <input type="text" v-model="email">
      </div>
      <div class="button-wrapper">
        <button type="button" @click="changeInfo()">Change</button>
      </div>
    </div>
    <div class="user-password-edit-wrapper">
      <div class="single-user-info">
        <span>Password :</span>
        <input type="password" v-model="password" placeholder="***********">
      </div>
      <div class="single-user-info">
        <span>Confirm password :</span>
        <input type="password" v-model="password2">
      </div>
      <div class="button-wrapper">
        <button type="button" @click="changePassword">Change</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      password: '',
      password2: ''
    }
  },
  methods: {
    async changeInfo(){
      try {
        await this.$axios.post('http://localhost:5000/api/user/' + this.$auth.user.user_id + '/edit', {
          name: this.name,
          email: this.email
        })
        await this.$auth.fetchUser();
        this.$router.push({ path: './' })
      } catch (e) {
        console.log(e)
      }
    },
    async changePassword(){
      if (this.password == this.password2){
        try {
          await this.$axios.post('http://localhost:5000/api/user/' + this.$auth.user.user_id + '/changepassword', {
            password: this.password,
          })
          await this.$auth.fetchUser();
          this.$router.push({ path: './' })
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>
