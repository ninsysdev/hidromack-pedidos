class ClientesService {
    async fetchClientes(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'clientesvendedor/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_clientlist');
            localStorage.setItem('spx_clientlist',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default ClientesService