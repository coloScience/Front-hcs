<template>
  <div class="container">
    <header style="background-color: #fff;" class="jumbotron">
      <h3 style="text-align: center">{{content}}</h3>
      <main>
        <div class="menu">
          <form action="">
            <input type="text" v-model="title" placeholder="Тема">
            <input type="text" v-model="firstName" placeholder="Имя">
            <input type="text" v-model="secondName" placeholder="Фамилия">
            <input type="text" v-model="lastName" placeholder="Отчество">
            <input type="text" v-model="phone" placeholder="Телефон">
            <input type="email" v-model="email" placeholder="Эл почта">
            <textarea v-model="reason" placeholder="Ваша проблема"></textarea>
          </form>
          <button class = 'menu-button' v-on:click="sends()">
            Добавить
          </button>
        </div>
        <br>
        <br>
        <br>
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
      </main>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from 'axios';

export default {
  name: 'User',
  data() {
    return {
      tickeds:'',
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

main{
  width: 1500px;
  height: 600px;
}
section{
  overflow-y: scroll;
  width: 500px;
  height: 100%;
  border-radius: 12px;
  float: right;
  margin-right: 2%;
}
.menu-button{
  font-size: 18px;
  float:left;
  margin-left: 10px;
  background-color: #6FABE2;
  outline: none;
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 48px;
  color: #fff;
}
input{
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
}
textarea{
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
.card-body__header{
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 25px;
  float:left;
}
.status{
  margin-left: 10px ;
  float:right;
  color: #FC6363;
  font-size: 20px;
}
.card-body__date{
  width: 100%;
  height: 10px;
  float:left;
  margin-top: 10px;
  font-size: 14px;
  line-height: 16px;
  color: #9F9F9F;
}
.card-body__discription{
  float:left;
  margin-top: 20px;
  width: 270px;
  height: 32px;
  font-size: 13.9739px;
  line-height: 16px;
  color: #9F9F9F;
}
.card-body__button{
  margin-top: 40px;
  width: 173px;
  height: 48px;
  background: #6FABE2;
  border-radius: 9px;
  font-style: normal;
  font-weight: 500;
  font-size: 14x;
  line-height: 16px;
  color: #fff;
  outline: none;
  border: none;
}
.change-settings{
  background: rgba(0, 0, 0, .2);
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  transition-duration: 1s;
  display: none;
}
.change-settings__menu{
  transition: right .2s linear;
  width: 400px;
  height: 500px;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -250px;
  background-color: #fff;
  position: absolute;
  border-radius: 5px;
}
.close-btn{
  user-select: none;
  text-align: center;
  font-size: 34px;
  width: 48px;
  height: 48px;
  background-color: #fff;
  color: #6FABE2;
  position: absolute;
  right: -50px;
  top: -50px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 37px 24px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 37px 24px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 37px 24px rgba(34, 60, 80, 0.2);
}
.change-settings__btn{
  width: 173px;
  height: 48px;
  background: #6FABE2;
  border-radius: 9px;
  font-size: 14x;
  color: #fff;
  outline: none;
  border: none;
}
</style>