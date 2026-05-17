
import type { CurrencyInfo, ExchangeRates } from "../types/currencyTypes";

const BASE_URL = "https://api.vatcomply.com";


export type RatesResponse = {
    base: string;
    date: string;
    rates: ExchangeRates;
};


export type CurrenciesResponse = Record<string, CurrencyInfo>;

export async function getRates(baseCurrency: string): Promise<RatesResponse> {
    try {
        if (!baseCurrency) {
            throw new Error("Base currency is required");
        }

        const response = await fetch(`${BASE_URL}/rates?base=${baseCurrency}`);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        const data: RatesResponse = await response.json();

        return data;
    } catch (error) {
        console.error("getRates error:", error);

        throw new Error("Could not get exchange rates", { cause: error });
    }
}

export async function getCurrencies(): Promise<CurrenciesResponse> {
    try {
        const response = await fetch(`${BASE_URL}/currencies`);

        if (!response.ok) {
            throw new Error("Failed to fetch currencies");
        }

        const data: CurrenciesResponse = await response.json();

        return data;
    } catch (error) {
        console.error("getCurrencies error:", error);

        throw new Error("Could not get currencies", { cause: error });
    }
}