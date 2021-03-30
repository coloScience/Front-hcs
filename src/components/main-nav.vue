<template>
  <div class="navig navbar navbar-expand navbar-dark bg-dark">
    <div class="mob navbar-nav mr-auto">
      <li v-if="false" class="nav-item">
        <router-link to="/home" class="nav-link">Home
        </router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
        <router-link to="/admin" class="nav-link">Администратор</router-link>
      </li>
      <li v-if="showModeratorBoard" class="nav-item">
        <router-link to="/manager" class="nav-link">Диспетчер</router-link>
      </li>
      <li v-if="showWorkBoard" class="nav-item">
        <router-link to="/worker" class="nav-link">Исполнитель</router-link>
      </li>
      <li v-if="currentUser" class="nav-item">
        <router-link to="/user" class="nav-link">Заявки</router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          Login
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="w200 navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">LogOut
        </a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-nav",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('admin');
      }

      return false;
    },
    showWorkBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('worker');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('manager');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 450px){
  .w200 {
    margin: 0;
    position: absolute;
    right: 1px;
    display: block;
  }
  .navig {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .mob{
    flex-wrap: wrap;
    position: relative;
  }
}
</style>