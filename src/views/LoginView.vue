<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="row">
                            <div class="col-lg-12">
                                <div v-if="esonline" class="p-5">
                                  <main class="animate__animated animate__fadeInDown">
                                    <div class="text-center mt-3"><img src="../assets/spx.png" alt="spx"></div>
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Pedidos</h1>
                                    </div>
                                  </main>
                                    <main class="animate__animated animate__backInUp">
                                    <form class="user" @submit.prevent="authUser"> 
                                      <div class="form-floating mb-3">
                                        <input v-model="usuario" type="text" class="form-control" id="floatingInput" placeholder="USUARIO SAINT" maxlength="10" required>
                                        <label for="floatingInput">Usuario</label>
                                      </div>
                                      <div class="form-floating mb-3">
                                        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                                        <label for="floatingPassword">Password</label>
                                      </div>   
                                      <div class="form-floating d-grid gap-2">
                                         <button type="submit" class="btn btn-primary btn-user btn-block">INGRESAR</button>
                                      </div>
                                      <hr>
                                    </form>
                                    <div class="text-center">
                                        <a href="#">Solicitar Registro</a>
                                    </div>
                                    <div class="text-center">
                                        <i class="small" href="#">ninsistemas@hotmail.com</i>
                                    </div>
                                    </main>
                                </div>
                                <div v-else class="alert alert-secondary" style="text-align: center;">
                                  <hr><br>
                                  <div style="background-color: darkgoldenrod; color: white;" v-if="!esonline" class="text-center">
                                    <i class="fa fa-exclamation-triangle">
                                    </i> Sin conexion a internet...
                                  </div>
                                  <div>
                                    <i class="fa fa-user-times"></i> Para aperturar la sesion la aplicacion debe estar OnLine
                                  </div>
                                </div>
                            </div>
                        </div>
  
            </div>
        </div>
    </div>
</template>    
<script setup>
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '@/store/global'
    import { onMounted,ref } from 'vue';     
    import LoginService from '@/services/LoginService'

    const router = useRouter()
    const store = useGlobalStore()
    const datalogin = new LoginService()
    const responselogin = datalogin.getRespuesta()
    
    const esonline = ref(false)
    const usuario = ref('')
    const password = ref('')

    onMounted( ()=>{
          esonline.value=navigator.onLine
    })
        
    const authUser = async () => {
        await datalogin.fetchUserLogin(store.urlPpal,usuario.value,password.value)
        if(responselogin.value.response == 'ok'){
            let spx_localdata = {
                spx_tok_p : responselogin.value.token,
                spx_nam_p : responselogin.value.usuario,
                spx_use_p : responselogin.value.nombre,
                spx_use_v : responselogin.value.codvend,
            }  
            let spx_factorbcv = 0;
            let spx_comentario = '';
            let spx_fechareplica = '2000-01-01 00:00:00';
            localStorage.setItem('spx_localdata',JSON.stringify(spx_localdata)) 
            localStorage.setItem('spx_factorbcv',JSON.stringify(spx_factorbcv))
            localStorage.setItem('spx_fechareplica',JSON.stringify(spx_fechareplica))
            localStorage.setItem('spx_comentario',JSON.stringify(spx_comentario))
             await router.push('/')
             location.reload()
        }
        else{
            console.log('trash')
        }
    } 
</script>
  
<style scoped>
  body {
    align-items: center;
    background-color: #f5f5f5;
  }
  
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  
  .form-signin .form-floating:focus-within {
    z-index: 2;
  }
  
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  </style>