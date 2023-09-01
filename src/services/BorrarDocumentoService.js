import { ref } from "vue";

class BorrarDocumentoService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getRespuesta(){
            return this.respuesta
        }

        async fetchBorrarDocumento(urlPpal,headerdata,codigo){
            try{
                const res = await fetch(urlPpal+'documento/borrarguardado',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        codigo : codigo
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

export default BorrarDocumentoService