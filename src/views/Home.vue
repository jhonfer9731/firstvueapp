<template>
  <div class="home">
    <PromocionSlide :promocionesSlide="promociones" />
    <SeccionesTienda />
    <div class="bloque-servicios">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 columna-servicios">
            <div class="servicio-texto">
              <img :src="require(`@/assets/icons/lkw.png`)" width="80" height="80" class="pb-3"/>
              <h6 class="text-uppercase">Envio gratis y devolucion</h6>
              <p class="text-muted text-sm mb-0 font-weight-light">Envio gratis sobre 60 mil</p>
            </div>
          </div>
          <div class="col-lg-4 columna-servicios">
            <div class="servicio-texto">
              <img :src="require(`@/assets/icons/warranty.png`)" width="80" height="80" class="pb-3"/>
              <h6 class="text-uppercase">Garantia de rembolso</h6>
              <p class="text-muted text-sm mb-0 font-weight-light">Garantia de 30 dias para devolucion</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="servicio-texto">
              <img :src="require(`@/assets/icons/customer-service.png`)" width="80" height="80" class="pb-3"/>
              <h6 class="text-uppercase">Tel: 316-324-3124</h6>
              <p class="text-muted text-sm mb-0 font-weight-light">Soporte Online en su compra</p>
            </div>
          </div>
        </div>
        <div class="boton-dimension">
          <router-link class="btn btn-outline-success btn-block" :to="{name:'Registro'}">Suscribete ahora </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import PromocionSlide from "@/components/PromocionSlide";
import SeccionesTienda from "@/components/SeccionesTienda";
export default {
  name: "Home",
  components: {
    PromocionSlide,
    SeccionesTienda
  },
  data() {
    return {
      promociones: ["Los mas<br/>vendidos"]
    };
  }
};
</script>

<style scoped>
.bloque-servicios {
  padding: 60px 0%;
  background: #e1e0e6;
}
.servicio-texto{
  text-align: center;
  margin-bottom: 20px;
}
.col-lg-4{
  text-align: left;
}
.columna-servicios{
  border-right: 1px solid #1f1d1d;
}
.boton-dimension{
  width: 40%;
  margin: 40px auto;
  margin-top :  50px;
}
</style>
