<template>
<main>
    <div class="offline" v-if="!esonline">
       <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
    </div>
    <div class="container mt-2">
        <p class="text-center"> {{ codclie  }} - {{ nomclie }}</p>
        <hr>
            <div class="row g-2 mt-1">
                <table class="table table-light table-sm">
                    <tbody>
                        <tr>
                            <td>Descripcion</td>
                            <td> Total </td>
                        </tr>
                        <tr v-for="item in documentoData" :key="item.id" class="table-secondary">
                            <td v-if="item.codclie == codclie"><small>{{ item.codprod }} - {{ item.descrip }}<br>
                            Cant: {{ item.cantidad }} - Precio: {{ item.precio  }}</small></td>
                            <td class="text-right" v-if="item.codclie == codclie"><small>{{ filters.formatNum(item.cantidad*item.precio)  }}</small></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><b>TOTAL</b></td>
                            <td class="text-right"><small><b>{{ filters.formatNum(totalmonto)  }}</b></small></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div  class="d-grid gap-2 mb-2">
                <router-link :to="{ name : formulario }" class="btn btn-secondary" type="button" id="regresar"> <i class="bi bi-arrow-return-left"></i> REGRESAR</router-link>
            </div>
            <div v-if="sincroniza" class="d-grid gap-2">
                <button class="btn btn-primary btn-block" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    SINCRONIZANDO...
                </button>
            </div>
            <div v-else >
                <div class="d-grid gap-2" v-if="guardado==1">
                    <button type="button" style="color: black;" class="btn btn-warning" @click="editarPedido()"><i class="bi bi-pencil-fill"></i> EDITAR</button>
                    <hr>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#ModalActivos" class="btn btn-danger"><i class="bi bi-trash3-fill"></i> BORRAR PEDIDO</button>
                </div>
            </div>
    </div>
    <!-- Modal -->
    <div class="modal fade modal-fullscreen" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
          <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-body text-center">
                      <div class="text-primary">{{ nomclie }}</div>
                      <h1 style="color: orangered;"><b>¿ Realmente quieres borrar este pedido ?</b></h1>
                    </div>
                    <div class="modal-footer">
                        <button @click="borrarPedido()"  type="button" class="btn btn-danger" data-bs-dismiss="modal">BORRAR</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
                    </div>
                    </div>
          </div>
        </div>
        <!--- FIN MODAL --->
</main>
</template>

<script setup>
    import { onMounted,defineProps,ref,inject } from 'vue';
    import { useRouter } from 'vue-router';
    import consultardocumentoService from '@/services/ConsultarDocumentoService'
    import BorrarDocumentoService from '@/services/BorrarDocumentoService'
    import PedidosGuardadosService from '@/services/PedidosGuardadosService'
    import { useGlobalStore } from '@/store/global';

    const sincroniza = ref(false)
    const route = useRouter() 
    const swal = inject('$swal')
    const consultarDocumento = new consultardocumentoService()
    const documentoData = consultarDocumento.getDocumento()
    const borrarDocumento = new BorrarDocumentoService()
    const borrarDocumentoRes = borrarDocumento.getRespuesta()
    const pedidosguardos = new PedidosGuardadosService()
    const store = useGlobalStore()
    const formulario = ref('')
    const vendedor = ref('')
    const esonline = ref(false)
    const pedidotemp = ref([])
    const props = defineProps({
        codigo : Number,
        guardado : Number,
        codclie : String,
        nomclie : String,
        totalmonto : Number
    })
    const esesp=ref('');

    onMounted( async ()=>{
        esonline.value=navigator.onLine
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(datoslocales){ 
            vendedor.value = datoslocales.spx_use_v; 
        }    
        if(props.guardado==1){
            formulario.value = 'mispedidospendientes'
            sincroniza.value = true
            await consultarDocumento.fetchConsultarDocumentoGuardado(store.urlPpal,store.headRequest(),props.codigo)
            sincroniza.value = false
         }
        else{
            formulario.value = 'mispedidos'
            sincroniza.value = true
            await consultarDocumento.fetchConsultarDocumento(store.urlPpal,store.headRequest(),props.codigo)
            sincroniza.value = false
        }
        esesp.value = documentoData.value[0].conexion;
        console.log('esesp',esesp.value)
    })

    const borrarPedido = ( async ()=>{
        sincroniza.value = true
        await borrarDocumento.fetchBorrarDocumento(store.urlPpal,store.headRequest(),props.codigo)
        if(borrarDocumentoRes.value.response == 'ok'){
            await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),vendedor.value);
            await swal({
                    icon: 'success',
                    title: 'Archivo BORRADO',
                    showConfirmButton: false,
                    timer: 1500 
            })
            document.getElementById("regresar").click()
        }
        else{
            swal({
            icon: 'error',
            title: 'Error',
            text: 'No se logro la conexion al servidor',
            })
        }
        sincroniza.value = false
    })

    const editarPedido = ( async ()=>{
        await pedidoTemporal()
        if(esesp.value == 'Esp'){     
            route.push({
                name : 'pedidoespecial',
                params : {
                    codclie : props.codclie,
                    descrip : props.nomclie,
                    reeditar : props.codigo
                }
            })       
        }
        else{
            route.push({
                name : 'pedidopendiente',
                params : {
                    codclie : props.codclie,
                    descrip : props.nomclie,
                    reeditar : props.codigo
                }
            })
        }
    })

    const pedidoTemporal = ( async ()=>{
        let temcomenta = ''
        if(esesp.value == 'Esp'){
            localStorage.removeItem('spx_pedido_esp')
        }
        else{
            localStorage.removeItem('spx_pedidotemp')
        }

        documentoData.value.forEach((item)=>{
            pedidotemp.value.push({
              codvend : vendedor.value,
              codclie : props.codclie,
              cliente : props.nomclie,
              codprod : item.codprod,
              descrip : item.descrip,
              cantidad : item.cantidad,
              precio : item.precio,
              comentario : '',
              conexion : '', 
              deposito : item.deposito 
          })
          temcomenta = item.comentario
        })
        if(esesp.value == 'Esp'){
            localStorage.setItem('spx_pedido_esp',JSON.stringify(pedidotemp.value))
        }
        else{
            localStorage.setItem('spx_pedidotemp',JSON.stringify(pedidotemp.value))
        }
        
        localStorage.setItem('spx_comentario',JSON.stringify(temcomenta))
    })
</script>