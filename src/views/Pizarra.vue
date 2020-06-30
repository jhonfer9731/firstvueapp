<template>
  <div class="pizarra">
      <div class="container h-100">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-md-6">
                      <h3>Tu Pizarra</h3>
                      <p> El contenido de toda tu informacion sobre la empresa. </p>
                  </div>
                  <div class="col-md-6">
                      <img :src="require('@/assets/images/svg/pizarra_img.svg')" alt="" class="img-fluid">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Pizarra'
}
</script>

<style>
.pizarra{
    margin-top: 30px;
}

</style>