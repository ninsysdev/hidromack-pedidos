<template>
      <div class="offline" v-if="!esonline">
          <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
      </div>
      <div class="container">
        <h5>LISTA DE CLIENTES</h5>
          <div class="input-group p-2">
              <input v-model="datoabuscar" type="text" class="form-control bg-light border-0 small" placeholder="Buscar por nombre"
                  aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                  <button class="btn btn-primary" type="button" @click="listaClientes()">
                    <i class="bi bi-binoculars-fill"></i>
                  </button>
              </div>
          </div>
      <div class="mt-2">
        <div v-for="cliente in datosPaginados" :key="cliente.id" class="card text-center" style="margin-bottom: 6px;">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="d-flex">
                <router-link  
                    :to="{name:'pedidopendiente',params:{codclie:cliente.codclie,descrip:cliente.descrip,reeditar:0}}"
                    class="btn btn-sm btn-primary" href="#">Pedido
              </router-link>
              </li>
            </ul>
          </div>
          <p class="text-primary" style="margin-top: 2px;"> <small>{{ cliente.descrip }}</small></p>
          <div v-if="cliente.escxc>0">
            <table class="table table-sm">
              <tr v-for="documento in cliente.porcobrar" :key="documento.numerod">
                <td>
                  <small>
                    <i v-if="documento.TipoCxc=='10'">Fac: </i>  <i v-else>ND: </i> 
                    {{ documento.NumeroD }}  
                    <!-- i v-if="documento.TipoCxc=='10'" class="text tex-sm">{{ documento.FactorFac }} - {{ documento.Dias }}</i -->  
                  </small>
                </td>
                <td style="text-align: right;">
                  <div v-if="documento.TipoCxc=='10'" >
                  <small> {{ filters.formatNum(documento.saldo) }} $</small>
                  </div>
                </td>
              </tr>
              <tr v-if="cliente.escxc>1">
                <td> <small><b>Total</b></small></td>
                <td style="text-align: right;"><small><b>{{ filters.formatNum(cliente.totalcxc) }} $</b></small></td>
              </tr>
            </table>
          </div>
        </div>
          <nav v-if="totalPaginas() > 1 && totalPaginas() < 7" aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" @click="getPaginaPrevia()"><i class="bi bi-chevron-compact-left"></i></a></li>
              <li v-for="pagina in  totalPaginas()" :key="pagina" class="page-item" :class="esActiva(pagina)"><a class="page-link" @click="getDataPagina(pagina)" >{{ pagina }}</a></li>
              <li class="page-item"><a class="page-link" @click="getPaginaProxima()"><i class="bi bi-chevron-compact-right"></i></a></li>
            </ul>
          </nav>
          <nav v-if="totalPaginas() >=7" aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">DATOS EXCEDEN</li>
            </ul>
          </nav>
      </div>
    </div>
</template>
    
<script setup>
      import { onMounted,ref } from 'vue';

      const esonline = ref(false)
      const datoabuscar = ref('')
      const todosClientes = ref([])
      const clientes = ref([])
      let elementosPorPagina = 5
      const datosPaginados = ref([])
      const paginaActual = ref(1)
 
      onMounted(()=>{
        esonline.value=navigator.onLine
        todosClientes.value = JSON.parse(localStorage.getItem('spx_clientlist'));
      })

    const listaClientes = ( async ()=>{
          clientes.value = todosClientes.value.filter(
            cliente => cliente.descrip.toLowerCase().includes(datoabuscar.value.toLowerCase())
          )
          await totalPaginas()
          await getDataPagina(1)
    })

    const totalPaginas = ( async ()=>{
        return Math.ceil(clientes.value.length / elementosPorPagina)
    })

    const getDataPagina = ( async (noPagina)=>{
          paginaActual.value = noPagina;
          datosPaginados.value = [];
          let ini = (noPagina*elementosPorPagina) - elementosPorPagina
          let fin = (noPagina*elementosPorPagina)
          datosPaginados.value = clientes.value.slice(ini,fin);
    })

    function getPaginaPrevia(){
        if(paginaActual.value>1){
            paginaActual.value--
          }
          getDataPagina.value(paginaActual.value)
    }
        
        function getPaginaProxima(){
          if(paginaActual.value<totalPaginas()){
            paginaActual.value++
          }
          getDataPagina(paginaActual)
        }
        
        function esActiva(noPagina){
          return noPagina ==  paginaActual.value ? 'active' : '';
        }
</script>
  