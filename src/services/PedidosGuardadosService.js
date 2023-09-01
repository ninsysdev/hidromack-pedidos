class PedidosGuardadosService {
    async fetchPedidosGuardados(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/guardados/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_orderssaved');
            localStorage.setItem('spx_orderssaved',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default PedidosGuardadosService