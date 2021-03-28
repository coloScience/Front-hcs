<template>
  <div class="cards">
    <div class="mb-5">
      <ul style="min-width: 500px; margin-right: 10px" class="list-group" v-cloak>
        <li style="background-color: #6FABE2;" class="list-group-item text-white text-sm-center"><h4>{{item.title}}</h4></li>
        <li class="list-group-item"><strong>Описание: </strong>{{item.reason}}</li>
        <li class="list-group-item"><strong>ФИО: </strong>{{item.secondName}} {{item.firstName}} {{item.lastName}}</li>
        <li class="list-group-item"><strong>Адрес: </strong><span>{{item.street}} <br><strong>Дом: </strong> {{item.house}} <br> <strong>Квартира: </strong> {{item.flat}}</span></li>
        <li class="list-group-item"><strong>Email: </strong>{{item.email}}</li>
        <li class="list-group-item"><strong>Phone: </strong>{{item.phone}}</li>
        <li class="list-group-item"><strong>Username: </strong>{{item.login}}</li>
        <li class="list-group-item"><strong>status: </strong><span class="btn-success btn-sm mr-2" v-for="items in status">{{items.name}}</span></li>
        <li class="list-group-item" v-if="moder === true && !status[1]"><button @click="getWorker" style="background-color: rgb(111, 171, 226); color: #FFFFFF" class="btn btn-sm">Назначить исполнителя</button></li>
        <li class="list-group-item" v-if="worker && !this.status[2]"><button @click="setStatus(3)" style="background-color: rgb(111, 171, 226); color: #FFFFFF" class="btn btn-sm">Отправить на проверку</button></li>
        <li class="list-group-item" v-if="!moder && !worker && this.status[2] && !this.status[3]"><button @click="setStatus(4)" style="background-color: rgb(111, 171, 226); color: #FFFFFF" class="btn btn-sm">Подтвердить работу</button></li>
        <li class="list-group-item" v-if="!moder && !worker && this.status[2] && !this.status[3]"><button @click="rebaseTicket" style="background-color: rgb(111, 171, 226); color: #FFFFFF" class="btn btn-sm">Работа не выполнена</button></li>
      </ul>
      <workerButton v-if="onWorker" :tickets="ticketsId" :workers="item.userId" class="worker" :item="item" v-for="item of workers" />
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service'
import workerButton from '@/components/worker-button'
import {localIp} from '@/config/host.config'
export default {
  name: "ticket",
  data() {
    return {
      content: '',
      tickets: '',
      status: '',
      onWorker: false,
      workers: ''
    }
  },
  components:{
    workerButton
  },
  props:{
    item: '',
    moder: false,
    worker: false,
    ticketsId: '',
  },
  methods:{
    rebaseTicket(){
      UserService.getStatus(`${localIp}/api/rebase`,{},{id: this.item.id}).then(
          response => {
            this.status = response.data
            location.reload()
          },
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
    setStatus(props){
      UserService.getStatus(`${localIp}/api/status`,{},{id: this.item.id, status: props}).then(
          response => {
            this.status = response.data
            location.reload()
          },
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
    getWorker() {
      this.onWorker = !this.onWorker
      if (this.onWorker = this.onWorker) {
        UserService.getWorker('http://localhost:8080/api/worker').then(
            response => {
              this.workers = response.data
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
  },
  mounted() {
    const username = JSON.parse(localStorage.getItem('user'))
    //Запрос заявки пользователя по имени
    setTimeout(()=>{
      UserService.getStatus('http://localhost:8080/api/statusGet',{login: username.username}, {id: this.item.id}).then(
          response => {
            this.status = response.data
            console.log(this.status[1])
          }
      )
    },800)
  }

}
</script>

<style scoped>

</style>