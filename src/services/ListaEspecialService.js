class ListaEspecialService {
    async fetchListaEspecial(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'listaespecial',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_speciallist');
            localStorage.setItem('spx_speciallist',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default ListaEspecialService