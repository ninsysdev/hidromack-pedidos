<template>
<!-- offcanvas -->
<div class="offcanvas offcanvas-start" style="width: 270px;" tabindex="-1" id="sidebar" aria-labelledby="sidebar">
  <div class="offcanvas-header">
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul class="navbar-nav">
          <li style="text-align: center;">
            <img src="/img/users/user.png" alt="..." style="width: 100%;"> 
            <p>{{ userl }}</p>
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <router-link style="text-decoration: none;color: black" :to="{ name : 'mispedidospendientes' }"><i class="bi bi-cloud-fill"></i> Archivos Guardados</router-link>   
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <router-link style="text-decoration: none;color: black" :to="{ name : 'mispedidos' }"><i class="bi bi-send-fill"></i> Pedidos Enviados</router-link>   
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <router-link style="text-decoration: none;color: black" :to="{ name : 'miscuentasporcobrar' }"><i class="bi bi-calculator-fill"></i> Cuentas por Cobrar</router-link>   
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <router-link style="text-decoration: none;color: black" :to="{ name : 'vercatalogopdf' }"><i class="bi bi-file-earmark-pdf-fill"></i> Catálogo PDF</router-link>   
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <router-link style="text-decoration: none;color: black" :to="{ name : 'misventas' }"><i class="bi bi-receipt"></i> Consulta de Ventas</router-link>   
          </li>
          <li class="mt-2 mb-2"><hr class="dropdown-divider bg-light" /></li>
          <li   v-if="loged">
              <a href="#" style="text-decoration: none;color: black" @click="logOut" ><i class="bi bi-x-square-fill"></i> Cerrar Sesion</a> 
          </li>
        </ul>
  </div>
</div>
</template>

<script setup>
  import { defineProps } from 'vue'

  defineProps({
    loged : Boolean,
    userl : String
  })

  const logOut = ( async ()=>{
    localStorage.removeItem('spx_localdata')
    localStorage.removeItem('spx_find')
    localStorage.removeItem('spx_fechareplica')
    localStorage.removeItem('spx_mydata')
    localStorage.removeItem('spx_clientlist')
    localStorage.removeItem('spx_priceslist')
    localStorage.removeItem('spx_lastdoc')
    localStorage.removeItem('spx_comentario')
    localStorage.removeItem('spx_summarycxc')

    location.reload()
  })

</script>
