<template>
    <a href="#" @click="generarPDDF()" class="text-danger">{{ numeroFactura }}</a>
</template>

<script setup>
  import { defineProps } from 'vue'
  import jsPDF from 'jspdf'
  import { useGlobalStore } from '@/store/global';
  import FacturaNumeroService from '@/services/FacturaNumeroService'
  const store = useGlobalStore();
  const facturaserv = new FacturaNumeroService();
  const factura = facturaserv.getFactura();

  const props = defineProps({
        numeroFactura : String,
  })
    
  const generarPDDF = ( async ()=>{
          await facturaserv.fetchFacturas(store.urlPpal,store.headRequest(),props.numeroFactura);
         
          var doc = new jsPDF("p","mm","letter");
          let pagina = 1
          let reg = factura.value.length
          let linea = 51;
          // titulo
          doc.setFontSize(7);
          doc.text(180, 15, 'Pagina: '+pagina.toString());
          doc.setFontSize(11);
          doc.text(20, 20, 'SUPER HIDROMACK');
          doc.setFontSize(8);
          doc.text(20, 26,'Cliente: '+factura.value[0].Cliente);
          doc.setFont(undefined, 'bold')
          doc.text(120, 26,'DOCUMENTO: '+factura.value[0].NumeroD);
          doc.setFont(undefined, 'normal')
          doc.text(20, 30,'Codigo: '+factura.value[0].CodClie);
          doc.text(120, 30,'Emision: '+factura.value[0].Fechae);
          //doc.text(160, 30,'Vence: '+factura.value[0].vence);
          //doc.text(20, 34,'Domicilio: '+factura.value[0].direccion);
          doc.text(120, 34,'Vendedor: '+factura.value[0].CodVend);
          //doc.text(20, 38,'Telefonos: '+factura.value[0].telefonos);
          
          // encabezado
          doc.setFont(undefined, 'bold')
          doc.text('CODIGO',11, 45);
          doc.text('REFERENCIA',31, 45);
          doc.text('NOMBRE DEL ARTICULO',80, 45);
          doc.text('PRECIO',155, 45);
          doc.text('CANT',171, 45);
          doc.text('SUB-TOTAL',182, 45);
          doc.setFont(undefined, 'normal')
          doc.line(10, 47, 200, 47);
          // detalle         
          doc.setFontSize(6);
          for(let i=0;i<reg;i++){
            doc.text(11, linea, factura.value[i]['CodItem']);
            doc.text(30, linea, factura.value[i]['Refere']);
            doc.text(67, linea, factura.value[i]['Descrip'].substring(0,88));
            doc.text(formatoNumero(factura.value[i]['Precio']),165, linea,{ align: "right" });
            doc.text(formatoNumero(factura.value[i]['Cantidad']),177, linea,{ align: "right" });
            doc.text(formatoNumero(factura.value[i]['TotalItem']),197, linea,{ align: "right" });
            linea+=4
            if(linea >= 262){
              // nueva pagina
              doc.addPage();
              pagina++
              doc.text(180, 15, 'Pagina: '+pagina.toString());
              doc.setFontSize(8);
              doc.setFont(undefined, 'bold');
              doc.text('REFERENCIA',11, 45);
              doc.text('NOMBRE DEL ARTICULO',60, 45);
              doc.text('PRECIO',155, 45);
              doc.text('CANT',171, 45);
              doc.text('SUB-TOTAL',182, 45);
              doc.setFont(undefined, 'normal')
              doc.line(10, 47, 200, 47);   
              doc.setFontSize(6); 
              linea = 27
            } 
          } 
          doc.save('Documento_'+factura.value[0].NumeroD+'.pdf');
          //doc.output('dataurlnewwindow');
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