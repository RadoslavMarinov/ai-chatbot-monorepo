import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { AlphaVantageStockApi } from "../..";
import { StockSymbolEnumZod } from "../..";

const alphaVantageStockApi = new AlphaVantageStockApi();
export const stocksMcpTools = [
  zodFunction({
    name: "getQuote",
    description: `Retrieves the last market value of a stock by symbol (e.g. AAPL).`,
    parameters: z.object({ symbol: StockSymbolEnumZod }),
    function: ({ symbol }) => alphaVantageStockApi.getQuote({ symbol }),
  }),

  zodFunction({
    name: "getHistoricalMarketPriceFor stock",
    description: `
      Retrieves historical market data for stock by symbol(e.g. AAPL) with weekly interval. 
    `,
    parameters: z.object({ symbol: StockSymbolEnumZod}),
    function: ({ symbol}) => alphaVantageStockApi.timeSeriesWeekly({ symbol, interval:"60min" }),
  }),

  zodFunction({
    name: "stockTimeSeriesDaily",
    description: `
    Retrieves historical stock price for given compay e.g. AAPL with daly interval.
    `,
    parameters: z.object({ symbol: StockSymbolEnumZod}),
    function: ({ symbol }) => alphaVantageStockApi.timeSeriesDaily({ symbol, interval:"60min" }),
  }),
];
