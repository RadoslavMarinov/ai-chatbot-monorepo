import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { AlphaVantageForexApi, CryptoSymbol, Currency } from "../..";

const alphaVantageForexApi: AlphaVantageForexApi = new AlphaVantageForexApi();
export const forexMcpTools = [
  zodFunction({
    name: "cryptoToPhysicalExchangeRate",
    description:
      "This API returns the realtime exchange rate for a pair of cryptocurrency (e.g., Bitcoin) and physical currency (e.g., USD)",
    parameters: z.object({ cryptoCurrency: z.nativeEnum(CryptoSymbol), physicalCurrency: z.nativeEnum(Currency) }),
    function: ({ cryptoCurrency, physicalCurrency }) =>
      alphaVantageForexApi.getCryptoToPhysicalExchangeRate(cryptoCurrency, physicalCurrency),
  }),
  zodFunction({
    name: "physicalToCryptoExchangeRate",
    description:
      "This API returns the realtime exchange rate for a pair of physical currency (e.g., USD) and cryptocurrency (e.g., Bitcoin)",
    parameters: z.object({ physicalCurrency: z.nativeEnum(Currency), cryptoCurrency: z.nativeEnum(CryptoSymbol) }),
    function: ({ physicalCurrency, cryptoCurrency }) =>
      alphaVantageForexApi.getPhysicalToCryptoExchangeRate(physicalCurrency, cryptoCurrency),
  }),
  zodFunction({
    name: "getDailyTimeSeries",
    description:
      "This API returns the daily time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime.",
    parameters: z.object({ fromCurrency: z.nativeEnum(Currency), toCurrency: z.nativeEnum(Currency) }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getDailyTimeSeries(fromCurrency, toCurrency),
  }),
  zodFunction({
    name: "getWeeklyTimeSeries",
    description:
      "This API returns the weekly time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime. The latest data point is the price information for the week (or partial week) containing the current trading day, updated realtime.",
    parameters: z.object({ fromCurrency: z.nativeEnum(Currency), toCurrency: z.nativeEnum(Currency) }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getWeeklyTimeSeries(fromCurrency, toCurrency).then(r =>Object.entries(r["Time Series FX (Weekly)"]).map(([key, val])=> ({[key]: val}))),
  }),
  zodFunction({
    name: "getMonthlyTimeSeries",
    description:
      "This API returns the monthly time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime.",
    parameters: z.object({ fromCurrency: z.nativeEnum(Currency), toCurrency: z.nativeEnum(Currency) }),
    function: ({ fromCurrency, toCurrency }) => alphaVantageForexApi.getMonthlyTimeSeries(fromCurrency, toCurrency),
  }),
];
