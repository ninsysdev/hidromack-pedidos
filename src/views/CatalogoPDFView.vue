<template>
     <div  class="container mt-2 d-grid gap-2">
        <a :href="urlPDF" :class="'btn btn-'+store.basecolor"> VER CATALOGO PDF</a>
        <hr>
        <button  @click="copiarContenido()" :class="'btn btn-'+store.basecolor">{{ texto }}</button>
        <hr>
        <a :href="urlCatalogo" target="_blank" :class="'btn btn-'+store.basecolor"> IR A LA APP CATALOGO</a>
        <hr>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
     import { useGlobalStore } from '@/store/global';
     const store = useGlobalStore();
     const urlCatalogo = 'https://catalogohidromack.spxapp.com';
     const urlPDF = 'https://spxapp.com/spxapp.com/catalogohidromack/Catalogo_Hidromack.pdf';
     const texto = ref(" COPIAR LINK APP CATALOGO");

     const copiarContenido = async () => {
        try {
        await navigator.clipboard.writeText(urlCatalogo);
            //console.log('Contenido copiado al portapapeles');
            texto.value = "DIRECCION COPIADA...!"
        } catch (err) {
            //console.error('Error al copiar: ', err);
            texto.value = "ERROR..."
        }
    }
</script>
