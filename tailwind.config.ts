const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                auto: "repeat(auto-fill, minmax(86px, 1fr))",
            },
            screens: {
                xs: "360px",
                ...defaultTheme.screens,
            },
        },
    },
    plugins: [],
    darkMode: "class",
}
