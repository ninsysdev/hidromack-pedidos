<template>
    <ConsultarDocumento 
        :codigo="codigo" 
        :guardado="guardado"
        :codclie="codclie"
        :nomclie="nomclie"
        :totalmonto="totalmonto" 
    />
</template>
<script setup>
    import { onBeforeMount,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import ConsultarDocumento from '@/components/ConsultarDocumento.vue';

    const codigo = ref(0)
    const guardado = ref(0)
    const nomclie = ref('')
    const codclie = ref('')
    const totalmonto = ref(0)

    onBeforeMount(()=>{
        const route = useRoute()
        codigo.value = route.params.codigo 
        guardado.value = route.params.guardado
        nomclie.value = route.params.nomclie
        codclie.value = route.params.codclie
        totalmonto.value = route.params.totalmonto
    })     
</script>