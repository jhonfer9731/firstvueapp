<template>
  <div class="login">
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h3 class="marca-empresa mb-2 text-light">JFApp</h3>
            <link rel="icon" href="favicon.ico" />
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-light">&times;</span>
            </button>
          </div>
          <div class="modal-body" :class="{'ingreso-footer': isSignUpForm}" v-if="isSignUpForm">
            <h5 class="modal-title mb-4" id="exampleModalLongTitle">Iniciar Sesión</h5>
            <form action="#" @submit.prevent="ingresoUsuario">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="email@example.com" />
              </div>
              <div class="form-group mb-4">
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Ingrese contraseña"
                />
              </div>
              <input
                type="submit"
                class="btn btn-lg btn-block login-boton mb-2"
                value="Ingresa"
                id="login"
              />
            </form>
            <a href="#" class="olvido-password-link">Olvido su contraseña?</a>
          </div>
          <!-- ------------ Formulario de registro ----------- -->

          <div class="modal-body" :class="{'registro-footer': !isSignUpForm}" v-else>
            <h5 class="modal-title mb-4" id="exampleModalLongTitle">Registro</h5>
            <form action="#" @submit.prevent="registroUsuario">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  v-model="nombre"
                  class="form-control"
                  placeholder="Ingrese su nombre"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  placeholder="email@example.com"
                />
              </div>
              <div class="section-passwords">
                <div class="form-group mb-4">
                  <label for="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Ingrese contraseña"
                    v-model="password"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="password2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="password2"
                    class="form-control"
                    placeholder="Ingrese contraseña"
                    v-model="password2"
                  />
                </div>
                <!-- Validacion de contraseña -->

                <label v-show="notMatch" class="registro-alertNotMatch">{{alertNotMatch}}</label>
              </div>
              <input
                type="submit"
                class="btn btn-lg btn-block login-boton mb-2"
                value="Registrarse"
                id="login"
              />
            </form>
            <a href="#" class="olvido-password-link">Olvido su contraseña?</a>
          </div>
          <div class="modal-footer ingreso-footer" v-if="isSignUpForm">
            <p class="login-footer-text">
              Aun no tiene una cuenta?
              <a href="#" @click="isSignUpForm=false">Ingrese aqui</a>
            </p>

            <!--
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>-->
          </div>
          <div class="modal-footer registro-footer" v-else>
            <p class="login-footer-text">
              Ya tiene una cuenta?
              <a href="#" @click="isSignUpForm=true">Ingrese aqui</a>
            </p>

            <!--
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fb} from '@/firebase.js'; // import only in this component
export default {
  name: "Login",
  data() {
    return {
      isSignUpForm: false,
      nombre: null,
      email: null,
      password: null,
      password2: null
    };
  },
  methods: {
    registroUsuario() {
      console.log("entro a registro de usuario")
      if (this.notMatch) {
        return false;
      } else {
        fb
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) =>{
            console.log(user)
            window.$('#login').modal('hide')
            this.$router.replace({name: 'Admin'})
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              alert("The password is too weak. "+errorMessage);
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
        return false;
      }
    },
    ingresoUsuario() {}
  },
  computed: {
    notMatch() {
      return this.password !== this.password2;
    },
    alertNotMatch() {
      if (!this.password) {
        return "* Falta ingresar campo: Contraseña";
      } else if (!this.password2) {
        return "* Falta ingresar la contraseña nuevamente";
      } else {
        return "* Contraseñas no coinciden";
      }
    }
  }
};
</script>



<style lang="scss">
@keyframes opacity-formulario {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-header {
}

.ingreso-footer {
  animation-name: opacity-formulario;
  animation-duration: 800ms;
}

.registro-footer {
}

.modal-body .form-control {
  border: none !important;
  border-bottom: 1px solid #e7e7e7 !important;
}

.modal-body .section-passwords {
  border-top: 1px solid #50af65;
  margin-top: 20px;
  padding-top: 20px;
  text-align: left;
}

.form-group {
  text-align: left;
  font-size: 1.1rem;
}

.modal-title {
  font-weight: bold;
  font-size: 1.7rem;
}

.marca-empresa {
  font-weight: bold;
}
.login-boton {
  background-color: #24b13b;
  color: #fff;
  font-weight: bold;
}

.login-boton:hover {
  background-color: #fff;
  color: #24b13b;
  border: 1px solid #24b13b;
}

.registro-alertNotMatch {
  color: #24b13b;
  animation-name: opacity-formulario;
  animation-duration: 800ms;
  margin: 10px 0px;
  font-size: 1rem;
}
</style>