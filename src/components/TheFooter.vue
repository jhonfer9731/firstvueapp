<template>
  <footer class="footer">
      <link rel="stylesheet" type="text/css" :href="require('@/assets/icons/font/flaticon.css')">
      <div class="container">
        <div class="row py-4 footer-categories">
            <div class="col-lg-4">
                <h4>{{contenido.categorias[0].nombre}}</h4>
                <ul :key="contenido.categorias[0].nombre">
                    <li v-for="(item,index) in contenido.categorias[0].contenido" :key="index"><router-link class="router-link" :to="{name:'Home'}">{{item}}</router-link></li>
                </ul>
            </div>
            <div class="col-lg-4">
                <h4>{{contenido.categorias[1].nombre}}</h4>
                <ul :key="contenido.categorias[1].nombre">
                    <li v-for="(item,index) in contenido.categorias[1].contenido" :key="index"><router-link class="router-link" :to="{name:'Home'}">{{item}}</router-link></li>
                </ul>
            </div>
            <div class="col-lg-4">
                <h4>{{contenido.categorias[2].nombre}}</h4>
                <ul :key="contenido.categorias[2].nombre">
                    <li v-for="(item,index) in contenido.categorias[2].contenido" :key="index"><router-link class="router-link" :to="{name:'Home'}">{{item}}</router-link></li>
                </ul>
            </div>
        </div>
        <div class="row py-2 footer-iconos">
            <div class="col-lg">
                <p class="text-central">Siguenos en</p>
                <div class="icons" >
                    <a href ="http://www.facebook.com" target="_blank">
                    <span class="flaticon-facebook">
                    </span>
                    </a>
                </div>
                <div class="icons">
                    <a href ="http://www.youtube.com" target="_blank">
                    <span class="flaticon-youtube"></span>
                    </a>
                </div>
                <div class="icons">
                    <a href ="http://www.instagram.com" target="_blank">
                    <span class="flaticon-instagram"></span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row py-1 text-center">
            <p class="text-central text-muted">© 2020 JFApp. All rights reserved.</p>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
 name: 'TheFooter',
 data(){
     return{
         contenido:{
             categorias:[
                 {
                     nombre: 'Colecciones',
                     contenido: ['Mujer','Hombre','Niños','Hogar']
                 },
                 {
                     nombre: 'Informacion Corporativa',
                     contenido: ['Quienes Somos','Nuestra Responsabilidad','Trabajar en JF']
                 },
                 {
                     nombre: 'Ayuda',
                     contenido: ['Soporte','Mi cuenta','Registro','Contactanos']
                 },
             ],
             social : ['Facebook', 'YouTube', 'Instragram']
         }
     }
 }
}
</script>

<style scoped>
    .footer{
        background-color: #343a40 !important;
    }
    .footer ul{    
        list-style-type: none;
        padding: 5px 0px;
    }
    .footer li{
        margin: 2px 0px;
    }
    .footer .router-link{
        text-decoration: none;
        color: #fefefe;
    }
    .footer .router-link:hover{
        text-decoration: underline;
    }
    
    .footer h4{
        color: #80df8d;
        font-weight: bold;
    }
    .footer .text-center{
        text-align: center !important;
    }
    .footer .text-central{
        width: 100%;
        color: #fefefe;
    }
    .footer-iconos{
        border-top: 1px solid #fefefe;
    }
    .footer-categories{
        padding-bottom: 0px !important;
    }
    .icons{
        width: 50px;
        height: auto;
        margin: 0px 10px;
        display: inline-block;
    }
    .icons:hover{
        transform: translateY(-3px);
        transition: 400ms ease;
    }

    .icons span:before{

        font-size: 50px;
        margin-left : 0px;
        color: #fefefe;
    }

    .icons span:hover:before{
        color: #80df8d;
    }




</style>