<template>
      <div class="offline" v-if="!esonline">
        <i class="bi bi-exclamation-circle"></i> Sin conexion a internet...
      </div>
      <div class="container">
        <div class="input-group">
          <div class="col-6">
            <h5 style="margin-top: 4px;">LISTA DE PRECIOS</h5>
          </div>
          <div class="col-6" style="text-align: right; margin-top: 3px;">
            <download-excel
                class="btn btn-sm btn-success"
                :data="todosProductos"
                worksheet="My Worksheet"
                name="Lista_Precios_HidroMack.xls"
              >
              <i class="bi bi-file-earmark-excel-fill" style="color: white;"></i>
              </download-excel>
              <i style="color: white;">|</i> 
              <button @click="generarPDDF()" class="btn btn-sm btn-danger" ><i class="bi bi-file-earmark-pdf-fill" style="color: white;"></i></button>
          </div>
        </div>
        <div class="input-group p-2">
            <input v-model="datoabuscar" type="text" name="campobuscar" id="campobuscar" class="form-control bg-light border-0 small" placeholder="Datos a buscar"
                aria-label="Search" aria-describedby="basic-addon2" onfocus="this.select();">  
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="listaProductos(tipobus)">
                    <i class="bi bi-binoculars-fill"></i>
                </button>
            </div>
      </div>
      <div class="desborDato mb-2" v-if="cantidadPaginas > 2">
           Demasiados datos en el resultado
      </div>
      <div class="btn-group" role="group" aria-label="Basic radio">
        <input @click="parametroBusqueda(1)" type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio1">Des</label>

        <input @click="parametroBusqueda(2)" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked>
        <label class="btn btn-outline-primary" for="btnradio2">Cod</label>

        <input @click="parametroBusqueda(3)" type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio3">Ref</label>

        <input @click="parametroBusqueda(4)" type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio4">Mac</label>
      </div>
      <div class="mt-2">
        <div v-for="producto in datosPaginados" :key="producto.codprod" class="card mb-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                            <div class="col">
                                <div class="text-primary"><b>{{ producto.Descrip }}</b> </div>
                                <div class="text-dark">{{ producto.CodProd }} - {{ producto.Refere }} - {{ producto.Marca }}</div>
                                <div class="row">
                                  <div class="col-6">
                                  <div>Cant: {{producto.Exinten }}</div>
                                  </div>
                                  <div class="col-6">
                                    <div v-if="tienepedido(producto.CodProd)>0" style="text-align: right;" class="text-secondary-emphasis"> <i class="bi bi-cart-fill"></i> - {{ tienepedido(producto.CodProd) }}</div>
                                  </div>
                                </div>
                                <div class="row">
                                <div class="col-6">
                                <h1 style="color: orangered;"><b>{{ parseFloat(producto.Precio) }} $</b></h1>
                              </div>
                                <div class="col-6 " style="text-align: right;">
                                <h1 class="text-primary" @click="editarPedido(producto)"  type="button" data-bs-toggle="modal" data-bs-target="#ModalActivos"><i class="bi bi-eye-fill"></i></h1>
                              </div>
                              </div>
                            </div>
                          </div>
                      </div>
                      </div>
                  </div>  
          <nav v-if="cantidadPaginas > 1 && cantidadPaginas <= 2" aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" @click="getPaginaPrevia()"><i class="fa  fa-chevron-circle-left"></i></a></li>
              <li v-for="pagina in  totalPaginas()" :key="pagina" class="page-item" :class="esActiva(pagina)"><a class="page-link" @click="getDataPagina(pagina)" >{{ pagina }}</a></li>
              <li class="page-item"><a class="page-link" @click="getPaginaProxima()"><i class="fa  fa-chevron-circle-right"></i></a></li>
            </ul>
          </nav>
        </div>
        <!-- Modal -->
        <div class="modal fade modal-fullscreen" id="ModalActivos" tabindex="-1" aria-labelledby="ModalActivosLabel" aria-hidden="true">
          <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-body text-center">
                      <div v-if="tieneImagen">
                        <div id="carouselExampleControls" class="carousel carousel-dark" data-bs-ride="carousel" data-bs-interval="20000">
                            <div v-for="imagen,index in datosImagen" :key="index" class="carousel-inner">
                              <div v-if="index==0" class="carousel-item active">
                                <img :src="'img/'+imagen.file" alt="...">
                              </div>
                              <div v-else class="carousel-item">
                                <img :src="'img/'+imagen.file" alt="...">
                              </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                      </div>
                      <div v-else>
                        <img  src="img/icons/apple-touch-icon-180x180.png"  alt="..." />
                      </div>
                      
                      <div class="text-primary">{{ datospedido.Descrip }}</div>
                      <div class="text-secondary">{{ datospedido.CodProd }} - {{ datospedido.Refere }} - {{ datospedido.Marca }}</div>
                      <h1 style="color: orangered;"><b>{{ parseFloat(datospedido.Precio) }} $</b></h1>
                      <div class="form-floating mt-2 mb-1">
                        <input v-model="cantidad" type="number" content="width=device-width" class="form-control" id="floatingInput" placeholder="CANTIDAD" required>
                        <label for="floatingInput">Cantidad</label>
                      </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="nuevodoPedido()"  type="button" class="btn btn-primary" data-bs-dismiss="modal">Agregar</button>
                        <button onclick="document.getElementById('campobuscar').focus();" type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cerrarModal">Cancelar</button>
                    </div>
                    </div>
          </div>
        </div>
        <!--- FIN MODAL --->
</template>

<script setup>
    import { onMounted,ref,inject } from 'vue'
    import jsPDF from 'jspdf'
    
    const swal = inject('$swal')
    
    const esonline = ref(false)
    const datoabuscar = ref('')
    const todosProductos = ref([])
    const productos = ref([])
    let elementosPorPagina = 5
    const cantidadPaginas = ref(0)
    const datosPaginados = ref([])
    const paginaActual = ref(1)
    const datospedido = ref({})
    const tieneImagen = ref(false)
    const datosImagen = ref([])
    const pedidotemp = ref([])
    const cantidad = ref(null)
    const cantire = ref(0)
    const codvend = ref(null)
    const tipobus = ref(2)

    onMounted(() => {
        esonline.value=navigator.onLine
        todosProductos.value = JSON.parse(localStorage.getItem('spx_priceslist'));
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        codvend.value = datoslocales.spx_use_v;
        let pedidotemporal = JSON.parse(localStorage.getItem('spx_pedidotemp'));  
        if(pedidotemporal){ 
          pedidotemp.value = JSON.parse(localStorage.getItem('spx_pedidotemp'))  
          cantire.value = pedidotemp.value.length
        }
        window.onpopstate = function() {
          if( window.location.hash == '#no-back-button' ){
            document.getElementById('cerrarModal').click();
          }
        }
      })

      const listaProductos = ( async (tipo)=>{   
        if(datoabuscar.value != ''){
            if(tipo==1){
              let porciones = datoabuscar.value.split('*');
              let cantidatos = porciones.length
              productos.value = todosProductos.value.filter(producto => producto.Descrip.toLowerCase().includes(porciones[0].toLowerCase()))
              if (cantidatos>1){
                for(var i = 1; i < cantidatos;i++){
                  productos.value = productos.value.filter(producto => producto.Descrip.toLowerCase().includes(porciones[i].toLowerCase()))
                }
              }          
            }
            else if(tipo==2){
              productos.value = todosProductos.value.filter(producto => producto.CodProd.toLowerCase().includes(datoabuscar.value.toLowerCase()))
            }
            else if(tipo==3){
              productos.value = todosProductos.value.filter(producto => producto.Refere.toLowerCase().includes(datoabuscar.value.toLowerCase()))
            }
            else{
              productos.value = todosProductos.value.filter(producto => producto.Marca.toLowerCase().includes(datoabuscar.value.toLowerCase()))
            }
            cantidadPaginas.value = await totalPaginas()
            if(cantidadPaginas.value>2){
              swal("Demasiados datos en el resultado, optimiza tu busqueda, solo se mostraran 5 registros");
            }
            await getDataPagina(1)
          }
          else{
            productos.value = [];
            cantidadPaginas.value = 0
            datosPaginados.value = []
          }

     })
    
    const totalPaginas = ( async ()=>{
          return Math.ceil(productos.value.length / elementosPorPagina)
    })
    
    const getDataPagina = ( async (noPagina)=>{
        paginaActual.value = noPagina;
        datosPaginados.value = [];
        let ini = (noPagina*elementosPorPagina) - elementosPorPagina
        let fin = (noPagina*elementosPorPagina)
        datosPaginados.value = productos.value.slice(ini,fin);
    })

    const getPaginaPrevia = ( async ()=> {
      if(paginaActual.value>1){
        paginaActual.value--
      }
      await getDataPagina(paginaActual)
    })
    
    const getPaginaProxima = ( async ()=>{
      if(paginaActual.value<totalPaginas.value()){
        paginaActual.value++
      }
      await getDataPagina(paginaActual.value)
    })

    function esActiva(noPagina){
      return noPagina ==  paginaActual.value ? 'active' : '';
    }

    function nuevodoPedido(){
      if(parseInt(cantidad.value) <= parseInt(datospedido.value.Exinten)){
          pedidotemp.value.push({
              codvend : codvend.value,
              codclie : '',
              cliente : '',
              codprod : datospedido.value.CodProd,
              descrip : datospedido.value.Descrip,
              cantidad : cantidad.value,
              precio : datospedido.value.Precio,
              comentario : '', //comentario.value,
              conexion : '', //conexion.value,
              deposito : datospedido.value.Deposito 
          })
          localStorage.setItem('spx_pedidotemp',JSON.stringify(pedidotemp.value))
          cantire.value = pedidotemp.value.length
        }
        else{
          swal("La cantidad es superior a la existencia");
        }
          document.getElementById("campobuscar").focus();
    }
        
    function editarPedido(producto){
          window.location.hash="no-back-button";
          history.pushState( null , null, 'listaproductos#no-back-button');
          cantidad.value = null
          datospedido.value = producto;
          if(producto.img){
            tieneImagen.value = true;
            datosImagen.value = producto.img;
          }
          else{
            tieneImagen.value = false;
            datosImagen.value = []
          }
        
    }
    function tienepedido(codigo){
          let cantidadpedida = 0
          if(cantire.value>0){
            //console.log(codigo)
            for (let i =0 ; i<=cantire.value-1; i++){
              //console.log(this.pedidotemp[i].codprod)
              if(pedidotemp.value[i].codprod == codigo){
                cantidadpedida=cantidadpedida+Number(pedidotemp.value[i].cantidad)
              }
            }
          }
          return cantidadpedida
    }

    function parametroBusqueda(tipo){
            tipobus.value = tipo;
            listaProductos(tipo);
        
    }
    
    const generarPDDF = (()=>{
          var doc = new jsPDF("p","mm","letter");
          let pagina = 1
          let reg = todosProductos.value.length
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
            doc.text(11, linea, todosProductos.value[i]['CodProd']);
            doc.text(22, linea, todosProductos.value[i]['Refere']);
            doc.text(45, linea, todosProductos.value[i]['Descrip']);
            doc.text(120, linea, todosProductos.value[i]['Marca']);
            doc.text( parseInt(todosProductos.value[i]['Exinten'],10).toString(),162, linea,{ align: "right" });
            doc.text(170, linea, todosProductos.value[i]['Unidad']);
            //doc.text(180, linea, this.todosProductos[0]['Precio'],{align: 'right'});
            doc.text(todosProductos.value[i]['Precio'], 195, linea, { align: "right" });
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
  