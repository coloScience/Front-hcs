<template>
  <div class="container">
    <Ticket :worker="true" :item="item" v-for="item in worker" />
  </div>
</template>

<script>
import UserService from '../services/user.service'
import {localIp} from '../config/host.config'
import Ticket from '@/components/ticket'

export default {
  name: "worker",
  components:{
    Ticket
  },
  data() {
    return {
      content: '',
      worker: '',
    };
  },
  mounted() {
    const username = localStorage.getItem('user')
    UserService.getWorker(`${localIp}/api/ticketToWorker`,{login: username}).then(
      response => {
        this.worker = response.data
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

<style scoped>

</style>