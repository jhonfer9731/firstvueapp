<template>
  <div class="container-lg">
    <h3>Basic CRUD</h3>
    <div class="product-test">
      <div class="form-group">
        <input
          type="text"
          placeholder="Nombre Producto"
          v-model="producto.nombre"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="Precio Producto"
          v-model="producto.precio"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <button @click="saveData" class="btn btn-primary">Guardar Datos</button>
      </div>
    </div>
    <h3>Lista de productos</h3>
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
        <tr v-for="(producto,index) in productos" :key="index">
          <td scope="row">{{index+1}}</td>
          <td scope="row">
            <div class="edit-off" v-show="!producto.editOn">{{producto.data().nombre}}</div>
            <div class="edit-on col-lg-8" v-show="producto.editOn">
              <input type="text" class="form-control" v-model="producto.data().nombre" />
            </div>
          </td>
          <td scope="row">
            <div class="edit-off" v-show="!producto.editOn">{{producto.data().precio}}</div>
            <div class="edit-on col-lg-6" v-show="producto.editOn">
              <input type="text" class="form-control" v-model="producto.data().precio" />
            </div>
          </td>
          <td>
            <button @click="editarProducto(index)" class="btn btn-primary">Editar</button>
            <button @click="borrarProducto(producto.id)" class="btn btn-danger">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      indexedElementEdit: 0
    };
  },
  methods: {
    saveData() {
      db.collection("products")
        .add(this.producto)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
          this.cleanData();
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
      this.editOn = true;
      this.productos[index].editOn = true;
      this.indexedElementEdit = index;
      console.log(index);
    }
  },
  created() {
    this.readData();
  }
};
</script>

<style>
</style>