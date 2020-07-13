<template>
  <div class="product card mb-3 container" v-if="productoConId">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="image[0]" alt="No hay Imagen" class="img-producto card-img m-3" />
      </div>
      <div class="col-md-8">
        <div class="card m-3">
          <h1 class="card-header">Producto</h1>
          <div class="product_info">
            <div class="card-body">
              <h1 class="card-title">{{productoConId.nombre}}</h1>
              <p v-if="inStock" class="card-text">En Stock</p>
              <p v-else class="card-text">Fuera de Stock</p>
              <!-- <p class="card-text">Envio: {{shipping}} </p> -->
              <ul>
                <li class="details text-left" v-html="productoConId.detalles"></li>
              </ul>
              <div class="card-text mb-4">
                <div
                  class="color-box shadow p-3 mb-1 rounded"
                  v-for="(variant,index) in productoConId.variante"
                  :key="variant.variantId"
                  :style="{ backgroundColor: variant.variantColor }"
                  @mouseover="updateProduct(index)"
                ></div>
              </div>
              <button
                :disabled="!inStock"
                :class="{disabledButton : !inStock, btn : true, 'btn btn-success' : true }"
                @click="agregarCarrito"
              >Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <TabsProducto :comentarios="reviews" @comentario="addReview"/>  -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Detalles",
  props: ["id"],
  data() {
    return {
      selectedVariant: 0
    };
  },
  methods: {
    ...mapActions(["obtenerProductoConId"]),
    updateProduct(index) {
      console.log("Entro aqui");
      this.selectedVariant = index; // al cambiar un dato del componente se ejecutan todas las funciones computed
    },
    agregarCarrito() {
      const producto = JSON.parse(JSON.stringify(this.$store.state.stockProductos.productoConId))
      producto.selectedVariant = this.selectedVariant;
      this.$store.commit("addToCart", producto); // primero el nombre de la mutation y luego el parametro
      window.Toast.fire({
        icon: "success",
        title: "Producto Agregado al carrito de compras",
        timer: 2000,
        position: "bottom-end"
      });
      this.$store.commit("enfatizarCarritoBoton", true);
      setTimeout(() => {
        this.$store.commit("enfatizarCarritoBoton", false);
      }, 500);
    }
  },
  computed: {
    ...mapGetters(["productoConId"]),
    image() {
      return this.productoConId.variante[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.productoConId.variante[this.selectedVariant]
        .variantQuantity;
    }
  },
  mounted() {
    this.obtenerProductoConId(this.id);
  }
};
</script>

<style scoped>
.color-box {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px 5px;
}
.img-producto {
  max-height: 600px;
}
.details {
  display: block;
  margin: 0 10px;
  text-decoration: dotted;
}
.clear {
  clear: both;
}

body {
  background-color: #291a1ac7;
}

.card-header {
  background-color: #4cac4998;
}
</style>