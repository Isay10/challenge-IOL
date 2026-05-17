const BASE_URL = "https://api.vatcomply.com";


async function getRates(countryCode: string) {
    if (!countryCode) {
        return Promise.reject(new Error('Country code is required'))
    }
    const response = await fetch(`${BASE_URL}/rates?base=${countryCode}`)
    try {
        const data = await response.json()
        return data
    } catch {
        return Promise.reject(new Error('Failed to fetch VAT rates'))
    }

}

async function getCurrencies() {
    try {
        const response = await fetch(`${BASE_URL}/currencies`)
        const data = await response.json()
        console.log(data)
        return data
    } catch {
        return Promise.reject(new Error('Failed to fetch currencies'))
    }

}

export { getRates, getCurrencies }