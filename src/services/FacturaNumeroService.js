import { ref } from "vue"

class FacturaNumeroService {
    constructor(){
        this.factura = ref([]);
    }
    getFactura(){
        return this.factura;
    }
    async fetchFacturas(urlPpal,headerdata,numero){
        try{
            const res = await fetch(urlPpal+'documento/facturanumero/'+numero,{
                method : 'GET',
                headers : headerdata.headers
            })
            let response = await res.json();
            this.factura.value = await response;
        }
        catch(error){
            console.log(error)
        }
    }
}
export default FacturaNumeroService