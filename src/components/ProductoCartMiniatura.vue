<template>
  <div class="cart-product-min py-2">
    <div class="d-flex align-items-center">
      <router-link :to="{path:'/'}">
        <img
          class
          :alt="infoDataProducto.nombre"
          :src="require(`@/assets/images/${infoDataProducto.variante[infoDataProducto.selectedVariant].variantImage}`)"
          width="100px"
          height="100px"
        />
      </router-link>
      <div class="w-100">
        <div class="pl-3">
          <p class="d-block producto-nombre">{{infoDataProducto.nombre}}</p>
          <small class="d-block">Marca: {{infoDataProducto.marca}}</small>
          <small class="d-block">Cantidad: {{infoDataProducto.cantidad}}</small>
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
    },
    cantidadProducto: {
      required:false
    }
  },data(){
    return{
      infoDataProducto : this.infoProducto,
      DatacantidadProducto : this.infoProducto.cantidad
    }
  },
  watch: {
    infoProducto: function(newData){
      this.DatacantidadProducto = newData.cantidad
      this.infoDataProducto = this.infoProducto;      
    },
    cantidadProducto: function(){
      this.DatacantidadProducto = this.cantidadProducto;      
    }

  }
};
</script>

<style scoped>
.cart-product-min {
  border-bottom: 1px solid #e9ecef;
}

.producto-nombre{
  font-weight: bold;
}
</style>