<template>
  <ul class="list-group list-group-flush">
    <ul class="list-group list-group-flush">
          <li class="list-group-item" style="color: darkslategray;font-size: medium;"><i class="bi bi-person-circle"></i> - {{ usuario }} - {{ vendedor }}</li>
          <li class="list-group-item" style="color: darkslategray;font-size: medium;"><i class="bi bi-cloud-download-fill"></i> - SINCRONIZADO : {{ sincronizado.substring(8,10) }}-{{ sincronizado.substring(5,7) }}-{{ sincronizado.substring(0,4) }} {{ sincronizado.substring(11,19) }} </li>
    </ul>
    <li v-for="fact in ultfact" :key="fact.NroUnico"  :class="'list-group-item list-group-item-'+store.basecolor+' d-flex justify-content-between align-items-center'">
        {{ fact.Descrip }} <br> {{ fact.NumeroD }} | {{ fact.FechaE }}
        <span :class="'badge bg-'+store.basecolor+' rounded-pill'">{{ fact.Saldo }}</span>
    </li>
  </ul>
</template>

<script setup>
    import { defineProps } from 'vue';
    import { useGlobalStore } from '@/store/global'; 
    const store = useGlobalStore();
    defineProps({
        ultfact : [],
        usuario : String,
        vendedor : String,
        sincronizado : String
    })
</script>