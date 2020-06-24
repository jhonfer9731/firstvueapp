<template>
  <div class="dropdown">
    <button
      class="carrito_btn btn btn-success dropdown-toggle bg-dark"
      id="dropDownMenuLink"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
    >
      Carrito
      <span class="badge badge-light">{{productsAddedVariantId.length}}</span>
    </button>
    <div class="dropdown-menu dropdown-menu-right p-4" aria-labelledby="dropDownMenuLink">
      <div class="carrito-producto-envoltura" v-if="productsAdded !== null">
        <ProductoCartMiniatura
          v-for="(productAdded,index) in productsAdded"
          :key="index"
          :infoProducto="productAdded"
        />
      </div>
      <!--
      <a class="dropdown-item" href="#">Something else here</a>
      <a class="dropdown-item" href="#">{{cantidadPorRef}}</a>-->
    </div>
  </div>
</template>

<script>
import { bus } from "@/main.js";
import store from "@/store.js";
import ProductoCartMiniatura from "@/components/ProductoCartMiniatura.vue";
export default {
  name: "Carrito",
  components: {
    ProductoCartMiniatura
  },
  data() {
    return {
      productsAddedVariantId: [],
      cantidadPorRefData: {}
    };
  },
  methods: {
    actualizarCarro(id) {
      this.productsAddedVariantId.push(id);
    }
  },
  props: {},
  created() {
    bus.$on("agregarCarrito", agregarIdProducto => {
      //console.log("emitio");
      this.productsAddedVariantId.push(agregarIdProducto);
    });
  },
  computed: {
    productsAdded() {
      const productos = [];
      const varianteDetalles = [];
      Object.keys(this.cantidadPorRef).forEach( key => {
        // itera sobre cada id que ha sido agregado lo que corresponde a cada elemento que fue añadido al carrito
        const productoEncontrado = store.productos.filter(producto => {
          // busca en cada producto de store.js
          //console.log(producto.nombre)
          const incidencias = [];
          producto.variante.forEach(varianteItem => {
            // busca en cada variante que tenga el producto y ve si encuentra la variante con el id agregado
            if ((varianteItem.variantId).toString() === key)
              incidencias.push(varianteItem); // si encuentra agrega a lista de incidencias
          });
          //console.log('itero');
          if (incidencias.length == 0) return false;
          // si encontro incidencias el producto fue agregado y lo encontró
          else{
            varianteDetalles.push(incidencias[0]);
            return true;
          } 
        });
        //productoEncontrado[0].variante = varianteDetalles;
        productoEncontrado[0]['cantidad'] = this.cantidadPorRef[key].toString();
        
        const newProduct = Object.assign({},productoEncontrado[0]) // solo funciona con ES6
        console.log(newProduct)
        productos.push(newProduct); // se agrega el producto encontrado a la variable productos
      })
      //console.log(productos);
      if (!productos) {
        return null;
      } else {
        return productos; // retorna los productos añadidos
      }
    },
    cantidadPorRef(){
      const cantidadPorRefObj = {}
      for(let i = 0; i<this.productsAddedVariantId.length;i++){
        const VariantId = this.productsAddedVariantId[i];
        cantidadPorRefObj[VariantId] = cantidadPorRefObj[VariantId] ? cantidadPorRefObj[VariantId]+1 : 1;
      }
      return cantidadPorRefObj;
    }
  }
};
</script>

<style scoped>

.dropdown-menu {
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}
.carrito-producto-envoltura{
  min-width: 250px;
}
</style>