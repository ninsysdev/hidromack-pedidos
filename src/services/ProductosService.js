class ProductosService {
    async fetchProductos(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'exproductos',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            localStorage.removeItem('spx_priceslist');
            localStorage.setItem('spx_priceslist',JSON.stringify(response))
        }
        catch(error){
            console.log(error)
        }
    }
}

export default ProductosService