<template>
  <div class="container-lg">
    <h3>Inventario</h3>
    <div class="product-test">
      <h3 class="d-inline-block float-left">Lista de productos</h3>
      <button class="btn btn-primary float-right" @click="addNew">Agregar Producto</button>
    </div>
    <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Imagen</th>
          <th scope="col">Modificar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(productoLoop,index) in productos" :key="index" >
          <td scope="row">
            <p class="col-lg">
              {{index+1}}
            </p>
            </td>
          <td scope="row">
            <p class="edit-off col-lg" v-show="!productoLoop.editOn">{{productoLoop.data().nombre}}</p>
            <div class="edit-on col-lg" v-show="productoLoop.editOn">
              <input type="text" class="form-control" v-model="producto.nombre" />
            </div>
          </td>
          <td scope="row">
            <p class="edit-off col-lg" v-show="!productoLoop.editOn">{{productoLoop.data().precio}}</p>
            <div class="edit-on col-lg" v-show="productoLoop.editOn">
              <input type="text" class="form-control" v-model="producto.precio" />
            </div>
          </td>
          <td scope="row">
            <div class="col-lg">
              <div class="">
                <img
                  :src="productoLoop.data().image"
                  :alt="eone = 'no existe imagen'"
                  class=" producto-imagen"
                />
              </div>
            </div>
          </td>
          <td scope="row">
            <div class="col-lg">
              <button
                @click="editarProducto(index)"
                class="btn mx-2"
                :class="{'btn-primary': !productoLoop.editOn}"
                v-show="!productoLoop.editOn"
                :disabled="isDisabled(index)"
              >Editar</button>
              <button
                @click="updateData(index)"
                class="btn mx-2"
                :class="{'btn-warning': productoLoop.editOn}"
                v-show="productoLoop.editOn"
              >Guardar</button>
              <button @click="borrarProducto(productoLoop.id)" class="btn btn-danger">Borrar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="NuevoProducto"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Agregar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fuid">
              <div class="row">
                <div class="col-lg-8">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Nombre del producto"
                      v-model="producto.nombre"
                    />
                  </div>
                  <div class="form-group">
                    <VueEditor v-model="producto.descripcion" />
                  </div>
                </div>

                <div class="col-lg-4">
                  <h4 class="display-6">Detalles del produto</h4>
                  <hr />
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Precio"
                      v-model="producto.precio"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Tags"
                      v-model="tag"
                      @keyup.188="addTag"
                    />
                    <div class="show-tags" v-if="producto.tags.length">
                      <li
                        v-for="(tagProducto,index) in producto.tags"
                        :key="index"
                        class="d-inline-block m-2 border px-1"
                      >
                        {{tagProducto}}
                        <a href="#" @click="removeTag(index)">
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </li>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="product_image">Imagenes Producto</label>
                    <input type="file" @change="cargarImagen" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="agregarProducto">Agregar Producto</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "@/firebase.js";
import { VueEditor } from "vue2-editor";
export default {
  name: "ProductosAdmin",
  components: {
    VueEditor
  },
  data() {
    return {
      productos: [],
      producto: {
        nombre: null,
        precio: null,
        descripcion: null,
        tags: [],
        image: null
      },
      //products: [],
      //editOn: false,
      activeItemIndex: null,
      activeItemId: null,
      tag: ""
    };
  },
  methods: {
    cargarImagen(e) {
      let file = e.target.files[0];
      var storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file); // para poder ultizar los metodos de task
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          //successfull part, it runs when the load is completed
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.producto.image = downloadURL;
          });
        }
      );
      //console.log(e.target.files[0])
    },
    addNew() {
      window.$("#NuevoProducto").modal("show");
    },
    agregarProducto() {
      /*db.collection("products")
        .add(this.producto)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.producto.nombre = "";
          this.producto.precio = "";
          //this.readData();
          this.cleanData();
          window.$("#NuevoProducto").modal("hide");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });*/
      this.$firestore.products.add(this.producto);
      window.$("#NuevoProducto").modal("hide");
    },
    cleanData() {
      //Object.assign(this.$data, this.$options.data.apply(this));
    },
    readData() {
      this.productos = [];
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            doc.editOn = false;
            this.productos.push(doc);
          });
        });
    },
    borrarProducto(productoId) {
      window.Swal.fire({
        // permite mostrar modals de forma animada para alertar al usuario
        title: "Estas seguro?",
        text: "El item no podra ser recuperado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then(result => {
        if (result.value) {
          db.collection("products")
            .doc(productoId)
            .delete()
            .then(function() {
              window.Toast.fire({
                icon: "success",
                title: "El item ha sido eliminado."
              });
              //window.Swal.fire("Eliminado!", "El item ha sido eliminado.", "success");
            })
            .catch(function(error) {
              window.Swal.fire("Error!", error, "error");
            });
        }
      });
    },
    editarProducto(index) {
      this.productos[index].editOn = true;
      this.activeItemIndex = index;
      this.producto = this.productos[index].data();
      this.activeItemId = this.productos[index].id;
    },
    updateData(index) {
      // pasa los elementos por referencia por eso this.producto se actualiza
      this.productos[index].editOn = false;
      db.collection("products")
        .doc(this.activeItemId)
        .update(this.producto)
        .then(function() {
          console.log("Documento Actualizado correctamente!");
          window.Toast.fire({
            icon: "success",
            title: "Producto Actualizado correctamente",
            timer: 1000
          });
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error actualizando documento: ", error);
        });
    },
    isDisabled(index) {
      if (this.productos[this.activeItemIndex]) {
        return (
          index !== this.activeItemIndex &&
          this.productos[this.activeItemIndex].editOn === true
        );
      } else {
        return false;
      }
    },
    addTag() {
      this.producto.tags.push(this.tag.substring(0, this.tag.length - 1));
      this.tag = "";
    },
    removeTag(index) {
      this.producto.tags.splice(index, 1);
    }
  },
  created() {
    this.readData();
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      db.collection("products").onSnapshot(querySnapshot => {
        console.log("Cambio base de datos");
        this.productos = [];
        querySnapshot.forEach(doc => {
          doc.editOn = false;
          this.productos.push(doc);
        });
      });
    });
  },
  firestore() {
    // este usa una libreria especial para trabajar con firestore desde vue, esto no aparece como data
    return {
      products: db.collection("products")
    };
  }
};
</script>

<style scoped>
.producto-imagen {
  /*width: 80%;*/
  min-width: 150px;
  max-height:200px;
}
</style>