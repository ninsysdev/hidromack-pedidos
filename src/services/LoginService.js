import { ref } from "vue";

class LoginService {
    constructor(){
        this.respuesta = ref('')
    }

    getRespuesta(){
        return this.respuesta
    }

    async fetchUserLogin(urlPpal,user,pass){
        try{
            const res = await fetch(urlPpal+'nrsrclassl',{
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    usuario : user,
                    password : pass
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

export default LoginService