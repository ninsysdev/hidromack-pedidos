<template>
  <NavBar/>
  <Sidebar :loged="loged" :userl="userl" />
  <br><br><br>
  <router-view/>
</template>

<script setup>
  import { ref,onMounted } from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import Sidebar from '@/components/SideBar.vue';

  const loged = ref(false)
  const userl = ref('')
  onMounted( ()=>{
    let auth = JSON.parse(localStorage.getItem('spx_localdata'));
    if(auth){
        loged.value = true;
        userl.value = auth.spx_use_p;
    }
  })
</script>

<style>
.offline{
  background-color: darkgoldenrod;
  color: white;
  text-align: center;
}
.desborDato{
  background-color: rgb(1, 24, 66);
  color: white;
  text-align: center;
}
</style>