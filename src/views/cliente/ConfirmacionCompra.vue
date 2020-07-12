<template>
  <div class="container my-5 pt-5">
    <div class="row text-left">
      <div class="col-md-9">
        <h4 class="py-4">Confirmación de compra</h4>
        <ul class="list-unstyled">
          <li v-for="(item,index) in itemsCarrito" :key="index" class="media">
            <a href="#" class="eliminar-producto" @click="eliminarProductoCarrito(index)">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </a>
            <div class="ancho-imagen">
              <img
                :src="require(`@/assets/images/${item.variante.variantImage}`)"
                alt="No hay imagen"
                class="align-self-center mr-3"
              />
            </div>
            <div class="media-body">
              <h5 class="mt-0">{{item.nombre}}</h5>
              <p class="mt-0">{{item.precio | currency('$',0,{ thousandsSeparator: '.' })}}</p>Cantidad:
              <div class="form-group">
                <div class="row m-0 d-flex flex-row justify-content-start">
                  <div class="p-0">
                    <span class="input-group-btn ml-auto rounded-left">
                      <button
                        class="btn btn-success btn-sm"
                        @click="cambiarCantidadProducto('-',index)"
                      >-</button>
                    </span>
                  </div>
                  <div class="p-0 px-2 border-top border-bottom text-center">
                    <label class="m-0">{{item.cantidadProducto}}</label>
                  </div>
                  <div class="p-0">
                    <span class="input-group-btn mr-auto rounded-right">
                      <button
                        class="btn btn-success btn-sm"
                        @click="cambiarCantidadProducto('+',index)"
                      >+</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <h4 class>Precio total</h4>
        <p class="text-center precio-total">{{precioTotal | currency('$',0,{ thousandsSeparator: '.' })}}</p>
      </div>
    </div>
    <div class="card">
      <div class="card-img-top"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmacionCompra",
  data() {
    return {
      itemsCarrito: this.$store.state.cartProducts
    };
  },
  methods: {
    eliminarProductoCarrito(index) {
      //console.log("Variante", this.dataInfoProducto.variante.variantId)
      console.log(this.itemsCarrito[index]);
      this.$store.commit("eliminarDeCarrito", {
        productoId: this.itemsCarrito[index].productoId,
        varianteId: this.itemsCarrito[index].variante.variantId
      });
      this.itemsCarrito = this.$store.state.cartProducts;
    },
    cambiarCantidadProducto(simbolo, index) {
      //this.itemsCarrito[index].cantidadProducto = this.infoProducto.itemsCarrito[index].cantidadProducto;
      if (this.itemsCarrito[index].cantidadProducto) {
        if (simbolo === "+") {
          this.itemsCarrito[index].cantidadProducto++;
        } else {
          if (this.itemsCarrito[index].cantidadProducto > 1) {
            this.itemsCarrito[index].cantidadProducto--;
          } else if (this.itemsCarrito[index].cantidadProducto <= 1) {
            this.eliminarProductoCarrito(index);
          }
        }
        this.$store.commit("cambiarCantidadProductos", {
          productoId: this.itemsCarrito[index].productoId,
          varianteId: this.itemsCarrito[index].variante.variantId,
          cantidadActual: this.itemsCarrito[index].cantidadProducto,
        });
      }
    }
  },
  computed:{
    precioTotal() {
      return this.$store.state.cartSaldoTotal;
    },
  }
};
</script>

<style scoped>
.media img {
  max-height: 200px;
}

.ancho-imagen {
  min-width: 30%;
}
.eliminar-producto {
  position: absolute;
  right: 0px;
  top: 0px;
}
.media {
  position: relative;
}
i {
  color: #3c4753;
}
.precio-total{
  font-weight: bold;
  font-size: 1.5rem;
}
</style>