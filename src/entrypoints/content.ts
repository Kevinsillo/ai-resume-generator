export default defineContentScript({
    matches: ["*://*/*"],
    main() {
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === "getContent") {
                const $ = document.querySelector.bind(document)
                const h1 = $("h1")?.innerText
                const article = $("article")?.innerText

                browser.runtime.sendMessage({ h1, article })
            }
        })
    },
})
