import { db } from '@/firebase.js'

const state = {
    productos: [
        {
            name: 'prueba'
        }
    ]
};
const getters = {
    todosProductos: (state) => state.productos
};

const mutations = {
    actualizarProductos(state, payload) {
        state.productos = payload;
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
    }
};



export default {
    state,
    getters,
    actions,
    mutations,
}