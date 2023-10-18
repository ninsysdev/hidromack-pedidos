<template>
<nav class="navbar navbar-light bg-primary fixed-top">
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
      <router-link class="btn btn-primary btn-lg" :to="{ name : 'home' }"><i class="bi bi-house-fill"></i></router-link>
      <router-link class="btn btn-primary btn-lg" :to="{ name : 'listaproductos' }"><i class="bi bi-file-earmark-fill"></i></router-link >
      <router-link class="btn btn-primary btn-lg" :to="{ name : 'pedidopendiente' , params : { codclie : 0, descrip : 0, reeditar : 0 } }"><i class="bi bi-cart-fill"></i></router-link>
      <router-link class="btn btn-primary btn-lg" :to="{ name : 'clientes' }"><i class="bi bi-people-fill"></i></router-link>
    </div>
</nav>
</template>

