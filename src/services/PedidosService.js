class PedidosService {
    async fetchPedidosPendientes(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/pendientes/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_orderslist');
            localStorage.setItem('spx_orderslist',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default PedidosService