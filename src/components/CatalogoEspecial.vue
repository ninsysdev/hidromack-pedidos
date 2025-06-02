<template>
  <div class="container-fluid sticky-top p-2" style="top: 56px; background-color: whitesmoke;">
    <div class="input-group mb-2">
      <!-- div v-if="props.lista == 'Normal'" class="col-6" style="background-color:aqua;">
        <h6 class="mt-1 mb-1 text-center" style="font-size: large;">LISTA GENERAL</h6>
      </div -->
      <div class="col-6 bg-success">
        <h6 class="mt-1 mb-1 text-center" style="font-size: large;">LISTA LIQUIDACION</h6>
      </div>
      <div class="col-6 mt-1 mb-1" style="text-align: right">
        <CatalogoExcel :todos-productos="todosProductos" />
        <i style="color: white;">|</i>
        <CatalogoPDF :todos-productos="todosProductos" />
      </div>
    </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex">
            <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control me-2"
              placeholder="Datos a buscar" aria-label="Search" onfocus="this.select();">
            <button :class="'btn btn-'+store.basecolor" type="button" @click="listaProductos(tipobus)">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="btn-group" role="group" aria-label="Basic radio">
            <input @click="parametroBusqueda(1)" type="radio" class="btn-check" name="btnradio" id="btnradio1"
              autocomplete="off" >
            <label :class="'btn btn-outline'+store.basecolor" for="btnradio1"><i v-if="tipobus==1" class="bi bi-caret-right-fill"></i>Des</label>

            <input @click="parametroBusqueda(2)" type="radio" class="btn-check" name="btnradio" id="btnradio2"
              autocomplete="off">
            <label :class="'btn btn-outline'+store.basecolor" for="btnradio2"><i v-if="tipobus==2" class="bi bi-caret-right-fill"></i>Cod</label>

            <input @click="parametroBusqueda(3)" type="radio" class="btn-check" name="btnradio" id="btnradio3"
              autocomplete="off">
            <label :class="'btn btn-outline'+store.basecolor" for="btnradio3"><i v-if="tipobus==3" class="bi bi-caret-right-fill"></i>Ref</label>

            <input @click="parametroBusqueda(4)" type="radio" class="btn-check" name="btnradio" id="btnradio4"
              autocomplete="off">
            <label :class="'btn btn-outline'+store.basecolor" for="btnradio4"><i v-if="tipobus==4" class="bi bi-caret-right-fill"></i>Mac</label>
          </div>
        </div>
      </div>
    </div>
  <div class="offline" v-if="!esonline">
    <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
  </div>
  <div class="container">
  <!--NEW CARD-->
    <div v-for="producto in productos" :key="producto.codprod" class="card mb-2">
      <div class="d-flex justify-content-between">
        <span class="discount">{{ parseFloat(producto.Precio) }} $</span>
        <button :class="'btn btn-'+store.basecolor" @click="editarPedido(producto)" data-bs-toggle="modal"
        data-bs-target="#ModalActivos"><i class="bi bi-cart-fill"></i></button>
      </div>
      <div v-if="producto.CantImg>0">
          <div :id="producto.CodProd" class="carousel carousel-dark" data-bs-ride="carousel" data-bs-interval="20000">
            <div v-for="(imagen,index) in producto.img" :key="index" class="carousel-inner">
              <div v-if="index == 0" class="carousel-item active" style="text-align: center;">
                <!-- img :src="'https://catalogohidromack.spxapp.com/img/' + imagen.file" alt="..." width="300" height="300">
                <img src="/img/users/logo2.png" alt="..." width="268" hspace="16" height="268" vspace="16" -->
                <div style="position:relative">
                  <img :src="'https://catalogohidromack.spxapp.com/img/' + imagen.file" width="268" hspace="16" height="268" vspace="16" />
                  <div style="position:absolute; bottom:0; right:0; padding: 5%;">
                    <img border="0"  src="/img/users/logo2.png" width="150" height="80" />
                  </div>
                </div>  
              </div>
            <div v-else class="carousel-item" style="text-align: center;">
              <div style="position:relative">
                  <img :src="'https://catalogohidromack.spxapp.com/img/' + imagen.file" width="268" hspace="16" height="268" vspace="16" />
                  <div style="position:absolute; bottom:0; right:0; padding: 5%;">
                    <img border="0"  src="/img/users/logo2.png" width="150" height="80" />
                  </div>
                </div> 
            </div>
          </div>
          <div v-if="producto.CantImg > 1">
            <button class="carousel-control-prev" type="button" :data-bs-target="'#'+producto.CodProd"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#'+producto.CodProd"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <span class="old-price">{{ producto.CodProd }} 
        <i v-if="tienepedido(producto.CodProd) > 0">
          | <i class="bi bi-cart-fill"></i> - {{ tienepedido(producto.CodProd) }}
        </i>
      </span>      
      <h6 style="text-align: center;">{{ producto.Descrip }}<br>{{ producto.Descrip2 }}</h6>
      <h6 style="text-align: center;color: orange;font-size: 20px;">Disponibles {{producto.Exinten}}</h6>
      <h6 style="text-align: center;">{{ producto.Refere }} - {{ producto.Marca }}</h6>    
      </div>
      <br><br><br><br>
<!-- END NEW CARD-->
  </div>
  <!-- Modal -->
  <div class="modal fade modal-fullscreen" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-center">
          <h6 style="text-align: center;color: orange;font-size: 20px;">Disponibles {{datospedido.Exinten}}</h6>
          <div :class="'text-'+store.basecolor">{{ datospedido.Descrip }}</div>
          <div class="text-secondary">{{ datospedido.CodProd }} - {{ datospedido.Refere }} - {{ datospedido.Marca }}</div>
          <h1 style="color: orangered;"><b>{{ parseFloat(datospedido.Precio) }} $</b></h1>
          <div class="form-floating mt-2 mb-1">
            <input v-model="cantidad" type="number" content="width=device-width" class="form-control" id="floatingInput"
              placeholder="CANTIDAD" required>
            <label for="floatingInput">Cantidad</label>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="nuevodoPedido()" type="button" :class="'btn btn-'+store.basecolor" data-bs-dismiss="modal">Agregar</button>
          <button onclick="document.getElementById('campobuscar').focus();" type="button" class="btn btn-secondary"
            data-bs-dismiss="modal" id="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!--- FIN MODAL --->
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import CatalogoPDF from '@/components/CatalogoPDF.vue'
import CatalogoExcel from './CatalogoExcel.vue';
import { useGlobalStore } from '@/store/global'; 
const store = useGlobalStore();

const swal = inject('$swal')

const esonline = ref(false)
const datoabuscar = ref('')
const todosProductos = ref([])
const productos = ref([])
const datospedido = ref({})
const tieneImagen = ref(false)
const datosImagen = ref([])
const pedidotemp = ref([])
const cantidad = ref(null)
const cantire = ref(0)
const codvend = ref(null)
const tipobus = ref(2)

onMounted(() => {
  esonline.value = navigator.onLine
  todosProductos.value = JSON.parse(localStorage.getItem('spx_speciallist'));
  let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
  codvend.value = datoslocales.spx_use_v;
  let pedidotemporal = JSON.parse(localStorage.getItem('spx_pedido_esp'));
  if (pedidotemporal) {
    pedidotemp.value = JSON.parse(localStorage.getItem('spx_pedido_esp'))
    cantire.value = pedidotemp.value.length
  }
  let spx_find = JSON.parse(localStorage.getItem('spx_find'));
  datoabuscar.value = spx_find.filtro
  tipobus.value = spx_find.tipo
  if (datoabuscar.value!=''){
      parametroBusqueda(tipobus.value)
  }
  window.onpopstate = function () {
    if (window.location.hash == '#no-back-button') {
      document.getElementById('cerrarModal').click();
    }
  }
})

const listaProductos = (async (tipo) => {
  localStorage.setItem('spx_find',JSON.stringify({ tipo : tipo , filtro : datoabuscar.value}))
  if (datoabuscar.value != '') {
    if (tipo == 1) {
      let porciones = datoabuscar.value.split('*');
      let cantidatos = porciones.length
      productos.value = todosProductos.value.filter(producto => producto.Descrip.toLowerCase().includes(porciones[0].toLowerCase()))
      if (cantidatos > 1) {
        for (var i = 1; i < cantidatos; i++) {
          productos.value = productos.value.filter(producto => producto.Descrip.toLowerCase().includes(porciones[i].toLowerCase()))
        }
      }
    }
    else if (tipo == 2) {
      productos.value = todosProductos.value.filter(producto => producto.CodProd.toLowerCase().includes(datoabuscar.value.toLowerCase()))
    }
    else if (tipo == 3) {
      productos.value = todosProductos.value.filter(producto => producto.Refere.toLowerCase().includes(datoabuscar.value.toLowerCase()))
    }
    else {
      productos.value = todosProductos.value.filter(producto => producto.Marca.toLowerCase().includes(datoabuscar.value.toLowerCase()))
    }
  }
  else {
    productos.value = [];
  }

})

function nuevodoPedido() {
  if (parseInt(cantidad.value) <= parseInt(datospedido.value.Exinten)) {
    
    if (pedidotemp.value.some(pedidotemp => pedidotemp.codprod == datospedido.value.CodProd)) {
      swal("Codigo ya existe en Pedido");
    } else {
      pedidotemp.value.push({
        codvend: codvend.value,
        codclie: '',
        cliente: '',
        codprod: datospedido.value.CodProd,
        descrip: datospedido.value.Descrip,
        referen: datospedido.value.Refere,
        cantidad: cantidad.value,
        precio: datospedido.value.Precio,
        comentario: '', //comentario.value,
        conexion: 'Esp', //conexion.value,
        deposito: datospedido.value.Deposito
      });
      localStorage.setItem('spx_pedido_esp', JSON.stringify(pedidotemp.value))
      cantire.value = pedidotemp.value.length
    }
  } else {
    swal("La cantidad es superior a la existencia");
  }
  document.getElementById("campobuscar").focus();
}

function editarPedido(producto) {
  window.location.hash = "no-back-button";
  history.pushState(null, null, 'listaproductos#no-back-button');
  cantidad.value = tienepedido(producto.CodProd)
  datospedido.value = producto;
  if (producto.img) {
    tieneImagen.value = true;
    datosImagen.value = producto.img;
  }
  else {
    tieneImagen.value = false;
    datosImagen.value = []
  }

}

function tienepedido(codigo) {
  let cantidadpedida = 0
  if (cantire.value > 0) {
    //console.log(codigo)
    for (let i = 0; i <= cantire.value - 1; i++) {
      //console.log(this.pedidotemp[i].codprod)
      if (pedidotemp.value[i].codprod == codigo) {
        cantidadpedida = cantidadpedida + Number(pedidotemp.value[i].cantidad)
      }
    }
  }
  return cantidadpedida
}

function parametroBusqueda(tipo) {
  tipobus.value = tipo;
  listaProductos(tipo);

}
</script>

<style scoped>
    .discount{
      background-color: orange;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 4px;
      padding-right: 4px;
      font-size: 24px;
      border-radius: 6px;
      color: #fff;
      }
      .old-price{
        font-size: 15px;
        text-align: center;
        font-weight: bold;
        color: grey;
      }
</style>