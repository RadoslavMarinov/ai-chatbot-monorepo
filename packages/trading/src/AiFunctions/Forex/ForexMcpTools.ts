import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { AlphaVantageForexApi, CryptoSymbolEnumZod, CurrencyEnumZod } from "../..";

const alphaVantageForexApi: AlphaVantageForexApi = new AlphaVantageForexApi();
export const forexMcpTools = [
  zodFunction({
    name: "physical_to_physical_currency_exchange",
    description:
      `Returns the realtime exchange rate between two physical currencies (e.g., 'USD', 'EUR', 'GBP', 'JPY')`,
    parameters: z.object({ fromPhysicalCurrency: CurrencyEnumZod.describe(`'Source physical currency`), toPhysicalCurrency: CurrencyEnumZod.describe(`The target physical currency`) }),
    function: ({ fromPhysicalCurrency, toPhysicalCurrency }) =>
      alphaVantageForexApi.getPhysicalToPhysicalExchangeRate(fromPhysicalCurrency, toPhysicalCurrency)
  }),
  zodFunction({
    name: "crypto_to_physical_exchange_rate",
    description:
      `Returns the realtime exchange rate for a pair of cryptocurrency "cryptoCurrency" (e.g., BTC) and physical currency "physicalCurrency" (e.g., USD)`,
    parameters: z.object({ cryptoCurrency: CryptoSymbolEnumZod, physicalCurrency: CurrencyEnumZod }),
    function: ({ cryptoCurrency, physicalCurrency }) =>
      alphaVantageForexApi.getCryptoToPhysicalExchangeRate(cryptoCurrency, physicalCurrency),
  }),
  zodFunction({
    name: "physical_to_crypto_exchange_rate",
    description:
      `Returns the realtime exchange rate for a pair of physical currency "physicalCurrency" (e.g., USD) and cryptocurrency "cryptoCurrency" (e.g., Bitcoin)`,
    parameters: z.object({ physicalCurrency: CurrencyEnumZod, cryptoCurrency: CryptoSymbolEnumZod }),
    function: ({ physicalCurrency, cryptoCurrency }) =>
      alphaVantageForexApi.getPhysicalToCryptoExchangeRate(physicalCurrency, cryptoCurrency),
  }),
  zodFunction({
    name: "get_historical_prices_day_interval",
    description:
      "Returns historical data of the exchange rate between two physical currencies with a day interval",
    parameters: z.object({ fromCurrency: CurrencyEnumZod, toCurrency: CurrencyEnumZod }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getDailyTimeSeries(fromCurrency, toCurrency),
  }),
  zodFunction({
    name: "getWeeklyTimeSeries",
    description:
      `Returns historical data of the exchange rate between two physical currencies with a week interval`,
    parameters: z.object({ fromCurrency: CurrencyEnumZod, toCurrency: CurrencyEnumZod }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getWeeklyTimeSeries(fromCurrency, toCurrency).then(r =>Object.entries(r["Time Series FX (Weekly)"]).map(([key, val])=> ({[key]: val}))),
  }),
  zodFunction({
    name: "getMonthlyTimeSeries",
    description:
      `Returns historical data of the exchange rate between two physical currencies with a month interval`,
    parameters: z.object({ fromCurrency: CurrencyEnumZod, toCurrency: CurrencyEnumZod }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getMonthlyTimeSeries(fromCurrency, toCurrency),
  }),
];
