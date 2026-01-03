import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";
import { AlphaVantageStockApi, Currency, IntraDayInterval } from "../..";
import { StockSymbol } from "../..";
import { time } from "console";


const alphaVantageStockApi = new AlphaVantageStockApi();
export const stocksMcpTools = [
  zodFunction({
    name: "stockTimeSeriesDaily",
    description:`
    This tool is useful when you need to get historical daily stock data for a given stock symbol.
    Input:
    - \`symbol\`: The stock symbol you want to get data for (e.g., "IBM", "AAPL").
    - \`interval\`: The time interval for the intraday data (e.g., "5min", "15min", "30min", "60min").
    
    Output:
    - A JSON object containing the daily time series data for the specified stock symbol.
    Example (JSON format)"
    \`{
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2026-01-02",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2026-01-02": {
            "1. open": "297.5600",
            "2. high": "297.5699",
            "3. low": "289.0000",
            "4. close": "291.5000",
            "5. volume": "4662804"
        },
        "2025-12-31": {
            "1. open": "301.7600",
            "2. high": "301.8500",
            "3. low": "295.8700",
            "4. close": "296.2100",
            "5. volume": "3430133"
        }
    }
    } 
    \`
    
    Example:
    To get the daily time series for IBM:
    \`stockTimeSeriesDaily({ symbol: "IBM", interval: "60min" })\`
    
    To get the daily time series for Apple:
    \`stockTimeSeriesDaily({ symbol: "AAPL", interval: "30min" })\`
    
    If the user asks for "daily stock data" or "historical stock prices" for a specific company, use this tool.
    Do not use this tool for real-time data, only for historical daily data.
    Do not use this tool for intraday data, only for daily data.
    API docs: https://www.alphavantage.co/documentation/#daily
    `,
    parameters: z.object({ symbol: z.nativeEnum(StockSymbol), interval: z.nativeEnum(IntraDayInterval) }),
    function: ({ symbol, interval }) =>
      alphaVantageStockApi.timeSeriesDaily({symbol,interval}),
  })]