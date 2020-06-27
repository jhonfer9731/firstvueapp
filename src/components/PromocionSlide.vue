<template>
        <div class="slideshow">
      <div class="">
        <div
          id="carouselExampleIndicators"
          class="carousel slide home-header-slideshow"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active bg-light"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1" class="bg-light"></li>
          </ol>
          <div class>
            <div class="header-carousel-text">
              <h1 :class="{'carousel-text-title': true}" v-html="promocionesSlide[0]">{{promocionesSlide[0]}}</h1>
              <router-link :to="{name: 'Productos'}" class="btn btn-success btn-lg">Detalle</router-link>
            </div>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100 bg-image" :src="require(`@/assets/images/slideshow-tenis.jpg`)" alt="First Slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 bg-image" :src="require(`@/assets/images/slideshow-camiseta.jpg`)" alt="Second slide">         
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>  
</template>

<script>
export default {
  name: "PromocionSlide",
  props:{
    promocionesSlide:{
      object: String,
      required: false
    }
  }
};
</script>

<style scoped>

.slideshow {
  max-height: 960px;
  margin: 0px auto;
}
.home-header-slideshow {
  position: relative;
  width: 100%;
  height: 100%;
}
.header-carousel-text {
  
  position: absolute;
  z-index: 1;
  width: 100%;
  background: #00000052;
  background: linear-gradient(180deg, #343a40 0%, #07074234 50%, #11111100 90%,#1111115b 100%);
  height: 100%;
  /*padding: 3% 0px;
  padding-bottom: 26.9%;*/
}
.carousel-text-title {

  color: #f6f6fb;
  font-size: 4.4rem;
  font-weight: bold;
  padding-top: 8%;
  transition: ease-out 300ms;

}

.carousel-text-title:hover{
  transform: scale(1.1)translateY(-2px);
  transition: ease-in 300ms;
}
.carousel-item{
  height: 800px;
}
.bg-image{
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
}


</style>
