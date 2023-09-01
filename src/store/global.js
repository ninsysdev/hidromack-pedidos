import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('storePpal',{
    state : () =>{
        return {
            dev : 'http://localhost:8081/apihidromack/public/api/',
            urlPpal : 'https://apihidromack.geincca.com/api/',
            deposito : '800',
            ventasOficina : 'VEN000'
        }
    },
    actions : {
        headRequest () {
            let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
            var response = {
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': datoslocales.spx_tok_p,
                    'firm' : 'de73cceb749cd2321ac5c2f57a9433fe58d3ab25',
                    'applicant' : datoslocales.spx_nam_p
                }
            }
            return response
        },
    }
})