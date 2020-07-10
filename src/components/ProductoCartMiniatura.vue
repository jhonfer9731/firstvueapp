<template>
  <div class="cart-product-min py-2 position-relative">
    <a href="#" class="eliminar-producto">
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
          <small class="d-block">Cantidad: {{dataInfoProducto.cantidadProducto}}</small>
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
      dataInfoProducto: this.infoProducto
    };
  },
  watch: {
    infoProducto: function(newData) {
      console.log(newData);
      this.infoDataProducto = this.infoProducto;
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
.eliminar-producto{
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>