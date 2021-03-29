<template>
  <div class="container">
    <header style="background-color: #fff;" class="jumbotron">
      <h3 style="text-align: center">{{content}}</h3>
        <main style="display: flex; flex-wrap: wrap" class="mt-5 col-12">
          <div class="menu mb-5 col-6">
            <form class="forms" action="">
              <input class="inputs" type="text" v-model="title" placeholder="Тема">
              <input class="inputs" type="text" v-model="secondName" placeholder="Фамилия">
              <input class="inputs" type="text" v-model="firstName" placeholder="Имя">
              <input class="inputs" type="text" v-model="lastName" placeholder="Отчество">
              <input class="inputs" type="text" v-model="street" placeholder="Улица">
              <input class="inputs" type="text" v-model="house" placeholder="Дом">
              <input class="inputs" type="text" v-model="flat" placeholder="Квартира">
              <input class="inputs" type="text" v-model="phone" placeholder="Телефон">
              <input class="inputs" type="email" v-model="email" placeholder="Эл почта">
              <textarea class="textareas" v-model="reason" placeholder="Ваша проблема"></textarea>
            </form>
            <button class = 'menu-button' v-on:click="sends()">
              Добавить
            </button>
          </div >
          <div class="container-ticket col-6">
            <ticket v-bind:item="item" v-for="item in tickets"/>
          </div>
        </main>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import ticket from "@/components/ticket";
import {localIp} from '../config/host.config'

export default {
  name: 'Ticket',
  data() {
    return {
      content:'',
      tickets:'',
      status: '',
      email: '',
      firstName: '',
      secondName: '',
      lastName: '',
      street: '',
      house: '',
      flat: '',
      phone: '',
      title: '',
      reason: ''
    };
  },
  components:{
    ticket
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
        street: this.street,
        house: this.house,
        flat: this.flat,
        phone: this.phone,
        title: this.title,
        reason: this.reason
      }
      UserService.getTicket(`${localIp}/api/ticket`, {login: username}, data).then(
        response=>{
           this.tickets = response.data
        },
        error => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
      )
      this.email = ''
      this.firstName = ''
      this.secondName = ''
      this.lastName = ''
      this.street = ''
      this.house = ''
      this.flat = ''
      this.phone = ''
      this.title = ''
      this.reason = ''
      setTimeout(()=>{
        UserService.getTicket(`${localIp}/api/ticketGet`,{login:username}).then(
          response => {
            this.tickets = response.data;
          },
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
        )
      },350)
    }
  },
  mounted() {
   const username = JSON.parse(localStorage.getItem('user'))
    //Запрос заявки пользователя по имени
    UserService.getTicket(`${localIp}/api/ticketGet`,{login:username.username}).then(
        response => {
          this.tickets = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    )
   //запрос страницы заявок
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
    )
  }
}
</script>
<style>
.container-ticket{
  display: flex;
  flex-wrap: wrap;
  width: 600px;
}
.menu-button{
  font-size: 18px;
  margin-left: 10px;
  background-color: #6FABE2;
  outline: none;
  border: none;
  border-radius: 10px;
  width: 410px;
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
  width: 410px;
  height: 180px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #CDCDCD;
  resize: none;
  outline: none;
  margin-top: 10px;
  margin-left: 10px;
}
</style>