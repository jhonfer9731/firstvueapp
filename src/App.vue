<template>
  <div id="app">
    <!-- <TheNavigation /> -->
    <transition name="fade">
      <router-view :key="$route.path" />
    </transition>
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
//import TheNavigation from "@/components/TheNavigation";
//import TheFooter from "@/components/TheFooter";
export default {
  components: {
    //TheNavigation,
    //TheFooter
  },
  data() {
    return {
      transitionName: undefined
    };
  },
  methods: {
    consoleLog(agregarIdProducto) {
      console.log(agregarIdProducto);
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c4753;
}

#nav a {
  font-weight: bold;
  color: #f6f6fbf3;
}

#nav a.clase-activacion-rutas {
  color: #42b983;
}

a:hover {
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
