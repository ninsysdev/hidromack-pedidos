<template>
<nav :class="'navbar navbar-light bg-'+store.basecolor+' fixed-top'">
  <div class="container-fluid">
      <i 
          class="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="offcanvasExample"
        >
      <i class="bi bi-list" style="font-size:x-large;color: white;"></i>
      </i>
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'home' }"><i class="bi bi-house-fill"></i></router-link>
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'listaproductos' }"><i class="bi bi-1-square-fill"></i></router-link >
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'listaespecial' }"><i class="bi bi-2-square-fill"></i></router-link >
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'pedidopendiente' , params : { codclie : 0, descrip : 0, reeditar : 0 } }"><i class="bi bi-cart-fill"></i>1</router-link>
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'pedidoespecial' , params : { codclie : 0, descrip : 0, reeditar : 0 } }"><i class="bi bi-cart-fill"></i>2</router-link>
      <router-link :class="'btn btn-'+store.basecolor" :to="{ name : 'clientes' }"><i class="bi bi-people-fill"></i></router-link>
    </div>
</nav>
</template>
<script setup>
    import { useGlobalStore } from '@/store/global'; 
    const store = useGlobalStore();
</script>

