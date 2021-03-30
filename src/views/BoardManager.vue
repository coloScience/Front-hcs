<template>
  <div class="container">
    <header class="bg-white jumbotron">
      <h1 style="text-align: center">{{content}}</h1>
      <Ticket :moder="true" :ticketsId="item.id" :item="item" v-for="item in tickets"/>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import Ticket from "@/components/ticket";
import {localIp} from "@/config/host.config";

export default {
  name: 'manager',
  components: {
    Ticket,
  },
  data() {
    return {
      content: '',
      tickets: '',
    };
  },
  mounted() {
    const username = localStorage.getItem('user')
    UserService.getTicket(`${localIp}/api/ticketGet`, 'http://colo-science.ru/manager').then(
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
@media screen and (max-width: 450px){
  .container{
    padding: 0;
  }
  .jumbotron{
    padding: 0;
  }
}
</style>