<template>
  <div class="container">
    <header class="bg-white jumbotron">
      <div class="mb-5" v-for="data in tickets">
        <ul class="list-group">
          <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{data.title}}</h4></li>
          <li class="list-group-item"><strong>Описание: </strong>{{data.reason}}</li>
          <li class="list-group-item"><strong>id: </strong>{{data.id}}</li>
          <li class="list-group-item"><strong>ФИО: </strong>{{data.secondName}} {{data.firstName}} {{data.lastName}}</li>
          <li class="list-group-item"><strong>Email: </strong>{{data.email}}</li>
          <li class="list-group-item"><strong>Phone: </strong>{{data.phone}}</li>
          <li class="list-group-item"><strong>Username: </strong>{{data.login}}</li>
          <li class="list-group-item"><strong>status: </strong>{{data.status}}</li>
        </ul>
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
      tickets:''
    };
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
