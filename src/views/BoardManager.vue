<template>
  <div class="container">
    <header class="bg-white jumbotron">
      <h1 style="text-align: center">{{content}}</h1>
      <Ticket v-bind:item="item" v-for="item in tickets"/>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from "axios";
import Ticket from "@/components/ticket";

export default {
  name: 'manager',
  components: {
    Ticket
  },
  data() {
    return {
      content: '',
      tickets: '',
    };
  },
  mounted() {
    const username = localStorage.getItem('user')
    UserService.getTicket('http://localhost:8080/api/ticketGet', {login: username.username}).then(
        response => {
          this.tickets = response.data
        },
        error => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }

    )
    //запрос страницы менеджера
    UserService.getManagerBoard().then(
      response => {
        this.content = response.data;
        console.log(response.data)
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
