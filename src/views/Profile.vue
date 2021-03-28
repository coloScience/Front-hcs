<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <div class="container-roles">
      <ul class="container-roles__list">
        <li class="btn-success btn-sm btn mr-2" v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    UserService.getUser()
      .then()
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
<style>

</style>