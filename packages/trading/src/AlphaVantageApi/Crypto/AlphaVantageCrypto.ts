import { CryptoApiSearchParam, GetCryptoDailyInput, GetExchangeRateOutput } from ".";
import { AlphaVantageMarket, CryptoSymbol, Currency, IntraDayInterval } from "../..";
import { BaseAlphaVantageApi } from "../BaseAlphaVantageApi";

export class AlphaVantageCryptoApi extends BaseAlphaVantageApi<CryptoApiSearchParam> {
  constructor(apiBaseUrl?: string, apiKey?: string) {
    super(apiBaseUrl, apiKey);
  }

  /**
   * This API returns the realtime exchange rate for any pair of cryptocurrency (e.g., Bitcoin) or physical currency (e.g., USD).
   * @Docs https://www.alphavantage.co/documentation/#crypto-exchange
   */
  async getExchangeRate(
    fromCurrency: CryptoSymbol | Currency,
    toCurrency: CryptoSymbol | Currency
  ): Promise<GetExchangeRateOutput> {
    const res = await this.getWithParams({
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: fromCurrency,
      to_currency: toCurrency,
    });
    return this.handleResponse(res);
  }

  /**
   * Returns the current price of a crypto currency in USD
   */
  async getCryptoPrice(cryptoSymbol: CryptoSymbol): Promise<{ price: number; timestamp: Date; currency: string }> {
    const res = await this.getExchangeRate(cryptoSymbol, "USD");
    return {
      price: Number(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"]),
      timestamp: new Date(res["Realtime Currency Exchange Rate"]["6. Last Refreshed"]),
      currency: "USD",
    };
  }

  // --------------------------------- CRYPTO_INTRADAY --------------------------------- //

  /**
   * Docs https://www.alphavantage.co/documentation/#crypto-intraday
   * @deprecated Premium Only!
   */
  async getCryptoIntraday(
    symbol: CryptoSymbol,
    market: AlphaVantageMarket = "USD",
    interval: IntraDayInterval = "5min"
  ) {
    const res = await this.getWithParams({
      function: "CRYPTO_INTRADAY",
      symbol: symbol,
      market: market,
      interval: interval,
    });

    return res;
  }

  // --------------------------------- DIGITAL_CURRENCY_DAILY --------------------------------- //
  /**
   * @Docs https://www.alphavantage.co/documentation/#currency-daily
   */
  async getCryptoDaily(input: GetCryptoDailyInput, daysBack: number = 50) {
    const _input: Required<GetCryptoDailyInput> = {
      market: "USD",
      ...input,
    };
    const res = await this.getWithParams({
      function: "DIGITAL_CURRENCY_DAILY",
      ..._input,
    });
    let data = await this.handleResponse(res);
    const seriesEntr = Object.entries(data["Time Series (Digital Currency Daily)"]).slice(0, daysBack);
    const seriesAsObj = Object.fromEntries(seriesEntr);
    data = {
      ...data,
      "Time Series (Digital Currency Daily)": seriesAsObj,
    };
    return data
  }
}
