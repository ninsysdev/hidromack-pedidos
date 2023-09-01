<template>
    <main>
      <div class="offline" v-if="!esonline">
        <i class="fa fa-exclamation-triangle"></i> Sin conexion a internet...
      </div>
      <div class="container mt-3">
          <i class="bi bi-send-fill"></i> - PEDIDOS ENVIADOS
          <ul  class="list-group">
            <li  v-for="documento in documentosEnv" :key="documento.codigo" class="list-group-item d-flex justify-content-between align-items-center bg-light">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'consultardocumento',params:{
                        codigo : documento.codigo,
                        codclie : documento.codclie,
                        guardado : 0,
                        nomclie : documento.Descrip,
                        totalmonto : documento.tot_monto
                      }
                      }"> 
                    {{ documento.Descrip }}<br><i class="bi bi-flag-fill"></i> - {{ documento.codigo }} - {{  documento.created_at }}
                </router-link><span class="badge bg-primary rounded-pill">{{ filters.formatNum(documento.tot_monto) }}</span> 
              </li >
            <li v-for="docurec in documentosRec" :key="docurec.codigo" class="list-group-item d-flex justify-content-between align-items-center bg-light">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'consultardocumento',params:{
                        codigo : docurec.codigo,
                        codclie : docurec.codclie,
                        guardado : 0,
                        nomclie : docurec.Descrip,
                        totalmonto : docurec.tot_monto
                      }
                      }"> 
                    {{ docurec.Descrip }}<br>{{ docurec.codigo }} - {{  docurec.created_at }}
                </router-link> <span class="badge bg-primary rounded-pill">{{ filters.formatNum(docurec.tot_monto) }}</span> 
              </li >
            </ul >
      </div>
    </main>
    </template>
    
    <script setup>
        import { onMounted,ref } from 'vue';
        const esonline = ref(false)
        const vendedor = ref('')
        const documentosEnv = ref([])
        const documentosRec = ref([])
    
        onMounted( async ()=>{
            esonline.value = window.navigator.onLine
            vendedor.value = localStorage.getItem('spx_use_v')
            await documentosEnviados()
            await documentosRecibidos()
        })

        const documentosEnviados = ( async ()=>{
            documentosEnv.value=JSON.parse(localStorage.getItem('spx_orderslist'));
        })

        const documentosRecibidos = ( async ()=>{
            documentosRec.value=JSON.parse(localStorage.getItem('spx_lastreq'));
        })
    </script>