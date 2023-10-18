<template>
    <div class="offline" v-if="!esonline">
       <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
    </div>
    <div class="container mt-10">
        <UltimasFacturas :ultfact="ultfact" :usuario="usuario" :vendedor="vendedor" :sincronizado="fechaRep"/>
    </div>
    <div @click="sincronizar()" v-if="!sincroniza" class="container mt-2 d-grid gap-2">
        <button class="btn btn-primary"> SINCRONIZAR AHORA</button>
    </div>
    <div v-if="sincroniza" class="d-grid gap-2 mt-2">
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            SINCRONIZANDO...
        </button>
    </div>
</template>

<script setup>
    import { onMounted,ref } from 'vue';
    import { useGlobalStore } from '@/store/global';
    import FechaReplicaService from '@/services/FechaReplicaService'
    import UltimasFacturasService from '@/services/UltimasFacturasService'
    import ProductosService from '@/services/ProductosService'
    import ClientesService from '@/services/ClientesService'
    import PedidosService from '@/services/PedidosService'
    import PedidosGuardadosService from '@/services/PedidosGuardadosService'
    import UltimosPedidos from '@/services/UltimosPedidos'

    const store = useGlobalStore()
    const fechaReplica = new FechaReplicaService()
    const fechaData = fechaReplica.getFechareplica() 
    
    const ultfacservice = new UltimasFacturasService()
    const productosservice = new ProductosService()
    const clientesservice = new ClientesService()
    const pedidosservice = new PedidosService()
    const pedidosguardos = new PedidosGuardadosService()
    const ultimospedidos = new UltimosPedidos()

    import UltimasFacturas from '@/components/UltimasFacturas.vue'

    const ultfact = ref([])
    let usuario = ref('')
    let vendedor = ref('')
    let fechaRep = ref('')
    let esonline = ref(false)
    let sincroniza = ref(false)

    onMounted( async ()=>{
        esonline.value=navigator.onLine
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(datoslocales){ 
            usuario.value = datoslocales.spx_use_p;
            vendedor.value = datoslocales.spx_use_v; 

            fechaRep.value = JSON.parse(localStorage.getItem('spx_fechareplica'));
            await fechaReplica.fetchFechaReplica(store.urlPpal,store.headRequest(),fechaRep.value)
            if(fechaData.value.updated=='1'){
                localStorage.removeItem('spx_fechareplica')
                localStorage.setItem('spx_fechareplica',JSON.stringify(fechaData.value.fechareplica.toString()))
                console.log('sincronizando')
                await sincronizar()
            }
            await actualizar()
        }
    })
    
    const sincronizar = ( async () =>{
        sincroniza.value = true
        await ultfacservice.fetchFacturas(store.urlPpal,store.headRequest(),vendedor.value);
        await productosservice.fetchProductos(store.urlPpal,store.headRequest());
        await clientesservice.fetchClientes(store.urlPpal,store.headRequest(),vendedor.value);
        await pedidosservice.fetchPedidosPendientes(store.urlPpal,store.headRequest(),vendedor.value);
        await pedidosguardos.fetchPedidosGuardados(store.urlPpal,store.headRequest(),vendedor.value);
        await ultimospedidos.fetchPedidos(store.urlPpal,store.headRequest(),vendedor.value);
        fechaRep.value = fechaData.value.fechareplica.toString()
        sincroniza.value = false
    })

    const actualizar = ( async ()=>{
        ultfact.value = JSON.parse(localStorage.getItem('spx_lastdoc'));
    })
</script>
