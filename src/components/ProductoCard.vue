<template>
  <div class="card d-flex flex-column">
    <div class="contenidoFlex d-flex justify-content-center align-items-center mt-2">
      <img
        class="card-img-top col"
        :alt="producto.nombre"
        :src="require(`@/assets/images/${producto.variante[0].variantImage}`)"
      />
    </div>
    <div class="contenidoFlex mt-auto">
      <h3 class="card-header">{{producto.nombre}}</h3>
      <div class="card-body">
        <p class="card-text">Marca: {{producto.marca}}</p>
        <ul class="detalles">
          <li v-for="(detalle,index) in producto.detalles" :key="index">{{detalle}}</li>
        </ul>
        <button class="btn btn-success" @click="agregarCarrito">Agregar</button>
        <button class="btn btn-secondary">Detalles</button>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '@/main.js';
export default {
  name: "ProductoCard",
  props: {
    producto: {
      required: true
    }
  },
  computed: {
    agregarIdProducto(){
      return this.producto.variante[this.producto.selectedVariant].variantId;
    }
  },
  methods:{
    agregarCarrito(){
      bus.$emit('agregarCarrito',this.agregarIdProducto);
    }
  }
};
</script>

<style scoped>
.detalles li {
  font-size: 1rem;
}
.card-text {
  font-size: 1.2rem;
}
.card {
  min-height: 650px;
}
.card-img-top {
  max-width: 80%;
}


</style>