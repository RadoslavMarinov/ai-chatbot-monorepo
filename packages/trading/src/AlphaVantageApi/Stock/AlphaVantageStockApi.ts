import { IntraDayInterval } from "..";
import { BaseAlphaVantageApi } from "../BaseAlphaVantageApi";
import { StockApiSearchParams } from "./types";

export class AlphaVantageStockApi extends BaseAlphaVantageApi<StockApiSearchParams> {
  constructor(apiBaseUrl?: string, apiKey?: string) {
    super(apiBaseUrl, apiKey);
  }

  /**
   * https://www.alphavantage.co/documentation/#daily
   */
  async timeSeriesDaily(params: Omit<StockApiSearchParams, "function">) {
    console.log(`🚧 timeSeriesDaily(${params})`, );
    const res = await this.getWithParams({ function: "TIME_SERIES_DAILY", interval: IntraDayInterval.ThirtyMin, ...params });
    return this.handleResponse(res);
  }

  /**
   * @deprecated PREMIUM ENDPOINT
   * https://www.alphavantage.co/documentation/#intraday
   */
  timeSeriesIntraday(params: Omit<StockApiSearchParams, "function">) {
    return this.getWithParams({ function: "TIME_SERIES_INTRADAY", interval: IntraDayInterval.ThirtyMin, ...params });
  }


}
