<template>
  <div id="app">
    <tool-airbit msg="Airbit tool"/>
  </div>
</template>

<script>
import ToolAirbit from '../components/ToolAirbit.vue'

export default {
  name: 'app',
  components: {
    'tool-airbit' : ToolAirbit
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
