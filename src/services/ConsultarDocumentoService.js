import { ref } from "vue";

class ConsultarDocumentoService {
        
        constructor(){
            this.documento = ref([])
        }

        getDocumento(){
            return this.documento
        }

        async fetchConsultarDocumento(urlPpal,headerdata,codigo){
            try{
                const res = await fetch(urlPpal+'documento/codigo/'+codigo,{
                    method : 'GET',
                    headers : headerdata.headers
                })

                let response = await res.json()
                this.documento.value = await response
            }
            catch(error){
                console.log(error)
            }
        }

        async fetchConsultarDocumentoGuardado(urlPpal,headerdata,codigo){
            try{
                const res = await fetch(urlPpal+'documentoguardado/codigo/'+codigo,{
                    method : 'GET',
                    headers : headerdata.headers
                })

                let response = await res.json()
                this.documento.value = await response
            }
            catch(error){
                console.log(error)
            }
        }
}

export default ConsultarDocumentoService