import { ref } from "vue"

class FechaReplicaService {
    constructor(){
        this.respuesta = ref({})
    }

    getFechareplica(){
        return this.respuesta
    }
    async fetchFechaReplica(urlPpal,headerdata,fecha){
        try{
            const res = await fetch(urlPpal+'configurador/loaddate',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    fechaapp : fecha
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

export default FechaReplicaService