import { IntraDayInterval, StockSymbol } from "../../..";

export type StockFunction =
  | "TIME_SERIES_INTRADAY"
  | "TIME_SERIES_DAILY"
  | "TIME_SERIES_DAILY_ADJUSTED"
  | "TIME_SERIES_WEEKLY"
  | "TIME_SERIES_WEEKLY_ADJUSTED"
  | "TIME_SERIES_MONTHLY"
  | "TIME_SERIES_MONTHLY_ADJUSTED"
  | "GLOBAL_QUOTE"
  | "REALTIME_BULK_QUOTES"
  | "SYMBOL_SEARCH"
  | "MARKET_STATUS";



export interface StockApiSearchParams {
  function: StockFunction;
  symbol: StockSymbol;
  interval?: IntraDayInterval;
}