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
            <div class="mb-5" v-for="data in tickets">
              <ul class="list-group">
                <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{data.title}}</h4></li>
                <li class="list-group-item"><strong>Описание: </strong>{{data.reason}}</li>
                <li class="list-group-item"><strong>id: </strong>{{data.id}}</li>
                <li class="list-group-item"><strong>ФИО: </strong>{{data.secondName}} {{data.firstName}} {{data.lastName}}</li>
                <li class="list-group-item"><strong>Email: </strong>{{data.email}}</li>
                <li class="list-group-item"><strong>Phone: </strong>{{data.phone}}</li>
                <li class="list-group-item"><strong>Username: </strong>{{data.login}}</li>
                <li class="list-group-item"><strong>status: </strong><span class="btn-success btn-sm">{{data.status}}</span></li>
              </ul>
            </div>
          </div>
        </main>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from 'axios';
import {localIp} from '../config/host.config'

export default {
  name: 'Ticket',
  data() {
    return {
      content:'',
      tickets:'',
      email: '',
      firstName: '',
      secondName: '',
      lastName: '',
      phone: '',
      title: '',
      reason: ''
    };
  },
  methods: {
    sends() {
      let username = JSON.parse(localStorage.getItem('user'))
      username = username.username
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
      console.log(!!this.email)
      axios({
        method: 'POST',
        url: localIp + '/api/ticket/',
        data: data
      }).then((response) => {
        console.log(response);
      })
      this.email = ''
      this.firstName = ''
      this.secondName = ''
      this.lastName = ''
      this.phone = ''
      this.title = ''
      this.reason = ''
      setTimeout(()=>{
        UserService.getTicket(username)
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
      },150)
    }
  },
  mounted() {
    let username = JSON.parse(localStorage.getItem('user'))
      UserService.getTicket(username.username)
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