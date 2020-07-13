import { db } from '@/firebase.js'

const state = {
    productos: [

    ],
    productoConId : null
};
const getters = {
    todosProductos: (state) => state.productos,
    productoConId: (state) => state.productoConId
};

const mutations = {
    actualizarProductos(state, payload) {
        state.productos = payload;
    },
    obtenerProductoConId(state,producto){
        state.productoConId = producto
    }
};

const actions = {
    async obtenerStock({ commit }) {
        await db.collection("products").onSnapshot((response) => {
            const data = [];
            console.log("Cambio base de datos");
            response.forEach((doc) => { data.push(doc.data()) });
            //console.log(data)
            commit('actualizarProductos', data)
        });
    },
    async obtenerProductoConId({commit},productoId){
        const producto = await db.collection('products').doc(productoId).get();
        if(producto.exists){
            commit('obtenerProductoConId',producto.data());
        }else{
            console.log("No existe el producto")
        }
    }
};



export default {
    state,
    getters,
    actions,
    mutations,
}