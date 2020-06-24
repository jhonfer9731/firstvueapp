<template>
  <div id="app">
    <TheNavigation />
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
export default {
  components:{
    TheNavigation
  },
  methods:{
    consoleLog(agregarIdProducto){
      console.log(agregarIdProducto)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c4753;
}

#nav a {
  font-weight: bold;
  color: #92aeca;
}

#nav a.clase-activacion-rutas {
  color: #42b983;
}
</style>
