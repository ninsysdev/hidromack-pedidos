import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path : '/listaproductos',
    name : 'listaproductos',
    component: () => import(/* webpackChunkName: "listaproductos" */ '../views/ProductosView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/pedidopendiente/:codclie/:descrip/:reeditar',
    name : 'pedidopendiente',
    component: () => import(/* webpackChunkName: "pedidopendiente" */ '../views/PedidoPendienteView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/pedidoespecial/:codclie/:descrip/:reeditar',
    name : 'pedidoespecial',
    component: () => import(/* webpackChunkName: "pedidopendiente" */ '../views/PedidoEspecialView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/clientes',
    name : 'clientes',
    component: () => import(/* webpackChunkName: "clientes" */ '../views/ClientesView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/mispedidospendientes',
    name : 'mispedidospendientes',
    component: () => import(/* webpackChunkName: "mispedidos" */ '../views/MisPedidosPendientesView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/mispedidos',
    name : 'mispedidos',
    component: () => import(/* webpackChunkName: "mispedidos" */ '../views/MisPedidosView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/consultardocumento/:codigo/:guardado/:nomclie/:codclie/:totalmonto',
    name : 'consultardocumento',
    component: () => import(/* webpackChunkName: "consultardocumento" */ '../views/ConsultarDocumentoView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/miscuentasporcobrar',
    name : 'miscuentasporcobrar',
    component: () => import(/* webpackChunkName: "miscuentasporcobrar" */ '../views/MisCuentasView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/listaespecial',
    name : 'listaespecial',
    component: () => import(/* webpackChunkName: "listaproductos" */ '../views/ListaEspecialView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/vercatalogopdf',
    name : 'vercatalogopdf',
    component: () => import(/* webpackChunkName: "listaproductos" */ '../views/CatalogoPDFView.vue'),
    meta : {
      requireAuth : true
    }
  },
  {
    path : '/misventas',
    name : 'misventas',
    component: () => import(/* webpackChunkName: "misventas" */ '../views/MisVentasView.vue'),
    meta : {
      requireAuth : true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  const auth = localStorage.getItem('spx_localdata')
  const needAuth = to.meta.requireAuth
  if(needAuth && !auth){
    next('login')
  }
  else{
    next()
  }
})

export default router
