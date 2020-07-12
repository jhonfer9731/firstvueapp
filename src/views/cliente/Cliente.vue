<template>
  <div class="cliente">
      <TheNavigation/>
      <router-view :key="$route.path"/>
      <TheFooter/>
      <Login/>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
import TheFooter from "@/components/TheFooter";
import Login from "@/components/Login";
export default {
 name: "Cliente",
 components: {
     TheNavigation,
     TheFooter,
     Login,
 },
 data(){
   return{
     transitionName : 'slide-right'
   }
 },
 watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
}
</script>

<style lang="scss" scoped>
</style>