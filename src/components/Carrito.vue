<template>
  <div class="nav-item dropdown" id="carrito">
    <button
      class="carrito_btn btn btn-success dropdown-toggle bg-dark"
      id="dropDownMenuLink"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      :class="{'enfasis-carrito': enfasisCarritoBtn}"
    >
      Carrito
      <span class="badge badge-light">{{numeroItems}}</span>
    </button>
    <form
      class="dropdown-menu dropdown-menu-right p-4"
      @submit.prevent
      id="dd-menu"
      aria-labelledby="dropDownMenuLink"
      v-show="numeroItems"
    >
      <div class="carrito-producto-envoltura">
        <ProductoCartMiniatura
          v-for="(productAdded,index) in cartProducts"
          :key="index"
          :infoProducto="productAdded"
        />
      </div>
      <!--
      <a class="dropdown-item" href="#">Something else here</a>
      <a class="dropdown-item" href="#">{{cantidadPorRef}}</a>-->

      <div class="font-weight-bold p-2 py-2 saldoTotal d-flex">
        <span class="saldo-izq mr-auto">Saldo Total:</span>
        <span class="saldo-der">{{precioTotal | currency('$',0,{ thousandsSeparator: '.' })}}</span>
      </div>
      <div class="d-flex">
        <button class="btn btn-success ml-auto" @click="pagoCompra">Ir al pago</button>
      </div>
    </form>
  </div>
</template>

<script>
//import { bus } from "@/main.js";
//import store from "@/store.js";
import ProductoCartMiniatura from "@/components/ProductoCartMiniatura.vue";
export default {
  name: "Carrito",
  components: {
    ProductoCartMiniatura
  },
  data() {
    return {
      //productsAddedVariantId: [],
      //cantidadPorReferencia: {}
      //enfasisCarritoClase : false,
      //productsAdded: [],
      // productsAdded2: [], // este dato es provicional
    };
  },
  methods: {
    pagoCompra() {
      this.$router.push({ name: "confirmacionCompra" });
    }
    /*
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
    },*/
  },
  props: {},
  created() {
    // Se ejecuta apenas se crea el componente
    //bus.$on("agregarCarrito", agregarIdProducto => {
    //this.productsAddedVariantId.push(agregarIdProducto);
    //this.cantidadPorReferencia[agregarIdProducto] = this
    // .cantidadPorReferencia[agregarIdProducto]
    // ? this.cantidadPorReferencia[agregarIdProducto] + 1
    // : 1;
    //this.actualizarCarro();
    //this.actualizarCarro2();
    //});
  },
  computed: {
    cartProducts() {
      return this.$store.state.cartProducts;
    },
    precioTotal() {
      return this.$store.state.cartSaldoTotal;
    },
    numeroItems() {
      return this.$store.state.count;
    },
    enfasisCarritoBtn() {
      return this.$store.state.agregoProductoBandera;
    }
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
.saldoTotal {
  color: #201e1e;
}
#dd-menu {
  opacity: 0;
  -webkit-transition: all 0.5s linear 0s;
  transition: all 0.5s linear 0s;
}
#dd-menu.show {
  opacity: 0.95;
}
.enfasis-carrito {
  background-color: #b3f09d !important;
  color: #1e1e1e;
  transition: all 0.2s ease-out 0s;
}
@keyframes cambioOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>