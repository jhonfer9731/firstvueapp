<template>
  <div class="container-lg">
    <h3>Inventario</h3>
    <div class="product-test">
      <h3 class="d-inline-block float-left">Lista de productos</h3>
      <button class="btn btn-primary float-right" @click="addNew">Agregar Producto</button>
    </div>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Modificar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(productoLoop,index) in productos" :key="index">
          <td scope="row">{{index+1}}</td>
          <td scope="row">
            <div class="edit-off" v-show="!productoLoop.editOn">{{productoLoop.data().nombre}}</div>
            <div class="edit-on col-lg-8" v-show="productoLoop.editOn">
              <input type="text" class="form-control" v-model="producto.nombre" />
            </div>
          </td>
          <td scope="row">
            <div class="edit-off" v-show="!productoLoop.editOn">{{productoLoop.data().precio}}</div>
            <div class="edit-on col-lg-6" v-show="productoLoop.editOn">
              <input type="text" class="form-control" v-model="producto.precio" />
            </div>
          </td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="NuevoProducto"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Agregar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Nombre del producto" v-model="producto.nombre">
            </div>
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Precio" v-model="producto.precio">
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
import { db } from "@/firebase.js";

export default {
  name: "ProductosAdmin",
  data() {
    return {
      productos: [],
      producto: {
        nombre: null,
        precio: null
      },
      //editOn: false,
      activeItemIndex: null,
      activeItemId: null
    };
  },
  methods: {
    addNew() {
      window.$("#NuevoProducto").modal("show");
    },
    agregarProducto() {
      db.collection("products")
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
        });
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
      if (confirm("Estas seguro? ")) {
        db.collection("products")
          .doc(productoId)
          .delete()
          .then(function() {
            alert("Producto Eliminado exitosamente");
          })
          .catch(function(error) {
            console.error("Error al eliminar el documento", error);
          });
      }
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
          this.producto.nombre = "";
          this.producto.precio = "";
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
  }
};
</script>

<style>
</style>