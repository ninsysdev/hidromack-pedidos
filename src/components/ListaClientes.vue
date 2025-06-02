<template>
  <div class="offline" v-if="!esonline">
    <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
  </div>
    <div class="container-fluid sticky-top p-2" style="top: 56px;background-color: whitesmoke;">
      <h5>ARCHIVO DE CLIENTES</h5>
      <div class="row">
        <div class="col-12">
          <div class="d-flex">
            <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control me-2"
              placeholder="Datos a buscar" aria-label="Search">
            <button :class="'btn btn-'+store.basecolor" type="button" @click="listaClientes()">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  <div class="container">
    <div class="mt-2">
      <div v-for="cliente in clientes" :key="cliente.id" class="card text-center" style="margin-bottom: 6px;border-color: gray;">
        <div class="card-header">
          <ul class="nav nav-pills card-header-pills">
              <router-link
                :to="{ name: 'pedidopendiente', params: { codclie: cliente.codclie, descrip: cliente.descrip, reeditar: 0 } }"
                :class="'btn btn btn-'+store.basecolor" href="#">Pedido L1
              </router-link>
&nbsp;&nbsp;
              <router-link
                :to="{ name: 'pedidoespecial', params: { codclie: cliente.codclie, descrip: cliente.descrip, reeditar: 0 } }"
                class="'btn btn btn-success" href="#">Pedido L2
              </router-link>
          </ul>
        </div>
        <p style="margin-top: 2px;font-size: x-large;"> <small>{{ cliente.codclie }} <br> {{ cliente.descrip }}</small></p>
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
import { useGlobalStore } from '@/store/global'; 
const store = useGlobalStore();
const esonline = ref(false)
const datoabuscar = ref('')
const todosClientes = ref([])
const clientes = ref([])

onMounted(() => {
  esonline.value = navigator.onLine
  todosClientes.value = JSON.parse(localStorage.getItem('spx_clientlist'));
})

const listaClientes = (() => {
  let data1 = todosClientes.value.filter(
    cliente => cliente.descrip.toLowerCase().includes(datoabuscar.value.toLowerCase())
  )
  let data2 = todosClientes.value.filter(
    cliente => cliente.codclie.toLowerCase().includes(datoabuscar.value.toLowerCase())
  )
  clientes.value = data1.concat(data2);
})
</script>
  