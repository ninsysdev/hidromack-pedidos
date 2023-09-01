<template>
  <ul class="list-group list-group-flush">
    <ul class="list-group list-group-flush">
          <li class="list-group-item" style="color: darkslategray;font-size: medium;"><i class="bi bi-person-circle"></i> - {{ usuario }} - {{ vendedor }}</li>
    </ul>
    <li v-for="fact in ultfact" :key="fact.NroUnico"  class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
        {{ fact.Descrip }} <br> {{ fact.NumeroD }} | {{ fact.FechaE }}
        <span class="badge bg-primary rounded-pill">{{ fact.Saldo }}</span>
    </li>
  </ul>
</template>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
        ultfact : [],
        usuario : String,
        vendedor : String
    })
</script>