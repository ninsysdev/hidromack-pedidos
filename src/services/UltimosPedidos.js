class UltimosPedidosService {
    async fetchPedidos(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/ultimospedgen/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_lastreq');
            localStorage.setItem('spx_lastreq',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default UltimosPedidosService