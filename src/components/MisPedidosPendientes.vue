<template>
    <main>
      <div class="offline" v-if="!esonline">
            <i class="fa fa-exclamation-triangle"></i> Sin conexion a internet...
      </div>
      <div class="container mt-3">
          <i class="bi bi-cloud-fill"></i> - ARCHIVOS GUARDADOS
          <ul class="list-group">
            <li v-for="documentg in documentosGua" :key="documentg.codigo" class="list-group-item d-flex justify-content-between align-items-center">
              <router-link style="font-size: smaller; text-decoration: none;" :to="{name:'consultardocumento',params:{
                        codigo : documentg.codigo,
                        codclie : documentg.codclie,
                        guardado : 1,
                        nomclie : documentg.Descrip,
                        totalmonto : documentg.tot_monto
                      }
                }">{{ documentg.Descrip }}<br> {{ documentg.codigo }} - {{  documentg.created_at }}
              </router-link><span class="badge bg-primary rounded-pill">{{ filters.formatNum(documentg.tot_monto) }}</span>
            </li>
          </ul>
      </div>
    </main>
    </template>
    
    <script setup>
        import { onMounted,ref } from 'vue';
        const esonline = ref(false)
        const vendedor = ref('')
        const documentosGua = ref([])
    
        onMounted( async ()=>{
            esonline.value = window.navigator.onLine
            vendedor.value = localStorage.getItem('spx_use_v')
            await documentosGuardados()
        })

        const documentosGuardados = ( async ()=>{
            documentosGua.value=JSON.parse(localStorage.getItem('spx_orderssaved'));
        })
    </script>