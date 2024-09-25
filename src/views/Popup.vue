<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
import GestorToken from "@/core/GestorToken"
import { onMounted, ref } from "vue"

const token = ref("")
const titulo = ref("")
const articulo = ref("")
const estado = ref("")
const resumen = ref("")
const parts = ref([
    { text: "Has un resumen en texto plano, de unos dos parrafos, con la información más relevante de la siguiente noticia." },
])

const resumirArticulo = async () => {
    estado.value = "Resumiendo artículo..."
    parts.value.push({ text: articulo.value })
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${token.value}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: parts.value }],
            }),
        },
    )

    if (!response.ok) {
        estado.value = "Error en la solicitud a la API"
        return
    }

    const data = await response.json()
    resumen.value = data.candidates[0].content.parts.map((part: any) => part.text).join("\n")
    estado.value = ""
}

onMounted(async () => {
    token.value = await GestorToken.getToken()
    if (!token.value) estado.value = "Es necesario un API token de Google AI Studio. Ve a opciones y consigue uno gratuitamente"

    browser.runtime.onMessage.addListener((request: any) => {
        if (!request.article) {
            estado.value = "No se encuentra el artículo"
            return
        }
        titulo.value = request.h1
        articulo.value = request.article
    })

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs: any) => {
        if (tabs.length === 0 || !tabs[0].id) return
        browser.tabs.sendMessage(tabs[0].id, { action: "getContent" })
    })
})
</script>

<template>
    <Navbar />
    <div class="flex flex-col gap-2 p-4">
        <h2 v-if="token" class="text-base font-bold text-left mb-2">{{ titulo }}</h2>
        <div v-if="!articulo" class="text-left">{{ $t("webextension.posicionarse") }}</div>
        <button v-if="token" @click="resumirArticulo" class="w-full" :disabled="!articulo">
            {{ $t("webextension.resumir") }}
        </button>
        <button v-if="!token" @click="browser.runtime.openOptionsPage()">Ir a opciones</button>
        <div v-if="estado" class="mt-2 font-semibold">{{ estado }}</div>
        <div class="text-left">{{ resumen }}</div>
    </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>
