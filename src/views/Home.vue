<template>
  <div class="home">
    <div class="home-header">
      <div class="header-text">
        <h1 :class="{'header-text-title': true}">Nuestras Promociones</h1>
      </div>
      <div class="slideshow header-slide">
        <div class="full-slideshow-image">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <!--<ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active bg-light"
              ></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1" class="bg-light"></li>
            </ol>-->
            <promocionSlide :class=" {'' : true}" />
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PromocionSlide from "@/components/PromocionSlide";
export default {
  name: "Home",
  components: {
    PromocionSlide
  },
  data() {
    return {
      promociones: ["Nuestras Promociones"]
    };
  }
};
</script>

<style scoped>
.slideshow {
  max-height: 600px;
  max-width: 100%;
  border: 1px green solid;
  margin: 0px auto;
}
.home-header {
  position: relative;
  width: 100%;
  height: 100%;
}

.header-text,
.header-slide {
  position: absolute;
  top: 0;
  left: 0;
}
.header-text {
  z-index: 1;
  width: 100%;
  background: #00000052;
  background: linear-gradient(
    180deg,
    #343a40 0%,
    #07074250 70%,
    #11111100 90%
  );
}


.header-text-title {
  color: #f6f6fb;
  font-size: 4rem;
  padding: 10% 0px;
  padding-bottom: 20%;
}
.header-slide {
  z-index: 0;
}

#carouselExampleIndicators{
  z-index: 2;
}
</style>
