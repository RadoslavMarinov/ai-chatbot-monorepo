import { BaseAlphaVantageApi } from "../BaseAlphaVantageApi";
import { StockApiSearchParams } from "./types";

export class AlphaVantageStockApi extends BaseAlphaVantageApi<StockApiSearchParams> {
  constructor(apiBaseUrl?: string, apiKey?: string) {
    super(apiBaseUrl, apiKey);
  }

  /**
   * This endpoint returns the latest price and volume information for a ticker of your choice
   */
  async getQuote(params: Omit<StockApiSearchParams, "function"|"interval">) {
    console.log(`🚧 getQuote(${params})`, );
    const res = await this.getWithParams({ function: "GLOBAL_QUOTE", ...params });
    return this.handleResponse(res);
  }

  /**
   * https://www.alphavantage.co/documentation/#daily
   */
  async timeSeriesDaily(params: Omit<StockApiSearchParams, "function">) {
    console.log(`🚧 timeSeriesDaily(${params})`, );
    const res = await this.getWithParams({ function: "TIME_SERIES_DAILY", interval: "30min", ...params });
    return this.getTimeSeriesData(res, "Time Series (Daily)")
  }

  /**
   * https://www.alphavantage.co/documentation/#weekly
   */
  async timeSeriesWeekly(params: Omit<StockApiSearchParams, "function">) {
    console.log(`🚧 timeSeriesWeekly(${params})`, );
    const res = await this.getWithParams({ function: "TIME_SERIES_WEEKLY", interval: "30min", ...params });
    return this.getTimeSeriesData(res, "Weekly Time Series");
  }

  /**
   * @deprecated PREMIUM ENDPOINT
   * https://www.alphavantage.co/documentation/#intraday
   */
  timeSeriesIntraday(params: Omit<StockApiSearchParams, "function">) {
    return this.getWithParams({ function: "TIME_SERIES_INTRADAY", interval: "30min", ...params });
  }

  private async getTimeSeriesData(res: Response, key: string, limit: number = 50) {
     const data = await this.handleResponse(res).then(r=>r[key]);
    const entries =  Object.entries(data).slice(0,limit)
    return Object.fromEntries(entries)
  }

}
