<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{content}}</h1>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Admin',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getAdminBoard()
      .then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
  }
};
</script>
