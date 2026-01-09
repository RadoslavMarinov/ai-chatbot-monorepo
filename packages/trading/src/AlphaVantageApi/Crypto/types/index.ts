import { AlphaVantageMarket, CryptoSymbol, Currency, IntraDayInterval } from "../../..";


export type CryptoApiSearchParam = {
  function: "CURRENCY_EXCHANGE_RATE",
  from_currency:CryptoSymbol | Currency,
  to_currency: CryptoSymbol | Currency,
} | {
  function: "CRYPTO_INTRADAY"
  symbol: CryptoSymbol,
  market: AlphaVantageMarket,
  interval: IntraDayInterval
} | {
  function :"DIGITAL_CURRENCY_DAILY"
  symbol: CryptoSymbol,
  market: AlphaVantageMarket,
}


export interface GetExchangeRateOutput {
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": string,
    "2. From_Currency Name": string,
    "3. To_Currency Code": string,
    "4. To_Currency Name": string,
    "5. Exchange Rate": string,
    "6. Last Refreshed": string,
    "7. Time Zone": string,
    "8. Bid Price": string,
    "9. Ask Price": string
  }
}


export interface GetCryptoDailyInput {
  symbol: CryptoSymbol, 
  market?: AlphaVantageMarket,
}


// https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=JUDMUHKLI05W0
// https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo