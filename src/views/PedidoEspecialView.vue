<template>
    <PedidoEspecial :codclie="codclie" :descrip="descrip" :reeditar="reeditar" />
</template>
<script setup>
    import { onBeforeMount,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import PedidoEspecial from '@/components/PedidoEspecial.vue'

    const codclie = ref('')
    const descrip = ref('')
    const reeditar = ref(0)

    onBeforeMount(()=>{
        const route = useRoute() 
        codclie.value = route.params.codclie
        descrip.value = route.params.descrip
        reeditar.value = route.params.reeditar
    })     
</script>