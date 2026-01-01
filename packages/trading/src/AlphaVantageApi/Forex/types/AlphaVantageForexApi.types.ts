
export type ExchangeRateSearchParam =
  | "CURRENCY_EXCHANGE_RATE"
  | "FX_INTRADAY"
  | "FX_DAILY"
  | "FX_WEEKLY"
  | "FX_MONTHLY";
  
 
export type OutputSize = "compact" | "full"
export type DataType = "json" | "csv"
  
export interface CurrencyExchangeRateOutput {
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": string;
    "2. From_Currency Name": string;
    "3. To_Currency Code": string;
    "4. To_Currency Name": string;
    "5. Exchange Rate": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
    "8. Bid Price": string;
    "9. Ask Price": string;
  };
}


// One OHLC candle for a single day
export interface FxTimeSeriesBar {
  "1. open": string;  // e.g. "1.17400"
  "2. high": string;
  "3. low": string;
  "4. close": string;
}
// Meta data section
export interface FxDalyMetaData {
  "1. Information": string;     // "Forex Daily Prices (open, high, low, close)"
  "2. From Symbol": string;     // "EUR"
  "3. To Symbol": string;       // "USD"
  "4. Output Size": string;     // "Compact" | "Full"
  "5. Last Refreshed": string;  // "2026-01-01"
  "6. Time Zone"?: string;       // "UTC"
}

export interface FxWeeklyMetaData {
  "1. Information": string;     // "Forex Daily Prices (open, high, low, close)"
  "2. From Symbol": string;     // "EUR"
  "3. To Symbol": string;       // "USD"
  "4. Last Refreshed": string;     // "Compact" | "Full"
  "5. Time Zone": string;  // "2026-01-01"
}
export interface FxMonthlyMetaData extends FxWeeklyMetaData{};

// Map of YYYY-MM-DD → OHLC bar
export type FxTimeSeries = Record<string, FxTimeSeriesBar>;
// Root API response
export interface GetDailyTimeSeriesOutput {
  "Meta Data": FxDalyMetaData;
  "Time Series FX (Daily)": FxTimeSeries;
}
export interface GetWeeklyTimeSeriesOutput {
"Meta Data": FxWeeklyMetaData;
"Time Series FX (Weekly)": FxTimeSeries;
}
export interface GetMonthlyTimeSeriesOutput {
"Meta Data": FxMonthlyMetaData;
"Time Series FX (Monthly)": FxTimeSeries;
}



// Removed redundant GetWeeklyTimeSeriesOutput interface as it is equivalent to GetDailyTimeSeriesOutput