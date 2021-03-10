<template>
  <div class="container">
    <header style="background-color: #fff;" class="jumbotron">
      <h3 style="text-align: center">{{content}}</h3>
        <main class="mt-5">
          <div class="menu mb-5">
            <form class="forms" action="">
              <input class="inputs" type="text" v-model="title" placeholder="Тема">
              <input class="inputs" type="text" v-model="firstName" placeholder="Имя">
              <input class="inputs" type="text" v-model="secondName" placeholder="Фамилия">
              <input class="inputs" type="text" v-model="lastName" placeholder="Отчество">
              <input class="inputs" type="text" v-model="phone" placeholder="Телефон">
              <input class="inputs" type="email" v-model="email" placeholder="Эл почта">
              <textarea class="textareas" v-model="reason" placeholder="Ваша проблема"></textarea>
            </form>
            <button class = 'menu-button' v-on:click="sends()">
              Добавить
            </button>
          </div>
          <div class="cards">
            <div class="mb-5" v-for="(f, index) in tickets">
              <ul class="list-group">
                <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{f.title}}</h4></li>
                <li class="list-group-item"><strong>Описание: </strong>{{f.reason}}</li>
                <li class="list-group-item"><strong>id: </strong>{{f.id}}</li>
                <li class="list-group-item"><strong>ФИО: </strong>{{f.secondName}} {{f.firstName}} {{f.lastName}}</li>
                <li class="list-group-item"><strong>Email: </strong>{{f.email}}</li>
                <li class="list-group-item"><strong>Username: </strong>{{f.login}}</li>
                <li class="list-group-item"><strong>status: </strong>{{f.status}}</li>
              </ul>
              <div v-bind="index">
              </div>
            </div>
          </div>
        </main>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from 'axios';

export default {
  name: 'Заявки',
  data() {
    return {
      tickets:'',
      content: ''
    };
  },
  methods: {
    sends() {
      let username = JSON.parse(localStorage.getItem('user'))
      console.log(username)
      username = username.username
      console.log(username)
      let data = {
        login: username,
        email: this.email,
        firstName: this.firstName,
        secondName: this.secondName,
        lastName: this.lastName,
        phone: this.phone,
        title: this.title,
        reason: this.reason
      }
      console.log(data)
      axios({
        method: 'POST',
        url: 'http://10.1.0.180:8080/api/ticked/create/',
        data: data
      }).then((response) => {
        console.log(response.data);
      })

      let result = response.json();
      console.log(result)
    }
  },
  mounted() {
      UserService.getTicket()
          .then(
              response => {
                this.tickets = response.data;
              },
              error => {
                this.tickets =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
    UserService.getUserBoard().then(
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
<style>
.cards{
  display: inline-block;
  width: 500px;
  float: right;
}
.menu-button{
  font-size: 18px;
  margin-left: 10px;
  background-color: #6FABE2;
  outline: none;
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 48px;
  color: #fff;
}
.inputs{
  font-size: 18px;
  padding-left: 10px;
  outline: none;
  width: 200px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #CDCDCD;
  margin-top: 10px;
  margin-left: 10px;
  float:left;
}
.menu{
  width: 500px;
  height: auto;
  display: inline-block;
}
.textareas{
  font-size: 18px;
  padding-top: 10px;
  padding-left: 10px;
  width: 200px;
  height: 90px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #CDCDCD;
  resize: none;
  outline: none;
  margin-top: 10px;
  margin-left: 10px;
}
.card{
  margin-bottom: 30px;
  width: 471px;
  height: 273px;
  background: #FFFFFF;
  border: 1px solid #CDCDCD;
  box-sizing: border-box;
  border-radius: 10px;
}
.card-body{
  height: 220px;
  margin-top: 45px;
  margin-left: 28px;
}
</style>