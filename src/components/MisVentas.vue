<template>
    <div class="container-fluid sticky-top p-2" style="top: 56px;background-color: whitesmoke;">
      <div class="row">
            <div class="d-flex mt-2 mb-2">
                <input v-model="fechadesde" type="date" class="form-control">
                <input v-model="fechahasta" type="date" class="form-control">
            </div>
            <div class="d-flex mb-2">
                <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control me-2"
                placeholder="Datos a buscar" aria-label="Search">
                <button :class="'btn btn-'+store.basecolor" type="button" @click="getfacturas()">
                <i class="bi bi-search"></i>
                </button>
          </div>
          <h4>TOTAL VENTA : {{ filters.formatNum(totalventas) }}</h4>
      </div>
    </div>
    <div class="container">
        <div v-for="factura in facturas" :key="factura.NroUnico" >
            <ul class="list-group list-group-flush">
                <li :class="'list-group-item list-group-item-'+store.basecolor+' d-flex justify-content-between align-items-center'">                    
                    <div> {{ factura.Descrip }} <br>
                        <small>{{ factura.Vendedor }} | <FacturaNumero :numeroFactura="factura.NumeroD"/> | {{ factura.FechaE }}</small> 
                    </div>
                    <span :class="'badge bg-'+store.basecolor+' rounded-pill'">{{ factura.Saldo }}</span>
                </li>
            </ul>
        </div>
        <br><br><br><br>
    </div>
    <div v-if="loading" class="d-grid gap-2 mt-2">
        <button :class="'btn btn-'+store.basecolor" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            SINCRONIZANDO...
        </button>
    </div>
</template>
  
<script setup>
    import { onMounted,ref } from 'vue';
    import { useGlobalStore } from '@/store/global';
    import ConsultaVentasService from '@/services/ConsultaVentasService';
    import FacturaNumero from '@/components/FacturaNumero.vue';

    const store = useGlobalStore();

    const facturasserv = new ConsultaVentasService();
    const facturas = facturasserv.getFacturas();

    const fechadesde = ref('');
    const fechahasta = ref('');
    const totalventas = ref(0);
    const datoabuscar = ref('');
    const loading = ref(false);
    const vendedor = ref('');

    onMounted( async () => {
        
        let fecha = new Date();
        let anoact = fecha.getFullYear();
        let mesact = fecha.getMonth()+1;
        if(mesact<10){
            mesact = '0'+mesact;
        }
        let diaact = fecha.getDate();
        if(diaact<10){
            diaact = '0'+diaact;
        } 
        fechadesde.value = anoact+'-'+mesact+'-01';
        fechahasta.value = anoact+'-'+mesact+'-'+diaact;
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(datoslocales){ 
            loading.value = true;
            vendedor.value = datoslocales.spx_use_v; 
            await facturasserv.fetchFacturas(store.urlPpal,store.headRequest(),fechadesde.value,fechahasta.value,datoabuscar.value,vendedor.value);    
            await totalizar();
            loading.value = false;
        }
        else{
            location.reload();
        }
    });

    const totalizar = ( async ()=>{
        totalventas.value = 0;
        facturas.value.forEach((item)=>{
            totalventas.value += Number(item.Saldo)
        })
    })

    const getfacturas = ( async ()=>{
        loading.value = true;
        await facturasserv.fetchFacturas(store.urlPpal,store.headRequest(),fechadesde.value,fechahasta.value,datoabuscar.value,vendedor.value);    
        await totalizar();
        loading.value = false;
    })

</script>