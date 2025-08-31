import { ref } from 'vue'

class ConsultaFacturaService {
     
    constructor(){
        this.factura = ref([])
    }

    getFactura(){
        return this.factura
    }

    async fetchFactura(urlPpal,headerdata,numerofac){
        try{
            const res = await fetch(urlPpal+'consultafactura/'+numerofac,{
                method : 'GET',
                headers : headerdata.headers
            })
            let response = await res.json()
            this.factura.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default ConsultaFacturaService