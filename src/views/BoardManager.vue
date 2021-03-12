<template>
  <div class="container">
    <header class="bg-white jumbotron">
      <div class="mb-5" v-for="data in statuses, tickets">
        <ul class="list-group">
          <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{data.title}}</h4></li>
          <li class="list-group-item"><strong>Описание: </strong>{{data.reason}}</li>
          <li class="list-group-item"><strong>id: </strong>{{data.id}}</li>
          <li class="list-group-item"><strong>ФИО: </strong>{{data.secondName}} {{data.firstName}} {{data.lastName}}</li>
          <li class="list-group-item"><strong>Email: </strong>{{data.email}}</li>
          <li class="list-group-item"><strong>Phone: </strong>{{data.phone}}</li>
          <li class="list-group-item"><strong>Username: </strong>{{data.login}}</li>
          <li class="list-group-item"><strong>status: </strong><span class="btn-success btn-sm">{{data.status}}</span>
            <button v-if="data.status !== 'in work'" v-on:click="changeStatus(data.id,data.status)" style="background-color: #6FABE2;" class="text-white btn-sm ml-4 btn">поменять статус на "В работе"</button></li>
          <li class="list-group-item">
            <button v-on:click="setСontractor()" style="background-color: #6FABE2;" class="text-white btn">назначить исполнителя</button>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from "axios";
import {localIp} from "@/config/host.config";

export default {
  name: 'manager',
  data() {
    return {
      content: '',
      ticket: '',
      tickets: '',
      statuses: ''
    };
  },
  methods: {
    setСontractor(id) {
    },
    changeStatus(id) {
      let username = JSON.parse(localStorage.getItem('user'))
      username = username.username
      let data = {
        id,
        status: 'in work'
      }
      console.log(data)
      axios({
        method: 'POST',
        url: localIp + '/api/ticket/changeStatus/',
        data: data
      }).then((response) => {
        console.log(response.data);
      })
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
    let username = localStorage.getItem('user')
    UserService.getTicket(JSON.parse(username).username)
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
    UserService.getManagerBoard()
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
