<template>
  <div class="cards">
    <div class="mb-5">
      <ul class="list-group">
        <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{item.title}}</h4></li>
        <li class="list-group-item"><strong>Описание: </strong>{{item.reason}}</li>
        <li class="list-group-item"><strong>ФИО: </strong>{{item.secondName}} {{item.firstName}} {{item.lastName}}</li>
        <li class="list-group-item"><strong>Адрес: </strong><span>{{item.street}} <br><strong>Дом: </strong> {{item.house}} <br> <strong>Квартира: </strong> {{item.flat}}</span></li>
        <li class="list-group-item"><strong>Email: </strong>{{item.email}}</li>
        <li class="list-group-item"><strong>Phone: </strong>{{item.phone}}</li>
        <li class="list-group-item"><strong>Username: </strong>{{item.login}}</li>
        <li class="list-group-item"><strong>status: </strong><span class="btn-success btn-sm mr-2" v-for="items in status">{{items.name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service'
import axios from 'axios'
export default {
  name: "ticket",
  data() {
    return {
      tickets: '',
      status: '',
    }
  },
  props:{
    item: ''
  },
  mounted() {
    const username = JSON.parse(localStorage.getItem('user'))
    //Запрос заявки пользователя по имени
    setTimeout(()=>{
      UserService.getStatus('http://localhost:8080/api/statusGet',{login: username.username}, {id: this.item.id}).then(
          response => {
            this.status = response.data
          }
      )
    },800)
  }

}
</script>

<style scoped>

</style>