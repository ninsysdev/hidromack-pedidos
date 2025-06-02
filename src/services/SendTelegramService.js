class SendTelegramService {
    async fetchSendTelegram(urlPpal,headerdata,vendedor,mensaje){
        try{
             await fetch(urlPpal+'telegram/send',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    name : vendedor,
                    message : mensaje
                })
            })
            //let response = await res.json()

        }
        catch(error){
            console.log(error)
        }
    }
}

export default SendTelegramService