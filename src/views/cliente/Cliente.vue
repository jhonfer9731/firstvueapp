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
     Login
 }
}
</script>

<style lang="scss">

</style>