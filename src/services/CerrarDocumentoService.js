import { ref } from "vue";

class CerrarDocumentoService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getRespuesta(){
            return this.respuesta
        }

        async fetchCerrarDocumento(urlPpal,headerdata,pedidotemp){
            try{
                const res = await fetch(urlPpal+'documento/cerrardocumento',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        documento : pedidotemp
                    })
                })

                let response = await res.json()
                this.respuesta.value = await response
                console.log(this.respuesta.value)
            }
            catch(error){
                console.log(error)
            }
        }
}

export default CerrarDocumentoService