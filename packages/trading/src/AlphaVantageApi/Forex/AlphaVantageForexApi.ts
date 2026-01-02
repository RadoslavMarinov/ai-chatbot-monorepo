import {
  CryptoSymbol,
  Currency,
  CurrencyExchangeRateOutput,
  DataType,
  ExchangeRateSearchParam,
  GetDailyTimeSeriesOutput,
  GetMonthlyTimeSeriesOutput,
  GetWeeklyTimeSeriesOutput,
  IntraDayInterval,
  OutputSize,
} from "../..";
import { BaseAlphaVantageApi } from "../BaseAlphaVantageApi";

export interface AlphaVantageApiSearchParam {
  function: ExchangeRateSearchParam;
  from_currency?: Currency | CryptoSymbol;
  to_currency?: Currency | CryptoSymbol;
  interval?: IntraDayInterval;
  from_symbol?: Currency;
  to_symbol?: Currency;
  outputsize?: OutputSize;
  datatype?: DataType;
}

export class AlphaVantageForexApi extends BaseAlphaVantageApi<AlphaVantageApiSearchParam> {
  constructor(apiBaseUrl?: string, apiKey?: string) {
    super(apiBaseUrl, apiKey);
  }

  /**
   * This API returns the monthly time series (timestamp, open, high, low, close)
   * of the FX currency pair specified, updated realtime.
   */
  public async getMonthlyTimeSeries(
    fromCurrency: Currency,
    toCurrency: Currency,
    dataType: DataType = "json"
  ): Promise<GetMonthlyTimeSeriesOutput> {
    const res = await this.getWithParams({
      function: "FX_MONTHLY",
      from_symbol: fromCurrency,
      to_symbol: toCurrency,
      datatype: dataType,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`FX_MONTHLY request failed with code: ${res.status}, text: ${res.statusText}`);
  }

  /**
   * This API returns the weekly time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime.
   * The latest data point is the price information for the week (or partial week) containing the current trading day, updated realtime.
   */
  public async getWeeklyTimeSeries(
    fromCurrency: Currency,
    toCurrency: Currency,
    dataType: DataType = "json"
  ): Promise<GetWeeklyTimeSeriesOutput> {
    const res = await this.getWithParams({
      function: "FX_WEEKLY",
      from_symbol: fromCurrency,
      to_symbol: toCurrency,
      datatype: dataType,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`FX_WEEKLY request failed with code: ${res.status}, text: ${res.statusText}`);
  }

  /**
    This API returns the daily time series (timestamp, open, high, low, close)
    of the FX currency pair specified, updated realtime.
   */
  public async getDailyTimeSeries(
    fromCurrency: Currency,
    toCurrency: Currency,
    outputSize: OutputSize = "compact",
    dataType: DataType = "json"
  ): Promise<GetDailyTimeSeriesOutput> {
    const res = await this.getWithParams({
      function: "FX_DAILY",
      from_symbol: fromCurrency,
      to_symbol: toCurrency,
      outputsize: outputSize,
      datatype: dataType,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`FX_DAILY request failed with code: ${res.status}, text: ${res.statusText}`);
  }



  /**
   * This API returns the realtime exchange rate for a pair of physical currency (e.g., USD)
   * and cryptocyrrency (e.g., Bitcoin)
   */
  public async getPhysicalToCryptoExchangeRate(
    physicalCurrency: Currency,
    cryptoCurrency: CryptoSymbol
  ): Promise<CurrencyExchangeRateOutput> {
    return this.getExchangeRate(physicalCurrency, cryptoCurrency);
  }

  /**
   * This API returns the realtime exchange rate for a pair of cryptocurrency (e.g., Bitcoin)
   * and physical currency (e.g., USD).
   */
  public async getCryptoToPhysicalExchangeRate(
    cryptoCurrency: CryptoSymbol,
    physicalCurrency: Currency
  ): Promise<CurrencyExchangeRateOutput> {
    return this.getExchangeRate(cryptoCurrency, physicalCurrency);
  }


  /**
   * @deprecated (PREMIUM Use Only) This API returns intraday time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime.
   */
  public async getIntradayTimeSeries(
    fromCurrency: Currency,
    toCurrency: Currency,
    interval: IntraDayInterval
  ): Promise<any> {
    const res = await this.getWithParams({
      function: "FX_INTRADAY",
      from_currency: fromCurrency,
      to_currency: toCurrency,
      interval: interval,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`FX_INTRADAY request failed with code: ${res.status}, text: ${res.statusText}`);
  }
  //  ------------------------- PRIVATE METHODS ------------------------- //
  /**
   * This API returns the realtime exchange rate for a pair of cryptocurrency
   * (e.g., Bitcoin) and physical currency (e.g., USD).
   */
  private async getExchangeRate(
    fromCurrency: Currency | CryptoSymbol,
    toCurrency: Currency | CryptoSymbol
  ): Promise<CurrencyExchangeRateOutput> {
    const res = await this.getWithParams({
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: fromCurrency,
      to_currency: toCurrency,
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`CURRENCY_EXCHANGE_RATE request failed with code: ${res.status}, text: ${res.statusText}`);
  }
}
