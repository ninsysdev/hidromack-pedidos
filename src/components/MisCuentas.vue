<template>
    <div class="offline" v-if="!esonline">
        <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
    </div>
    <nav class="navbar navbar-light bg-light fixed-bottom">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <h3 class="text-primary">Total por cobrar : <b>{{ filters.formatNum(totalcxc) }}</b></h3>
          <div class="d-flex">
            <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control me-2"
              placeholder="Datos a buscar" aria-label="Search">
            <button class="btn btn-primary" type="button" @click="getcuentas()">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
    <div class="container">
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div v-for="cuenta in misCuentas" :key="cuenta.codclie" >
                <ul class="list-group list-group-flush accordion-item" v-if="cuenta.escxc>0">
                    <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center" style="font-size: small;" data-bs-toggle="collapse" :data-bs-target="'#'+cuenta.codclie" aria-expanded="false">
                        {{ cuenta.descrip }} <br> {{ cuenta.ID3 }}
                        <span class="badge bg-primary rounded-pill">{{ cuenta.totalcxc }}</span>
                    </li>
                    <div :id="cuenta.codclie" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <table class="table table-sm">
                                <tr v-for="itemcxc,index in cuenta.porcobrar" :key="index">
                                    <td>
                                        <small>
                                        <i v-if="itemcxc.TipoCxc == '10'">Fac: </i> <i v-else>ND: </i>
                                        {{ itemcxc.NumeroD }} - {{ itemcxc.Dias }} dias
                                        </small>
                                    </td>
                                    <td style="text-align: right;">
                                        <div v-if="itemcxc.TipoCxc == '10'">
                                            <small> {{ filters.formatNum(itemcxc.saldo) }} $</small>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </ul>
            </div>
            <hr>
            <br><br>
        </div>
    </div>
</template>
  
<script setup>
    import { onMounted,ref } from 'vue';
    const esonline = ref(false);
    const misClientes = ref([]);
    const misCuentas = ref([]);
    const totalcxc = ref(0);
    const datoabuscar = ref('');

    onMounted( async () => {
        esonline.value = navigator.onLine;
        misClientes.value = JSON.parse(localStorage.getItem('spx_clientlist'));
        await getcuentas();
    });

    const getcuentas = ( async ()=>{
        totalcxc.value = 0

        misCuentas.value = misClientes.value.filter(cliente => cliente.escxc>0)

        if(datoabuscar.value!=''){
            misCuentas.value = misCuentas.value.filter(cliente => cliente.descrip.toLowerCase().includes(datoabuscar.value.toLowerCase()))
        }

        misCuentas.value.forEach((item)=>{
            if(item.escxc>0){
                totalcxc.value += Number(item.totalcxc)
            }
        })
    })
</script>