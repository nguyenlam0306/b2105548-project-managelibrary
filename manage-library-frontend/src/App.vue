<script setup>
import { useSocketStore } from "./stores/socket.store";
import { onBeforeMount, onBeforeUnmount } from "vue"
const socketStore = useSocketStore()
onBeforeMount(() => {
    socketStore.connect()
})
onBeforeUnmount(() => {
    socketStore.disconnect()
})
</script>

<!-- src/App.vue -->
<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header
  }
};
</script>

<style scoped>
/* global styles */
</style>
