import { ref } from "vue"

class ConsultaVentasService {
    constructor(){
        this.factutas = ref([]);
    }
    getFacturas(){
        return this.factutas;
    }
    async fetchFacturas(urlPpal,headerdata,fechadesde,fechahasta,datofiltro,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/consultafacturas',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    fechadesde : fechadesde,
                    fechahasta : fechahasta+' 23:59:59',
                    datofiltro : datofiltro,
                    vendedor : vendedor
                })
            })
            let response = await res.json();
            this.factutas.value = await response;
        }
        catch(error){
            console.log(error)
        }
    }
}
export default ConsultaVentasService