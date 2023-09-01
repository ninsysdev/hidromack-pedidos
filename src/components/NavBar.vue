<template>
<!-- top navigation bar -->
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
        <!-- div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-lg" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><router-link to="/misdocumentos" class="dropdown-item"><i class="fa fa-truck"></i> Mis Pedidos</router-link></li>
            <div v-if="userlog">
              <a href="#" class="dropdown-item" @click="loguot()"><i class="fa fa-sign-out"></i> Cerrar Sesion</a>
            </div>
          </ul>
        </div -->
        <router-link class="btn btn-primary btn-lg" :to="{ name : 'home' }"><i class="bi bi-house-fill"></i></router-link>
        <router-link class="btn btn-primary btn-lg" :to="{ name : 'listaproductos' }"><i class="bi bi-file-earmark-fill"></i></router-link >
        <router-link class="btn btn-primary btn-lg" :to="{ name : 'pedidopendiente' , params : { codclie : 0, descrip : 0, reeditar : 0 } }"><i class="bi bi-cart-fill"></i></router-link>
        <router-link class="btn btn-primary btn-lg" :to="{ name : 'clientes' }"><i class="bi bi-people-fill"></i></router-link>
      </div>
</nav>
<!-- top navigation bar -->
</template>


