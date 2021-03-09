<template>
  <div class="container">
    <header class="jumbotron">
      <div style="width: 600px" v-for="(f, index) in tickeds">
        <hr>
        <p>Тема:</p>
        <h3>{{f.title}}</h3>
        <br>
        <hr>
        <p>номер заявки:</p>
        <h3>{{f.id}}</h3>
        <br>
        <hr>
        <p>ФИО пользователя:</p>
        {{f.firstName}}
        {{f.secondName}}
        {{f.lastName}}
        <br>
        <hr>
        <p>Имя пользователя:</p>
        {{f.login}}
        <br>
        <hr>
        <p>Адресс эллектронной почты:</p>
        {{f.email}}
        <br>
        <hr>
        <p>Причина:</p>
        <p>{{f.reason}}</p>
        <hr>
        <br>
        <hr>
        <br>
        <div v-bind="index">
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Admin',
  data() {
    return {
      content: '',
      tickeds: ''
    };
  },
  mounted() {
    setTimeout(()=>{
      UserService.getTicked()
          .then(
              response => {
                this.tickeds = response.data;
              },
              error => {
                this.tickeds =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
    }, 1000)
    UserService.getAdminBoard().then(
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
