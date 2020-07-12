<template>
    <div class="container my-5">
        <!-- <div class="row">
            <div v-for="(producto,index) in productos" :key="index" class="col-md-4">
                    <ProductoCard :producto="producto" class="mb-4"  />
            </div>
        </div> -->
        <div class="row">
            <div v-for="(producto,index) in todosProductos" :key="index" class="col-md-4">
                <ProductoCard :producto="producto" class="mb-4" />
            </div>
        </div>
    </div>
    
        
</template>

<script>
import store from '@/store.js';
import ProductoCard from '@/components/ProductoCard';
import {mapGetters, mapActions} from 'vuex';
export default {
    name : 'Productos',
    components: {
        ProductoCard
    },
    data(){
        return{
            productos : store.productos
        }
    },
    methods :{
        ...mapActions(['obtenerStock'])
    },
    computed:{
        ...mapGetters(['todosProductos'])
    },
    created(){
        this.obtenerStock();
    }
}
</script>


<style scoped>



</style>