<template>
  <div class="offline" v-if="!esonline">
    <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
  </div>
  <nav class="navbar navbar-light bg-light fixed-bottom">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex">
            <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control me-2"
              placeholder="Datos a buscar" aria-label="Search">
            <button class="btn btn-primary" type="button" @click="listaClientes()">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="container">
    <h5>ARCHIVO DE CLIENTES</h5>
    <div class="mt-2">
      <div v-for="cliente in clientes" :key="cliente.id" class="card text-center" style="margin-bottom: 6px;">
        <div class="card-header">
          <ul class="nav nav-pills card-header-pills">
            <li class="d-flex">
              <router-link
                :to="{ name: 'pedidopendiente', params: { codclie: cliente.codclie, descrip: cliente.descrip, reeditar: 0 } }"
                class="btn btn-sm btn-primary" href="#">Pedido
              </router-link>
            </li>
          </ul>
        </div>
        <p class="text-primary" style="margin-top: 2px;"> <small>{{ cliente.descrip }}</small></p>
        <div v-if="cliente.escxc > 0">
          <table class="table table-sm">
            <tr v-for="documento in cliente.porcobrar" :key="documento.numerod">
              <td>
                <small>
                  <i v-if="documento.TipoCxc == '10'">Fac: </i> <i v-else>ND: </i>
                  {{ documento.NumeroD }} - {{ documento.Dias }} dias
                </small>
              </td>
              <td style="text-align: right;">
                <div v-if="documento.TipoCxc == '10'">
                  <small> {{ filters.formatNum(documento.saldo) }} $</small>
                </div>
              </td>
            </tr>
            <tr v-if="cliente.escxc > 1">
              <td> <small><b>Total</b></small></td>
              <td style="text-align: right;"><small><b>{{ filters.formatNum(cliente.totalcxc) }} $</b></small></td>
            </tr>
          </table>
        </div>
      </div>
      <hr>
      <br><br><br>
    </div>
  </div>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';
const esonline = ref(false)
const datoabuscar = ref('')
const todosClientes = ref([])
const clientes = ref([])

onMounted(() => {
  esonline.value = navigator.onLine
  todosClientes.value = JSON.parse(localStorage.getItem('spx_clientlist'));
})

const listaClientes = (() => {
  clientes.value = todosClientes.value.filter(
    cliente => cliente.descrip.toLowerCase().includes(datoabuscar.value.toLowerCase())
  )
})
</script>
  