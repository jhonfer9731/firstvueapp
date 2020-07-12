<template>
  <div class="container my-5 container-about ">
    <div class="">
      <div class="card-title mb-3">
        <h1>Esta es la pagina donde se informa sobre la empresa</h1>
      </div>
      <div class="card-body">
        <div class="row h-100 justify-content-center align-items-center" >
          <div class="col-lg-8 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales et nisi non condimentum. Ut feugiat sapien massa, non sodales diam ullamcorper eu. Ut eget maximus nunc, et dictum dui. Quisque mollis massa scelerisque pharetra faucibus. Morbi ac turpis quam. Quisque sit amet blandit felis. Aliquam eu pellentesque mi. Ut vitae metus varius, vehicula ligula id, pretium erat. Integer rutrum varius turpis, a sodales mauris fermentum id. Phasellus rutrum orci vel lorem porttitor, nec maximus orci sodales. Nam fringilla lorem eu justo aliquet tristique. Fusce id neque lobortis, sollicitudin urna in, eleifend lacus.
            Suspendisse venenatis fringilla ligula in hendrerit. Aenean dapibus enim non rhoncus lobortis. Phasellus varius eu odio at congue. Phasellus nibh ipsum, molestie a vestibulum vitae, dapibus in nibh. Mauris dictum consequat erat quis pretium. Suspendisse potenti. Etiam aliquam, orci aliquam tristique ornare, nunc enim luctus eros, id tempus urna lacus in orci. Quisque bibendum dui egestas lacus commodo, at iaculis eros volutpat. Proin et ullamcorper nulla. Phasellus nec sapien vehicula, pretium nisi at, consectetur ligula.
            Cras facilisis auctor neque, ut egestas purus viverra eget. Etiam tempor euismod mauris sed volutpat. Nullam sit amet cursus est, in gravida dolor. Duis a turpis a mi convallis maximus. Phasellus aliquam.
          </div>
          <div class="col-lg-4">
            <img :src="require('@/assets/images/svg/pizarra_img.svg')" alt class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import {mapGetters} from 'vuex';
export default {
  name: 'About',
  data(){
    return{
    }
  },
  methods: {
  },
  computed: {
    activadorOpacidadVuex(){
      return this.$store.state.encenderOpacidad;
    }
  },
  mounted(){
    this.$store.dispatch('cambiarOpacidad')
  }
}
</script>


<style scoped>

</style>
