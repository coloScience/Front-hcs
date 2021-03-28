<template>
  <div id="app">
    <main-nav />
      <router-view />
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
