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
              </router-link>
              <span :class="'badge bg-'+store.basecolor+' rounded-pill'">{{ filters.formatNum(documentg.tot_monto) }}</span> -  
              <button @click="documentoPDF(
                documentg.codigo,
                documentg.tot_monto,
                documentg.Descrip)" class="btn btn-sm btn-danger" ><i class="bi bi-file-earmark-pdf-fill" style="color: white;"></i></button>
            </li>
          </ul>
      </div>
    </main>
    </template>
    
    <script setup>
        import { onMounted,ref } from 'vue';
        import { useGlobalStore } from '@/store/global';
        import jsPDF from 'jspdf'
        import consultardocumentoService from '@/services/ConsultarDocumentoService'

        const consultarDocumento = new consultardocumentoService()
        const documentoData = consultarDocumento.getDocumento()

        const store = useGlobalStore()
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
        const documentoPDF = ( async (codigo,totaldoc,cliente)=>{
          await consultarDocumento.fetchConsultarDocumentoGuardado(store.urlPpal,store.headRequest(),codigo)
          await generarPDDF(cliente,totaldoc)
        })

        const generarPDDF = ( async (cliente,totaldoc)=>{
          var doc = new jsPDF("p","mm","letter");
          let pagina = 1
          let reg = documentoData.value.length
          let linea = 52;
          // titulo
          doc.setFontSize(7);
          doc.text(190, 15, 'Pagina: '+pagina.toString());
          doc.setFontSize(11);
          doc.text(20, 20, 'SUPER HIDROMACK, C.A.');
          doc.setFontSize(8);
          doc.text(20, 28,'DOCUMENTO Nro: '+documentoData.value[0].codigo);
          doc.text(20, 33,'CLIENTE: '+documentoData.value[0].codclie+' - '+cliente);
          doc.text(20, 38,'FECHA: '+documentoData.value[0].created_at);
          // encabezado
          doc.setFont(undefined, 'bold')
          doc.text('DESCRIPCION',15, 45);
          doc.text('CANTIDAD',110, 45);
          doc.text('PRECIO',140, 45);
          doc.text('SUB-TOTAL',170, 45);
          doc.setFont(undefined, 'normal')
          doc.line(10, 47, 200, 47);
          // detalle         
          doc.setFontSize(7);
          for(let i=0;i<reg;i++){
            doc.text(11, linea, documentoData.value[i]['codprod']);
            doc.text(22, linea, documentoData.value[i]['descrip']);
            doc.text(formatoNumero(documentoData.value[i]['cantidad']),120, linea,{ align: "right" });
            doc.text(formatoNumero(documentoData.value[i]['precio']),150, linea,{ align: "right" });
            doc.text(formatoNumero(documentoData.value[i]['totalitem']),185, linea,{ align: "right" });
            linea+=2
            doc.line(10, linea, 200, linea);
            linea+=4
            if(linea >= 262){
              // nueva pagina
              doc.addPage();
              pagina++
              doc.text(190, 15, 'Pagina: '+pagina.toString());
              doc.setFontSize(8);
              doc.setFont(undefined, 'bold');
              doc.setFont(undefined, 'bold');
              doc.text('DESCRIPCION',15, 45);
              doc.text('CANTIDAD',110, 45);
              doc.text('PRECIO',140, 45);
              doc.text('SUB-TOTAL',170, 45);
              doc.setFont(undefined, 'normal')
              doc.line(10, 47, 200, 47);   
              doc.setFontSize(7); 
              linea = 27
            } 
          }
          doc.line(10, 47, 200, 47);
          doc.text('TOTAL DOCUMENTO: ',125, linea);
          doc.text(formatoNumero(totaldoc),185, linea,{ align: "right" });
          doc.save('Documento_'+documentoData.value[0].codigo+'.pdf');
      })
      const formatoNumero = (n, d=2) => {
          n=new Intl.NumberFormat("es-ES").format(parseFloat(n).toFixed(d))
          if (d>0) {
              // Obtenemos la cantidad de decimales que tiene el numero
              const decimals=n.indexOf(",")>-1 ? n.length-1-n.indexOf(",") : 0;
              // añadimos los ceros necesios al numero
              n = (decimals==0) ? n+","+"0".repeat(d) : n+"0".repeat(d-decimals);
          }
          return n;

      }
    </script>