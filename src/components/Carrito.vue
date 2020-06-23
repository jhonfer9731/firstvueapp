<template>
  <div>
      <button class="carrito_btn btn btn-success">
          Carrito <span class="badge badge-light">{{productsAdded.length}}</span>
      </button>
  </div>
</template>

<script>
import {bus} from '@/main.js';
export default {
    name: 'Carrito',
    data(){
        return{
            productsAdded : []
        }
    },
    methods:{
        actualizarCarro(id){
            this.productsAdded.push(id)
        }
    },
    props:{

    },
    created(){
        bus.$on('agregarCarrito', (agregarIdProducto) => {
            console.log("emitio");
            this.productsAdded.push(agregarIdProducto) ; 
        })
    }
}
</script>

<style>

</style>