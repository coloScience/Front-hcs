<template>
  <div id="app">
    <main-nav />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import mainNav from '@/components/main-nav'
export default {
  components:{
    'main-nav': mainNav
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
