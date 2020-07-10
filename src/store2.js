import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0, // the data I store,
        cartProducts: [],
        cartSaldoTotal: 0,
        agregoProductoBandera: false,
    },
    mutations: {
        addToCart(state, item) { // primero se coloca el state como parametro y luego el item que se llama desde el commit en cualquier componente
            const productoCopia = JSON.parse(JSON.stringify(item)) // Hace una copia profunda del objecto que entra al carrito
            let found = state.cartProducts.find(producto => {// busca si el producto ya esta agregado al carrito
                return producto.productoId === item.productoId
            })
            if (found) {
                if (found.selectedVariant === item.selectedVariant) { // observa si la variante del carrito es la misma, sino se trata de otro producto
                    found.cantidadProducto ? found.cantidadProducto++ : 1; // aumenta la cantidad si no el articulo ya esta en el carrito
                }
                else {
                    productoCopia.variante = productoCopia.variante[productoCopia.selectedVariant] // solo toma la variante seleccionada
                    productoCopia.cantidadProducto = 1
                    state.cartProducts.push(productoCopia)
                }

            } else {
                productoCopia.variante = productoCopia.variante[productoCopia.selectedVariant]
                productoCopia.cantidadProducto = 1
                state.cartProducts.push(productoCopia)
            }
            //console.log(productoCopia.precio)
            state.cartSaldoTotal += parseInt(state.cartProducts[state.cartProducts.length - 1].precio, 10);
            state.count++;
        },
        eliminarDeCarrito(state, infoproductoId) {
            const updatedProducts = state.cartProducts.filter((value) => {
                return !(value.productoId === infoproductoId.productoId && value.variante.variantId === infoproductoId.varianteId)
            });
            state.cartProducts = updatedProducts;
            let sumaPrecios = 0;
            state.count = 0
            state.cartProducts.forEach(
                (producto) => {
                    sumaPrecios += parseInt(producto.precio) * producto.cantidadProducto;
                    state.count += producto.cantidadProducto;
                }
            );
            state.cartSaldoTotal = sumaPrecios
        },
        enfatizarCarritoBoton(state, agregoProductoBandera) {
            state.agregoProductoBandera = agregoProductoBandera
        },
        cambiarCantidadProductos(state, payload) {
            const updatedProducts = state.cartProducts.find((value) => {
                return (value.productoId === payload.productoId && value.variante.variantId === payload.varianteId)
            });
            if (updatedProducts) {
                updatedProducts.cantidadProducto = payload.cantidadActual;
                let sumaPrecios = 0;
                state.count = 0
                state.cartProducts.forEach(
                    (producto) => {
                        sumaPrecios += parseInt(producto.precio) * producto.cantidadProducto;
                        state.count += producto.cantidadProducto;
                    }
                );
                state.cartSaldoTotal = sumaPrecios
            }

        }
    }
})


  // mutations methods I can use in any component