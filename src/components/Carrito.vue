<template>
  <div class="nav-item dropdown">
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
    <div class="dropdown-menu dropdown-menu-right p-4" aria-labelledby="dropDownMenuLink" v-show="productsAddedVariantId.length">
      <div class="carrito-producto-envoltura">
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
      cantidadPorReferencia: {},
      productsAdded: []
    };
  },
  methods: {
    actualizarCarro() {
      this.productsAdded = []
      Object.keys(this.cantidadPorReferencia).forEach(key => {
        // itera sobre cada id que ha sido agregado lo que corresponde a cada elemento que fue añadido al carrito
        const productoEncontrado = store.productos.filter(producto => {
          // busca en cada producto de store.js
          let incidencias = null;
          producto.variante.every(function(varianteItem) {
            // busca en cada variante que tenga el producto y ve si encuentra la variante con el id agregado
            if (varianteItem.variantId.toString() === key)
              incidencias = varianteItem; // si encuentra agrega a lista de incidencias
            return false;
          });
          if (!incidencias) return false;
          // si encontro incidencias el producto fue agregado y lo encontró
          else {
            return true;
          }
        });
        productoEncontrado[0]["cantidad"] = this.cantidadPorReferencia[
          key
        ].toString(); // solo un producto tiene incidencias
        const newProduct = Object.assign({}, productoEncontrado[0]); // solo funciona con ES6
        this.productsAdded.push(newProduct); // se agrega el producto encontrado a la variable productsAdded
      });
    }
  },
  props: {},
  created() {
    // Se ejecuta apenas se crea el componente
    bus.$on("agregarCarrito", agregarIdProducto => {
      this.productsAddedVariantId.push(agregarIdProducto);
      this.cantidadPorReferencia[agregarIdProducto] = this
        .cantidadPorReferencia[agregarIdProducto]
        ? this.cantidadPorReferencia[agregarIdProducto] + 1
        : 1;
      this.actualizarCarro();
    });
  },
  computed: {
  }
};
</script>

<style scoped>
.dropdown-menu {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.carrito-producto-envoltura {
  min-width: 250px;
}
</style>