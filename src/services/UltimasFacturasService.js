class UltimasFacturasService {
    async fetchFacturas(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/ultimasfactgen/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_lastdoc');
            localStorage.setItem('spx_lastdoc',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default UltimasFacturasService