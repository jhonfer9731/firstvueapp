<template>
  <div class="container h-100">
    <div class="intro h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <h3>Configuración de perfil</h3>
          <p>Cambia todas tus configuraciones de perfil aqui</p>
        </div>
        <div class="col-md-6">
          <img :src="require('@/assets/images/svg/profile.svg')" alt class="img-fluid" />
        </div>
      </div>
    </div>
    <form class="form" @submit.prevent>
      <div class="row">
        <div class="form-group col d-flex">
          <button
            class="perfil btn btn-outline-primary"
            :class="{'active':profileState}"
            @click="profileState = true"
          >Perfil</button>
          <button
            class="perfil btn btn-outline-primary mx-2"
            :class="{'active': !profileState}"
            @click="profileState = false"
          >Configuracion de Cuenta</button>
        </div>
      </div>
      <div v-if="profileState">
        <div class="row">
          <div class="form-group col-lg-6">
            <input
              type="text"
              class="form-control"
              v-model="perfil.name"
              placeholder="Nombre Completo"
            />
          </div>
          <div class="form-group col-lg-6">
            <input
              type="text"
              class="form-control"
              v-model="perfil.telefono"
              placeholder="Telefono"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg">
            <input
              type="text"
              class="form-control"
              v-model="perfil.direccion"
              placeholder="Direccion"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-9">
            <input
              type="text"
              class="form-control"
              v-model="perfil.codigoPostal"
              placeholder="Codigo Postal"
            />
          </div>
          <div class="form-group col-lg-3">
            <button type="submit" class="btn btn-primary" @click="actualizarPerfil">Guardar Cambios</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="form-group col-lg-6">
            <input
              type="text"
              class="form-control"
              v-model="cuenta.name"
              placeholder="Nombre de Usuario"
            />
          </div>
          <div class="form-group col-lg-6">
            <input
              type="email"
              class="form-control"
              v-model="cuenta.email"
              placeholder="Correo Electronico"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-6">
            <input
              type="password"
              class="form-control"
              v-model="cuenta.password"
              placeholder="Nueva Contraseña"
            />
          </div>
          <div class="form-group col-lg-6">
            <input
              type="password"
              class="form-control"
              v-model="cuenta.confirmPaswword"
              placeholder="Confirmar Contraseña"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-4">
            <input type="file" class="form-control" />
          </div>
          <div class="form-group col-lg-4">
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
          <div class="form-group col-lg-4">
            <button type="button" @click="resetPassword" class="btn btn-success">Restaurar contraseña por Email</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { db, fb } from "@/firebase.js";
export default {
  name: "PerfilUser",
  data() {
    return {
      profileState: true,
      perfil: {
        name: null,
        telefono: null,
        direccion: null,
        codigoPostal: null
      },
      cuenta: {
        name: null,
        email: null,
        photoURL: null,
        emailVerified: null,
        password: null,
        confirmPaswword: null,
        uid: null
      }
    };
  },
  methods: {
    
    resetPassword(){
      const auth = fb.auth();
      auth.sendPasswordResetEmail(auth.currentUser.email).then(()=>{
        window.Toast.fire({
            icon: "success",
            title: "Correo Enviado, por favor revisa tu correo Electronico",
            timer: 2000
          });
      }).catch(err=> console.log(err))
    },
    actualizarPerfil() {
      db.collection("profiles")
        .doc(this.cuenta.uid)
        .update(this.perfil)
        .then(function() {
          window.Toast.fire({
            icon: "success",
            title: "Perfil Actualizado correctamente",
            timer: 1000
          });
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error actualizado perfil: ", error);
          window.Toast.fire({
            icon: "error",
            title: "Error Actualizando Perfil: "+error,
            timer: 4000
          });
        });
    }
  },
  created() {
    const user = fb.auth().currentUser;
    this.cuenta.uid = user.uid;
    db.collection("profiles")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.perfil = doc.data();
        } else {
          console.log("No existe el perfil");
        }
      })
      .catch(err => console.log(err));
    console.log(this.perfil);
  }
};
</script>

<style scoped>
.pizarra {
  margin-top: 30px;
}
</style>