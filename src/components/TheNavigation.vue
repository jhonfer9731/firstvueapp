<template>
  <div id="nav" class="navbar navbar-expand-sm navbar-light bg-dark">
    <router-link to="/" class="navbar-brand">JF</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <!-- Es el boton cuando se contrae la pagina -->
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
      <div class="navbar-nav">
        <router-link :to="{name: 'Home'}" class="nav-item nav-link active">Home</router-link>
        <router-link :to="{name: 'About'}" class="nav-item nav-link">Sobre Nosotros</router-link>
        <router-link :to="{name: 'Productos'}" class="nav-item nav-link">Productos</router-link>
      </div>
      <div class="navbar-nav">
        <router-link :to="{name: 'Registro'}" class="nav-item nav-link">Mi cuenta</router-link>
        <!--<form class="form-inline" @click.prevent>
          <button class="btn btn-primary">Carrito</button>
        </form>-->
        <Carrito />
      </div>
    </div>
  </div>
</template>

<script>
import Carrito from "@/components/Carrito";
export default {
  components: {
    Carrito
  }
};
</script>

<style>
#nav {
  margin: 5px 0px;
  padding: 15px 1%;
}
</style>