<template>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100 bg-image" :src="require(`@/assets/images/slideshow-tenis.jpg`)" alt="First Slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 bg-image" :src="require(`@/assets/images/slideshow-camiseta.jpg`)" alt="Second slide">         
          </div>
        </div>
        
    <!-- <div class="d-flex flex-column bd-highlight mb-3">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div> -->
  
</template>

<script>
export default {
  name: "PromocionSlide"
};
</script>

<style scoped>

/*
.carousel{

}

.carousel-item, .carousel-inner{
  height: 100% !important;
}*/
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
