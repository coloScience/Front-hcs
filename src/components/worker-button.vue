<template>
  <button class="btn btn-sm btn-info w-100" v-on:click="setWorker">
    {{item.secondName}}
    {{item.firstName}}
    {{item.lastName}}
  </button>
</template>

<script>
import UserService from "@/services/user.service";
import {localIp} from '../config/host.config'

export default {
name: "worker-button",
  data(){
    return{
    }
  },
  props:{
    item: '',
    workers: '',
    tickets: '',
    status: '',
  },
  methods:{
    setWorker() {
      const username = localStorage.getItem('user').username
      UserService.getWorker(`${localIp}/api/workerSet`, {userid: this.workers, ticketid: this.tickets}).then(
          response => {
            this.workers = response.data
            UserService.getStatus(`${localIp}/api/status`,{username},{id: this.tickets, status: 2}).then(
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
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    }
  }
}
</script>

<style scoped>

</style>