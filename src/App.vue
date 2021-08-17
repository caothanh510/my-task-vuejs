<template>
  <div id="app" class="bg-light">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Thanh Huynh</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tasks" class="nav-link">Tasks</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
      <task-list />
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
  components: {
    TaskList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
