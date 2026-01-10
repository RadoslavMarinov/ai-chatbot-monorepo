import { zodFunction } from "openai/helpers/zod.js";
import z from "zod";
import { CryptoSymbolEnumZod } from "../../types";
import { AlphaVantageCryptoApi } from "../../AlphaVantageApi";

const api = new AlphaVantageCryptoApi();

export const alphaVantageCryptoTools = [
  zodFunction({
    name: "get_crypto_currency_price",
    description: `Returns the price of crypto currency in real time by symbol.`,
    parameters: z.object({ cryptoCurrency: CryptoSymbolEnumZod.describe(`${CryptoSymbolEnumZod.description}`) }),
    function: async ({ cryptoCurrency }) => {
      const res = await api.getCryptoPrice(cryptoCurrency);
      console.log(`📌 API response(get_crypto_currency_price): ${JSON.stringify(res, null, 2)} `);
      return res;
    },
  }),
  zodFunction({
    name: "get_historical_crypto_currency_market_daily_data",
    description: `Returns the open, high, low, and close price of crypto currency by given crypto currency symbol and a number of days to look back for historical data`,
    parameters: z.object({
      cryptoCurrency: CryptoSymbolEnumZod.describe(`The crypto symbol to look up`),
      daysBack: z.number().describe("Number of days to look back for historical data"),
    }),
    function: async ({ cryptoCurrency, daysBack }) => {
      const res = await api.getCryptoDaily({ symbol: cryptoCurrency }, daysBack);
      console.log(`📌 API response(get_crypto_daily(${cryptoCurrency},${daysBack} ))`);
      return res
    },
  }),
];
