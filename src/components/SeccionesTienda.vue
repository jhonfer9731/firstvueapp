<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <img :src="require(`@/assets/images/${secciones[0].imagen}`)" class="seccion-bg-image" />
            <h4 class="seccion-titulo">
              {{secciones[0].nombre}}
              <router-link :to="{name : secciones[0].route}">
                <button
                  class="btn btn-success d-block mx-auto my-3 bg-light text-dark border-0"
                >Ingresa</button>
              </router-link>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <img :src="require(`@/assets/images/${secciones[1].imagen}`)" class="seccion-bg-image" />
            <h4 class="seccion-titulo">
              {{secciones[1].nombre}}
              <router-link :to="{name : secciones[1].route}">
                <button
                  class="btn btn-success d-block mx-auto my-3 bg-light text-dark border-0"
                >Ingresa</button>
              </router-link>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <img :src="require(`@/assets/images/${secciones[2].imagen}`)" class="seccion-bg-image" />
            <h4 class="seccion-titulo">
              {{secciones[2].nombre}}
              <router-link :to="{name : secciones[2].route}">
                <button
                  class="btn btn-success d-block mx-auto my-3 bg-light text-dark border-0"
                >Ingresa</button>
              </router-link>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <img :src="require(`@/assets/images/${secciones[3].imagen}`)" class="seccion-bg-image" />
            <h4 class="seccion-titulo">
              {{secciones[3].nombre}}
              <router-link :to="{name : secciones[3].route}">
                <button
                  class="btn btn-success d-block mx-auto my-3 bg-light text-dark border-0"
                >Ingresa</button>
              </router-link>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <img :src="require(`@/assets/images/${secciones[4].imagen}`)" class="seccion-bg-image" />
            <h4 class="seccion-titulo">
              {{secciones[4].nombre}}
              <router-link :to="{name : secciones[2].route}">
                <button
                  class="btn btn-success d-block mx-auto my-3 bg-light text-dark border-0"
                >Ingresa</button>
              </router-link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeccionesTienda",
  data() {
    return {
      secciones: [
        {
          nombre: "Niños",
          imagen: "home-kidsSection.jpg",
          route: "Productos"
        },
        {
          nombre: "Mujeres",
          imagen: "home-womanSection.jpg",
          route: "Productos"
        },
        {
          nombre: "Hombres",
          imagen: "home-menSection.jpg",
          route: "Productos"
        },
        {
          nombre: "Varios",
          imagen: "home-variosSection.jpg",
          route: "Productos"
        },
        {
          nombre: "Hogar",
          imagen: "home-hogarSection.jpg",
          route: "Productos"
        }
      ]
    };
  }
};
</script>

<style scoped>
.seccion-bg-image {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 95%;
}

.card {
  font-size: 2rem;
  border: 0px;
  padding-top: 10px;
}

.card-body {
  height: 600px;
  padding: 0px;
  transition: ease 200ms;
}

.card-body:hover {
  /*transform: scale(1.02);*/
  transition: ease 500ms;
}

.card-title {
  padding: 20px 0px;
  margin: 0px;
  font-size: 2.4rem;
}

.seccion-titulo {
  position: absolute;
  z-index: 1;
  vertical-align: middle;
  top: 0;
  width: 100%;
  padding: 25% 0%;
  font-size: 3.5rem;
  color: #fefefe;
  background: #00000052;
  background: linear-gradient(
    180deg,
    #343a4000 0%,
    #09092770 25%,
    #09092770 75%,
    #11111100 100%
  );
}

.card-body .btn {
  /* background-color: #ffffffd2 !important;
    font-weight: bold;*/
  background-color: #ffffff32 !important;
  color: #fefefe !important;
  font-size: 1.5rem;
  transition: ease 300ms;
}

.card-body .btn:hover {
  background-color: #fefefe !important;
  color: #303530 !important;
  transform: translateY(3px);
  transition: ease 300ms;
  font-weight: bold;
}
</style>