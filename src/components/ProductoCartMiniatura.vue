<template>
  <div class="cart-product-min py-2 my-3 position-relative">
    <a href="#" class="eliminar-producto" @click="eliminarProductoCarrito">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </a>
    <div class="d-flex align-items-center">
      <router-link :to="{path:'/'}">
        <img
          class
          :alt="dataInfoProducto.nombre"
          :src="require(`@/assets/images/${dataInfoProducto.variante.variantImage}`)"
          width="100px"
          height="100px"
        />
      </router-link>
      <div class="w-100">
        <div class="pl-3">
          <p class="d-block producto-nombre">{{dataInfoProducto.nombre}}</p>
          <small class="d-block">Marca: {{dataInfoProducto.marca}}</small>
          <small class="d-block">
            Cantidad: 
            <!-- Cantidad: {{dataInfoProducto.cantidadProducto}} -->
            <div class="form-group row m-0">
              <div class="col-sm-5 d-flex p-0">
                <span class="input-group-btn ml-auto rounded-left">
                  <button class="btn btn-success btn-sm" @click="cambiarCantidadProducto('-')">-</button>
                </span>
              </div>
              <div class="col-sm-2 p-0 border-top border-bottom text-center">
                <label class="m-0">{{dataInfoProducto.cantidadProducto}}</label>
              </div>
              <div class="col-sm-5 d-flex p-0">
                <span class="input-group-btn mr-auto rounded-right">
                  <button class="btn btn-success btn-sm" @click="cambiarCantidadProducto('+')">+</button>
                </span>
              </div>
            </div>
          </small>
          <small>Precio unidad:</small>

          <small
            class="d-block font-weight-bold"
          >{{dataInfoProducto.precio | currency('$',0,{ thousandsSeparator: '.' })}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductoCartMiniatura",
  props: {
    infoProducto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataInfoProducto: this.infoProducto,
      cantidadProducto: this.infoProducto.cantidadProducto
    };
  },
  watch: {
    infoProducto: function(newData) {
      console.log(newData);
      this.dataInfoProducto = this.infoProducto;
      //this.cantidadProducto = this.infoProducto.cantidadProducto;
    }
  },
  methods: {
    eliminarProductoCarrito() {
      //console.log("Variante", this.dataInfoProducto.variante.variantId)
      this.$store.commit("eliminarDeCarrito", {
        productoId: this.dataInfoProducto.productoId,
        varianteId: this.dataInfoProducto.variante.variantId
      });
    },
    cambiarCantidadProducto(simbolo) {
      this.cantidadProducto = this.infoProducto.cantidadProducto;
      if (this.cantidadProducto) {
        if (simbolo === "+") {
          this.cantidadProducto++;
        } else {
          if (this.cantidadProducto) {
            if (this.cantidadProducto > 1) {
              this.cantidadProducto--;
            } else if (this.cantidadProducto <= 1) {
              this.eliminarProductoCarrito();
            }
          }
        }
      }
      if (this.cantidadProducto) {
        console.log(simbolo);
        this.$store.commit("cambiarCantidadProductos", {
          productoId: this.dataInfoProducto.productoId,
          varianteId: this.dataInfoProducto.variante.variantId,
          cantidadActual: this.cantidadProducto
        });
      }
    }
  }
};
</script>

<style scoped>
.cart-product-min {
  border-bottom: 1px solid #e9ecef;
}

.producto-nombre {
  font-weight: bold;
}

i {
  color: #3c4753;
}
.eliminar-producto {
  position: absolute;
  right: -10px;
  top: 0px;
}
.cantidad-input-text {
  font-size: 0.7rem;
  font-weight: bold;
}
</style>