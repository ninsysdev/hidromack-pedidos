<template>
    <button @click="generarPDDF()" class="btn btn-sm btn-danger" ><i class="bi bi-file-earmark-pdf-fill" style="color: white;"></i></button>
</template>

<script setup>
    import { defineProps } from 'vue'
    import jsPDF from 'jspdf'

    const props = defineProps({
        todosProductos : Array
    })
    
    const generarPDDF = (()=>{
        var doc = new jsPDF("p","mm","letter");
        let pagina = 1
        let reg = props.todosProductos.length
        let linea = 52;
        // titulo
        doc.setFontSize(7);
        doc.text(190, 15, 'Pagina: '+pagina.toString());
        doc.setFontSize(11);
        doc.text(20, 20, 'SUPER HIDROMACK, C.A.');
        doc.text(20, 25, 'Rif: J-50230928-4');
        doc.text(85, 30,'LISTA DE PRECIOS');
        doc.text(85, 35,'POR  DESCRIPCION');
        // encabezado
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold')
        doc.text('CODIGO',11, 45);
        doc.text('REFERENCIA',25, 45);
        doc.text('DESCRIPCION',48, 45);
        doc.text('MARCA',120, 45);
        doc.text('EXIST',155, 45);
        doc.text('UNIDAD',168, 45);
        doc.text('PRECIO',185, 45);
        doc.setFont(undefined, 'normal')
        doc.line(10, 47, 200, 47);
        // detalle         
        doc.setFontSize(7);
        for(let i=0;i<reg;i++){
          doc.text(11, linea, props.todosProductos[i]['CodProd']);
          doc.text(22, linea, props.todosProductos[i]['Refere']);
          doc.text(45, linea, props.todosProductos[i]['Descrip']);
          doc.text(120, linea, props.todosProductos[i]['Marca']);
          doc.text( parseInt( props.todosProductos[i]['Exinten'],10).toString(),162, linea,{ align: "right" });
          doc.text(170, linea, props.todosProductos[i]['Unidad']);
          //doc.text(180, linea, this.todosProductos[0]['Precio'],{align: 'right'});
          doc.text( props.todosProductos[i]['Precio'], 195, linea, { align: "right" });
          if (props.todosProductos[i]['Descrip2'] != ""){
            linea+=3
            doc.text(45, linea, props.todosProductos[i]['Descrip2']);
          }
          linea+=2
          doc.line(10, linea, 200, linea);
          linea+=4
          if(linea >= 262){
            // nueva pagina
            doc.addPage();
            pagina++
            doc.text(190, 15, 'Pagina: '+pagina.toString());
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold')
            doc.text('CODIGO',11, 20);
            doc.text('REFERENCIA',25, 20);
            doc.text('DESCRIPCION',48, 20);
            doc.text('MARCA',120, 20);
            doc.text('EXIST',155, 20);
            doc.text('UNIDAD',168, 20);
            doc.text('PRECIO',185, 20);
            doc.setFont(undefined, 'normal')
            doc.line(10, 22, 200, 22);   
            doc.setFontSize(7); 
            linea = 27
          } 
        }
        //
        //const docHeight = doc.internal.pageSize.getHeight();
        //
        //doc.text('Precio', docWidth - 20, 45, { align: "right" });
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');

        doc.save('Lista_Precios.pdf');
      })
</script>