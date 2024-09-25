<script lang="ts" setup>
import GestorToken from "@/core/GestorToken"
import { onMounted, ref } from "vue"

const token = ref("")
const estado = ref("")

const almacenarToken = async () => {
    await GestorToken.setToken(token.value)
    estado.value = "Guardado correctamente. Ya puedes cerrar las ventana."
}

const cargarToken = async () => {
    token.value = await GestorToken.getToken()
}

onMounted(async () => {
    await cargarToken()
})
</script>

<template>
    <div class="p-8 flex flex-col text-left gap-2">
        <h2 class="text-2xl font-bold">{{ $t("webextension.nombre") }}</h2>
        <p>{{ $t("webextension.descripcion.0") }}</p>
        <p>{{ $t("webextension.descripcion.1") }}</p>
        <div class="mb-4 w-full">
            <label class="text-sm font-medium flex flex-col gap-1">
                <div>{{ $t("webextension.adquirir_api_token") }} <a href="https://ai.google.dev/aistudio">Google AI Studio</a></div>
                <input type="text" v-model="token" placeholder="Introduce el token..." class="w-full border rounded-md p-2" />
            </label>
        </div>
        <div v-if="estado" class="text-green-600 font-semibold">{{ estado }}</div>
        <button @click="almacenarToken" class="w-full" :disabled="!token">{{ $t("webextension.almacenar_token") }}</button>
    </div>
</template>

<style scoped>
/*  */
</style>
