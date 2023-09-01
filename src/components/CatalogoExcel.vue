<template>
    <download-excel
        class="btn btn-sm btn-success"
        :data="todosProductos"
        worksheet="My Worksheet"
        name="Lista_Precios_HidroMack.xls"
    >
    <i class="bi bi-file-earmark-excel-fill" style="color: white;"></i>
    </download-excel>
</template>

<script setup>
    import { defineProps } from 'vue'

    defineProps({
        todosProductos : Array
    })
</script>