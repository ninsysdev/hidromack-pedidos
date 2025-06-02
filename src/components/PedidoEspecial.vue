<template>
    <div class="offline" v-if="!esonline">
        <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
    </div>
    <div v-if="cantire>0" class="container mt-2">
            <div v-if="cliente.codclie!=''" style="text-align: center;"><h5>{{ cliente.codclie }} - {{ cliente.descrip }}</h5></div>
            <div class="row g-2 mt-1">
                <table class="table table-sm">
                    <tbody>
                        <tr v-for="(item,index) in pedidotemp" :key="index">
                            <td><small><i class="bg-success">{{ item.codprod }}</i> - {{ item.descrip }}<br>
                            Ref: {{ item.referen }}<br>    
                            Cant: {{ item.cantidad }} - Precio: {{ item.precio }}</small></td>
                            <td style="text-align: right;"><small>{{ filters.formatNum(item.cantidad*item.precio)  }}</small></td>
                            <td style="text-align: right;">
                                <div class="btn-group-vertical">
                                    <button @click="datoscantidad(index,item.cantidad,item.descrip,item.precio)" type="button" :class="'btn btn-'+store.basecolor" data-bs-toggle="modal" data-bs-target="#ModalActivos"><i class="bi bi-pencil-fill"></i></button>
                                    <button  @click="borraoitem(index)" type="button" class="btn btn-dark"><i class="bi bi-trash-fill"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="table-secondary">
                            <td>{{ totalit }} ITEMS - TOTAL</td>
                            <td style="text-align: right;"><small><b>{{ filters.formatNum(totalre) }}</b></small></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <input v-model="comentario"  type="text" class="form-control mb-3" placeholder="Comentario"  maxlength="40" @keyup="actualizarComentario()">
            
            <div v-if="sincroniza" class="d-grid gap-2">
                <button :class="'btn btn-'+store.basecolor+' btn-block'" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    SINCRONIZANDO...
                </button>
            </div>
            <div v-else>
                <div v-if="esonline" class="d-grid gap-2">
                <div v-if="cliente.codclie!=''" class="d-grid gap-2">
                    <button @click="totalizarpedido()" class="btn btn-success mb-1 btn-block"  ><i class="bi bi-send-fill"></i> ENVIAR PARA PROCESAR</button>
                    <button @click="guardarPedido()" style="color: black;" class="btn btn-success mb-1 btn-block"  ><i class="bi bi-folder-fill"></i> GUARDAR EN MIS ARCHIVOS</button>
                </div>              
                </div>
                <div class="d-grid gap-2">
                    <button @click="borrarPedido()" class="btn btn-secondary mt-2 btn-block" type="button" ><i class="bi bi-trash3-fill"></i> BORRAR PEDIDO</button>
                </div>
            </div>
    </div>
    <div v-else >
        <h5 style="text-align: center;">NO HAY PRODUCTOS PEDIDOS</h5>
    </div>
    <!-- Modal -->
    <div class="modal fade modal-fullscreen" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-body text-center">            
            <div :class="'text-'+store.basecolor">{{ editaitem.descrip }}</div>
            <h4>{{ editaitem.precio }} $</h4>
            <div class="form-floating mt-2 mb-1">
            <input v-model="editaitem.cantidad" type="number" content="width=device-width" class="form-control" id="floatingInput" placeholder="CANTIDAD" required>
            <label for="floatingInput">Cantidad</label>
            </div>
        </div>
        <div class="modal-footer">
            <button @click="editarcantidad()"  type="button" :class="'btn btn-'+store.basecolor" data-bs-dismiss="modal">Actualizar</button>
            <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cerrarModal">Cancelar</button>
        </div>
        </div>
        </div>
    </div>
    <!--- FIN MODAL --->
</template>

<script setup>
    import { onMounted,ref,defineProps,inject } from 'vue'
    import { useGlobalStore } from '@/store/global'
    import CerrarDocumentoService from '@/services/CerrarDocumentoService';
    import GuardarDocumentoService from '@/services/GuardarDocumentoService';
    import BorrarDocumentoService from '@/services/BorrarDocumentoService';
    import PedidosGuardadosService from '@/services/PedidosGuardadosService'
    import PedidosService from '@/services/PedidosService';

    const swal = inject('$swal')

    const store = useGlobalStore()
    const cerrardocumento = new CerrarDocumentoService()
    const documentoresp = cerrardocumento.getRespuesta()
    const pedidosservice = new PedidosService()

    const guardardocumento = new GuardarDocumentoService()
    const documentoguardadoresp = guardardocumento.getRespuesta()

    const borrarDocumento = new BorrarDocumentoService()
    const borrarDocumentoRes = borrarDocumento.getRespuesta()

    const pedidosguardos = new PedidosGuardadosService()

    const props = defineProps({
        codclie : String,
        descrip : String,
        reeditar : Number
    })

    const esonline = ref(false)
    const vendedor = ref('')
    const cliente = ref({})
    const pedidotemp = ref([])
    const comentario = ref('')
    const cantire = ref(0)
    const totalre = ref(0)
    const totalit = ref(0)
    const editaitem = ref({})
    const sincroniza = ref(false)

    onMounted( async ()=>{
        esonline.value =navigator.onLine
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(datoslocales){ 
            vendedor.value = datoslocales.spx_use_v
            comentario.value = JSON.parse(localStorage.getItem('spx_comentario'));
        }
        if(props.codclie!=0){
            cliente.value = {
                codclie : props.codclie,
                descrip : props.descrip
            }

            await getPedidotemp()
            
            for (let i = 0; i <= cantire.value-1; i++) {
                pedidotemp.value[i].codclie = cliente.value.codclie
                pedidotemp.value[i].cliente = cliente.value.descrip
            }
            localStorage.setItem('spx_pedido_esp',JSON.stringify(pedidotemp.value))
         }
         else{
            await getPedidotemp()
            if(cantire.value>0){
                cliente.value = {
                    codclie : pedidotemp.value[0].codclie,
                    descrip : pedidotemp.value[0].cliente
                }
            }
         }
         window.onpopstate = function() {
          if( window.location.hash == '#no-back-button' ){
            document.getElementById('cerrarModal').click();
          }
        }   
    })
  
    const getPedidotemp = ( async ()=>{
            pedidotemp.value = JSON.parse(localStorage.getItem('spx_pedido_esp'))
            if(pedidotemp.value){
                cantire.value = pedidotemp.value.length;
                await calculatotal()
            }
    })

    const calculatotal = ( async ()=>{
        totalre.value = 0
        totalit.value = 0
        pedidotemp.value.forEach((item)=>{
            totalit.value++;
            totalre.value += item.precio*item.cantidad;
        })
    })

    
    const borraoitem=( async (iditem)=>{
        pedidotemp.value.splice(iditem,1)
        localStorage.setItem('spx_pedido_esp',JSON.stringify(pedidotemp.value))
        cantire.value = pedidotemp.value.length
        await calculatotal()
    })

    const borrarPedido = (()=>{
        localStorage.removeItem('spx_pedido_esp')
        localStorage.setItem('spx_comentario',JSON.stringify(''))
        cantire.value = 0;
    })

    const datoscantidad = ((iditem,cantidad,descrip,precio)=>{
        window.location.hash="no-back-button";
        history.pushState( null , null, 'pedidoscliente#no-back-button');
        editaitem.value.iditem = iditem
        editaitem.value.cantidad = cantidad
        editaitem.value.descrip = descrip
        editaitem.value.precio = precio
    })

    const editarcantidad=( async ()=>{
        pedidotemp.value[editaitem.value.iditem].cantidad = editaitem.value.cantidad
        localStorage.setItem('spx_pedido_esp',JSON.stringify(pedidotemp.value))
        cantire.value = pedidotemp.value.length
        await calculatotal()
    })

    const totalizarpedido = ( async ()=>{
        if(totalre.value < 300){
            swal({
                icon: 'warning',
                title: 'Pedido Incompleto',
                text: 'El total del pedido debe ser mayor o igual a $300.00',
            })
            return
        }
        sincroniza.value = true
        await updateComentario()

        const pedido01 = pedidotemp.value.filter((pedido)=>{
                return pedido.deposito == "01"
        });        
        const pedido08 = pedidotemp.value.filter((pedido)=>{
                return pedido.deposito == "08"
        });
        const pedido91 = pedidotemp.value.filter((pedido)=>{
                return pedido.deposito == "91"
        });
        // manejo de 3 depositos 
        // await cerrardocumento.fetchCerrarDocumento(store.urlPpal,store.headRequest(),pedidotemp.value);
        if(pedido01.length>0){
            await cerrardocumento.fetchCerrarDocumento(store.urlPpal,store.headRequest(),pedido01);
        }
        if(pedido08.length>0){
            await cerrardocumento.fetchCerrarDocumento(store.urlPpal,store.headRequest(),pedido08);
        }
        if(pedido91.length>0){
            await cerrardocumento.fetchCerrarDocumento(store.urlPpal,store.headRequest(),pedido91);
        }
        if(documentoresp.value.response == 'ok'){
            localStorage.removeItem('spx_pedido_esp')
                pedidotemp.value = []
                cantire.value = 0;
                await pedidosservice.fetchPedidosPendientes(store.urlPpal,store.headRequest(),vendedor.value);
                if(props.reeditar!=0){
                    await borrarPedidoGuardado();
                }
                swal({
                    icon: 'success',
                    title: 'Pedido Enviado',
                    showConfirmButton: false,
                    timer: 1500 
            })
            // sendtelegram.fetchSendTelegram(store.urlPpal,store.headRequest(),vendedor.value,props.codclie+' - '+props.descrip);
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

    const updateComentario = ( async ()=>{
        pedidotemp.value.forEach((item)=>{
            item.comentario=comentario.value
        })
        localStorage.setItem('spx_comentario',JSON.stringify(''))
    })

    const actualizarComentario = (()=>{
        let temcomenta = comentario.value.toUpperCase()
        localStorage.setItem('spx_comentario',JSON.stringify(temcomenta))
        comentario.value = temcomenta
    })

    const guardarPedido = ( async ()=>{
        sincroniza.value = true
        await updateComentario()
        await guardardocumento.fetchGuardarDocumento(store.urlPpal,store.headRequest(),pedidotemp.value);
        if(documentoguardadoresp.value.response == 'ok'){
            localStorage.removeItem('spx_pedido_esp')
                pedidotemp.value = []
                cantire.value = 0;
                await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),vendedor.value);
                if(props.reeditar!=0){
                    await borrarPedidoGuardado()
                }
                swal({
                    icon: 'success',
                    title: 'Archivo Guardado',
                    showConfirmButton: false,
                    timer: 1500 
            })
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

    const borrarPedidoGuardado = ( async ()=>{
        await borrarDocumento.fetchBorrarDocumento(store.urlPpal,store.headRequest(),props.reeditar)
        if(borrarDocumentoRes.value.response == 'ok'){
            await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),vendedor.value);
        }
    })
</script>