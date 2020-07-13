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
            <th scope="col-lg">Detalles</th>
            <th scope="col-lg">Precio</th>
            <th scope="col-lg">Tags</th>
            <th scope="col-lg">Variantes</th>
            <th scope="col-lg">Imagen</th>
            <th scope="col-lg">Modificar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(productoLoop,index) in productos" :key="index">
            <!-- index -->
            <td scope="row">
              <p class="col-lg">{{index+1}}</p>
            </td>
            <!-- nombre -->
            <td scope="row">
              <p
                class="edit-off col-lg"
                v-show="!productoLoop.editOn"
              >{{productoLoop.data().nombre}}</p>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <input type="text" class="form-control" v-model="producto.nombre" />
              </div>
            </td>
            <!-- detalles -->
            <td scope="row">
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
                        v-html="productoLoop.data().detalles"
                      ></p>
                      <div class="edit-on col-lg" v-show="productoLoop.editOn">
                        <VueEditor v-model="producto.detalles" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <!-- precio -->
            <td scope="row">
              <p
                class="edit-off col-lg"
                v-show="!productoLoop.editOn"
              >{{productoLoop.data().precio | currency('$',0)}}</p>
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <input type="text" class="form-control" v-model="producto.precio" />
              </div>
            </td>
            <!-- tags -->
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
            <!-- variantes -->
            <td scope="row">
              <div
                class="show-tags edit-off col-lg"
                v-if="productoLoop.data().variante"
                v-show="!productoLoop.editOn"
              >
                <!-- se muestra solo cuando se quiere mostrar -->
                <!-- tiene que ser sin el length ya que algunos no tienen el parametro variantes -->
                <li
                  v-for="(varianteProducto,index) in productoLoop.data().variante"
                  :key="index"
                  class="d-inline-block m-2 border px-1"
                >{{varianteProducto.variantId}}</li>
              </div>
              <!-- se muestra solo cuando se quiere editar -->
              <div class="edit-on col-lg" v-show="productoLoop.editOn">
                <div class="form-group">
                  <div class="show-tags" v-if="producto.variante">
                    <li
                      v-for="(varianteProducto,index) in producto.variante"
                      :key="index"
                      class="d-inline-block m-2 border px-1"
                    >
                      {{varianteProducto.variantId}}
                      <a href="#" @click="removeVariante(index)">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                      </a>
                    </li>
                  </div>
                </div>
              </div>
            </td>
            <!-- imagenes -->
            <td scope="row">
              <div class="edit-off col-lg" v-show="!productoLoop.editOn">
                <img
                  :src="productoLoop.data().variante[0].variantImage"
                  :alt="alternative = 'no existe imagen'"
                  class="producto-imagen"
                />
              </div>
              <div class="edit-on col-lg" v-if="producto.variante" v-show="productoLoop.editOn">
                <ul class="list-unstyled">
                  <li v-for="(variante,index) in producto.variante" :key="index" class="list-item card">
                    <a href="#" @click="showImgModal(variante.variantImage)">Imagen{{index+1}}</a>
                    <a href="#" @click="deleteImage(variante.variantImage,index)">
                      <i class="fa fa-times-circle"></i>
                    </a>
                  </li>
                </ul>
                <div class="form-group">
                  <label for="product_image">Agregar Imagen:</label>
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
            <!-- Botones editar y borrar -->
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

    <!-- Agregar Producto -->
    <!-- Modal para agregar un producto  -->

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
                <!-- columna 1 -->
                <div class="col-lg-8">
                  <!--Primera Columna Modal -->
                  <!-- nombre -->
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Nombre del producto"
                      v-model="producto.nombre"
                    />
                  </div>
                  <!-- detalles -->
                  <div class="form-group">
                    <VueEditor v-model="producto.detalles" />
                  </div>
                  <hr />
                  <!-- agregar variante -->
                  <h4>Variantes</h4>
                  <div class="form-group variante-form-group my-3">
                    <input
                      type="text"
                      placeholder="Color Variante"
                      v-model="variantColor"
                      class="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Referencia(ID)"
                      v-model="variantId"
                      class="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Cantidad Disponible"
                      v-model="variantQuantity"
                      class="form-control mb-2"
                    />
                    <div class="row">
                      <div class="col d-flex justify-content-end align-items-center">
                        <label class="text-right" for="imagenVarianteModal">Imagen Variante:</label>
                      </div>
                      <div class="col d-flex justify-content-start">
                        <input
                          type="file"
                          @change="cargarImagen"
                          class="form-control"
                          id="imagenVarianteModal"
                          name="imagenVarianteModal"
                        />
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
                    </div>
                    <div class="p-1 form-group d-flex" v-if="variantImage">
                      <div class="img-wrapp">
                        <span class="delete-img" @click="borrarImagenUnidad(variantImage)">x</span>
                        <img :src="variantImage" alt="Error" width="80px" />
                      </div>
                    </div>
                  </div>
                  <p
                    class="variante-warning-label"
                    v-show="!producto.variante.length"
                  >* Se debe agregar minimo una variante</p>
                  <p
                    class="variante-warning-label"
                    v-show="this.mensajeCampoVariante"
                  >{{this.mensajeCampoVariante}}</p>
                  <div class="d-flex justify-content-end">
                    <button
                      class="btn btn-primary m-2"
                      @click="agregarVarianteDeProducto"
                    >Agregar Variante</button>
                    <!-- Permite agregar una nueva variante del producto -->
                  </div>
                  <div
                    class="show-tags d-flex justify-content-start align-items-center"
                    v-if="producto.variante"
                  >
                    <!-- Se elimino el length -->
                    <!-- Se muestran las variables creadas -->
                    <span>Variantes agregadas:</span>
                    <li
                      v-for="(varianteProducto,index) in producto.variante"
                      :key="index"
                      class="d-inline-block m-2 border px-1"
                    >
                      {{varianteProducto.variantId}}
                      <a href="#" @click="removeVariante(index)">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                      </a>
                    </li>
                  </div>
                </div>
                <!-- columna 2 -->
                <div class="col-lg-4">
                  <h4 class="display-6">Detalles del produto</h4>
                  <hr />
                  <!-- precio -->
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Precio"
                      v-model="producto.precio"
                    />
                  </div>
                  <!-- Marca -->
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Marca"
                      v-model="producto.marca"
                    />
                  </div>
                  <!-- tags -->
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
                  <!-- mostrar variantes -->
                  <!--
                  <div class="form-group">
                    <div class="show-tags" v-if="producto.variante">
                      <li
                        v-for="(varianteProducto,index) in producto.variante"
                        :key="index"
                        class="d-inline-block m-2 border px-1"
                      >
                        {{varianteProducto.variantId}}
                        <a href="#" @click="removeVariante(index)">
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </li>
                    </div>
                  </div>
                  -->
                  <!-- imagenes Agregadas -->
                  <div class="form-group">
                    <label for="product_image">Imagenes Producto</label>
                  </div>
                  <div class="form-group" v-if="producto.variante">
                    <div class="row">
                      <div v-for="(variante,index) in producto.variante" :key="index" class="p-1">
                        <div class="col-md-6">
                          <div class="img-wrapp">
                            <img :src="variante.variantImage" alt="Error" width="80px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="!producto.variante.length"
              @click="agregarProducto"
            >Agregar Producto</button>
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
        marca: null,
        detalles: null,
        tags: [],
        variante: [],
        productoId: null,
        selectedVariant: 0
      },
      activeItemIndex: null /*Se selecciona un item para editar*/,
      activeItemId: null,
      tag: "", // estan conectados por el v-model a los input respectivos
      variante: "", // estan conectados por el v-model a los input respectivos
      progresoCargaImg: 0,
      showImgInModal: "",
      variantColor: null,
      variantId: null,
      variantImage: null,
      variantQuantity: null,
      mensajeCampoVariante: null
    };
  },
  methods: {
    showImgModal(imagen) {
      this.showImgInModal = imagen;
      window.$("#showImgInModalId").modal("show");
    },
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img); //Se obtiene la referencia de la img como un objeto de donde esta ubicada en firebase
      this.producto.variante.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("Imagen borrada");
        })
        .catch(err => {
          console.log(err);
        });
    },
    borrarImagenUnidad(img) {
      let image = fb.storage().refFromURL(img); //Se obtiene la referencia de la img como un objeto de donde esta ubicada en firebase
      this.variantImage = null;
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
            //console.log(snapshot);
            this.progresoCargaImg =
              (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
            //console.log(this.progresoCargaImg);
          },
          error => {
            console.log(error);
          },
          () => {
            //successfull part, it runs when the load is completed
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              //this.producto.image = downloadURL;
              //this.producto.images.push(downloadURL);
              this.variantImage = downloadURL;
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
        marca: null,
        detalles: null,
        tags: [],
        variante: [],
        productoId: null,
        selectedVariant: 0
      };
    },
    addNew() {
      this.reset();
      window.$("#NuevoProducto").modal("show");
    },
    agregarProducto() {
      db.collection("products")
        .add(this.producto)
        .then(docRef => {
          //console.log("Document written with ID: ", docRef.id);
          this.producto.productoId = docRef.id;
          window.$("#NuevoProducto").modal("hide");
          db.collection("products")
            .doc(this.producto.productoId)
            .update(this.producto)
            .then(function() {})
            .catch(function(error) {
              console.error("Error actualizando documento: ", error);
            });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      //this.$firestore.products.add(this.producto);
      //window.$("#NuevoProducto").modal("hide");
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
    removeVariante(index) {
      if (this.producto.variante[index]) {
        const img = this.producto.variante[index].variantImage;
        let image = fb.storage().refFromURL(img); //Se obtiene la referencia de la img como un objeto de donde esta ubicada en firebase
        this.producto.variante[index].variantImage = "";
        image
          .delete()
          .then(() => {
            console.log("Imagen borrada");
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.producto.variante.splice(index, 1);
      //this.producto.variantes.splice(index, 1);
    },
    agregarVarianteDeProducto() {
      if (
        this.variantId &&
        this.variantColor &&
        this.variantImage &&
        this.variantQuantity
      ) {
        this.producto.variante.push({
          variantId: parseInt(this.variantId),
          variantColor: this.variantColor,
          variantImage: this.variantImage,
          variantQuantity: parseInt(this.variantQuantity)
        });
        this.variantId = null;
        this.variantColor = null;
        this.variantImage = null;
        this.variantQuantity = null;
        this.mensajeCampoVariante = null;
      } else {
        this.mensajeCampoVariante = "Debe ingresar todos lo campos";
      }
    }
  },
  created() {
    //this.readData();
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
.variante-form-group {
  width: 80%;
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
.variante-warning-label {
  font-weight: bold;
  color: #a74646;
  text-align: left;
}
</style>