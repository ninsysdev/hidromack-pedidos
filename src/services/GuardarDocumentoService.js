import { ref } from "vue";

class GuardarDocumentoService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getRespuesta(){
            return this.respuesta
        }

        async fetchGuardarDocumento(urlPpal,headerdata,pedidotemp){
            try{
                const res = await fetch(urlPpal+'documento/guardardocumento',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        documento : pedidotemp
                    })
                })

                let response = await res.json()
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
        }
}

export default GuardarDocumentoService