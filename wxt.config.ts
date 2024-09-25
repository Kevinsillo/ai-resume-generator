import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
    srcDir: "src",
    alias: {
        "@": "/src",
    },
    modules: ["@wxt-dev/module-vue"],
    manifest: {
        name: "IA Resume",
        description: "A resume for IA",
        version: "1.0.0",
        permissions: ["storage", "activeTab"],
    },
    vite: () => ({
        plugins: [
            VueI18nPlugin({
                include: resolve(dirname(fileURLToPath(import.meta.url)), "src/locales/**"),
            }),
        ],
    }),
})
