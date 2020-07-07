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
            <th scope="col-lg">#</th>
            <th scope="col-lg">Nombre</th>
            <th scope="col-lg">Descripción</th>
            <th scope="col-lg">Precio</th>
            <th scope="col-lg">Tags</th>
            <th scope="col-lg">Variantes</th>
            <th scope="col-lg">Imagen</th>
            <th scope="col-lg">Modificar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(productoLoop,index) in productos" :key="index">
            <td scope="row">
              <p class="col-lg">{{index+1}}</p>
            </td>
            <td scope="row">
              <p
                class="edit-off col-lg"
                v-show="!productoLoop.editOn"
              >{{productoLoop.data().nombre}}</p>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <input type="text" class="form-control" v-model="producto.nombre" />
              </div>
            </td>
            <td scope="row">
              <!--
              <div :id="'accordion'+index">
                <div class="card">
                  <div class id="headingDescripcion">
                    <h5 class="mb-0">
                      <button
                        class="btn btn-link"
                        data-toggle="collapse"
                        :data-target="'#'+index+'-acordeon'"
                        aria-expanded="true"
                        :aria-controls="index+'-acordeon'"
                      >Ver Detalles</button>
                    </h5>
                  </div>
                  <div
                    :id="index+'-acordeon'"
                    class="collapse show"
                    aria-labelledby="headingDescripcion"
                    :data-parent="'accordion'+index"
                  >
                    <div class="card-body">
                      
                    </div>
                  </div>
                </div>
              </div>
              -->
              <div :id="'accordion-'+index">
                <div class="card">
                  <div class="card-header" :id="'heading'+index">
                    <h5 class="mb-0">
                      <button
                        class="btn btn-link"
                        data-toggle="collapse"
                        :data-target="'#collapse'+index"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >Ver Detalles</button>
                    </h5>
                  </div>

                  <div
                    :id="'collapse'+index"
                    class="collapse"
                    :aria-labelledby="'heading'+index"
                    :data-parent="'#'+'accordion-'+index"
                  >
                    <div class="card-body">
                      <p
                        class="edit-off col-lg"
                        v-show="!productoLoop.editOn"
                        v-html="productoLoop.data().descripcion"
                      ></p>
                      <div class="edit-on col-lg" v-show="productoLoop.editOn">
                        <VueEditor v-model="producto.descripcion" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row">
              <p
                class="edit-off col-lg"
                v-show="!productoLoop.editOn"
              >{{productoLoop.data().precio | currency('$',0)}}</p>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <input type="text" class="form-control" v-model="producto.precio" />
              </div>
            </td>
            <td scope="row">
              <div
                class="show-tags edit-off col-lg"
                v-if="productoLoop.data().tags"
                v-show="!productoLoop.editOn"
              >
                <li
                  v-for="(tagProducto,index) in productoLoop.data().tags"
                  :key="index"
                  class="d-inline-block m-2 border px-1"
                >{{tagProducto}}</li>
              </div>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Tags"
                    v-model="tag"
                    @keyup.188="addTag"
                  />
                  <div class="show-tags" v-if="producto.tags">
                    <!-- se elimino .length -->
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
              </div>
            </td>
            <td scope="row">
              <div
                class="show-tags edit-off col-lg"
                v-if="productoLoop.data().variantes"
                v-show="!productoLoop.editOn"
              >
                <!-- tiene que ser sin el length ya que algunos no tienen el parametro variantes -->
                <li
                  v-for="(varianteProducto,index) in productoLoop.data().variantes"
                  :key="index"
                  class="d-inline-block m-2 border px-1"
                >{{varianteProducto}}</li>
              </div>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Variantes"
                    v-model="variante"
                    @keyup.188="addVariante"
                  />
                  <div class="show-tags" v-if="producto.variantes">
                    <!-- se elimino el .length -->
                    <li
                      v-for="(varianteProducto,index) in producto.variantes"
                      :key="index"
                      class="d-inline-block m-2 border px-1"
                    >
                      {{varianteProducto}}
                      <a href="#" @click="removeVariante(index)">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                      </a>
                    </li>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row">
              <div class="edit-off col-lg" v-show="!productoLoop.editOn">
                <img
                  :src="productoLoop.data().images[0]"
                  :alt="alternative = 'no existe imagen'"
                  class="producto-imagen"
                />
              </div>
              <div class="edit-on col-lg" v-if="producto.images" v-show="productoLoop.editOn">
                <ul class="list-unstyled">
                  <li v-for="(imagen,index) in producto.images" :key="index" class="list-item card">
                    <a href="#" @click="showImgModal(imagen)">Imagen{{index+1}}</a>
                    <a href="#" @click="deleteImage(imagen,index)">
                      <i class="fa fa-times-circle"></i>
                    </a>
                  </li>
                </ul>
                <div class="form-group">
                  <label for="product_image">Agregar Imagen:  </label>
                  <input type="file" @change="cargarImagen" class="form-control" />
                  <div class="progress my-2" v-show="progresoCargaImg < 100 && progresoCargaImg >0">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="'width: '+progresoCargaImg+'%'"
                      :aria-valuenow="progresoCargaImg"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span v-if="progresoCargaImg < 100 && progresoCargaImg > 0">Cargando Imagen...</span>
                    </div>
                  </div>
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
                    <div class="show-tags" v-if="producto.tags">
                      <!-- se elimino el .length -->
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
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Variantes"
                      v-model="variante"
                      @keyup.188="addVariante"
                    />
                    <div class="show-tags" v-if="producto.variantes">
                      <!-- Se elimino el length -->
                      <li
                        v-for="(varianteProducto,index) in producto.variantes"
                        :key="index"
                        class="d-inline-block m-2 border px-1"
                      >
                        {{varianteProducto}}
                        <a href="#" @click="removeVariante(index)">
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </li>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="product_image">Imagenes Producto</label>
                    <input type="file" @change="cargarImagen" class="form-control" />
                    <div
                      class="progress my-2"
                      v-show="progresoCargaImg < 100 && progresoCargaImg >0"
                    >
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="'width: '+progresoCargaImg+'%'"
                        :aria-valuenow="progresoCargaImg"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span
                          v-if="progresoCargaImg < 100 && progresoCargaImg > 0"
                        >Cargando Imagen...</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group d-flex">
                    <div v-for="(imagen,index) in producto.images" :key="index" class="p-1">
                      <div class="img-wrapp">
                        <img :src="imagen" alt="Error" width="80px" />
                        <span class="delete-img" @click="deleteImage(imagen,index)">X</span>
                      </div>
                    </div>
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
    <!-- showImgModal -->
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id="showImgInModalId">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <img :src="showImgInModal" alt="Error Imagen" />
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
        image: null,
        images: [],
        variantes: []
      },
      activeItemIndex: null /*Se selecciona un item para editar*/,
      activeItemId: null,
      tag: "",
      variante: "",
      progresoCargaImg: 0,
      showImgInModal: ""
    };
  },
  methods: {
    showImgModal(imagen) {
      this.showImgInModal = imagen;
      window.$("#showImgInModalId").modal("show");
    },
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img); //Se obtiene la referencia de la img como un objeto de donde esta ubicada en firebase
      this.producto.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("Imagen borrada");
        })
        .catch(err => {
          console.log(err);
        });
    },
    cargarImagen(e) {
      if (e.target.files[0]) {
        const d = new Date();
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("products/" + file.name + "_" + d.toISOString());
        let uploadTask = storageRef.put(file); // para poder ultizar los metodos de task
        uploadTask.on(
          "state_changed",
          snapshot => {
            console.log(snapshot);
            this.progresoCargaImg =
              (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
            console.log(this.progresoCargaImg);
          },
          error => {
            console.log(error);
          },
          () => {
            //successfull part, it runs when the load is completed
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.producto.image = downloadURL;
              this.producto.images.push(downloadURL);
            });
          }
        );
      }
      //console.log(e.target.files[0])
    },
    reset() {
      this.producto = {
        nombre: null,
        precio: null,
        descripcion: null,
        tags: [""],
        image: null,
        images: [],
        variantes: [""]
      };
    },
    addNew() {
      this.reset();
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
    },
    addVariante() {
      this.producto.variantes.push(
        this.variante.substring(0, this.variante.length - 1)
      );
      this.variante = "";
    },
    removeVariante(index) {
      this.producto.variantes.splice(index, 1);
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
  max-height: 150px;
}

.img-wrapp {
  position: relative;
}

.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}

.img-wrapp span.delete-img:hover {
  cursor: pointer;
  font-weight: bold;
}

#showImgInModalId img {
  position: relative;
  object-fit: cover;
  width: 100%;
}
</style>