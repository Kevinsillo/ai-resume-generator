const GestorToken = {
    async getToken(): Promise<string> {
        const result = await browser.storage.local.get("token")
        return result.token
    },
    async setToken(token: string): Promise<void> {
        await browser.storage.local.set({ token })
    },
    async checkToken(): Promise<string> {
        const result = await browser.storage.local.get("token")
        const token = result.token

        if (!token) {
            return ""
        }

        return token
    },
}

export default GestorToken
