import { z } from "zod";

export const StockSymbolEnumZod = z.enum([
  "NVDA", // NVIDIA Corporation – mega-cap tech leader (NASDAQ & S&P 500)
  "AAPL", // Apple Inc. – mega-cap tech & consumer electronics
  "MSFT", // Microsoft Corporation – mega-cap tech
  "GOOGL", // Alphabet Inc. Class A – parent of Google
  "GOOG", // Alphabet Inc. Class C – parent of Google
  "AMZN", // Amazon.com, Inc. – e-commerce & cloud
  "META", // Meta Platforms, Inc. – social & digital advertising
  "TSLA", // Tesla, Inc. – electric vehicles & energy

  // --- Other Mega-Cap & Core Index Leaders ---
  "BRK.B", // Berkshire Hathaway Class B – Warren Buffett’s holding company
  "AVGO", // Broadcom – semiconductors & infrastructure software
  "LLY", // Eli Lilly – pharmaceuticals (obesity & diabetes drugs)
  "JPM", // JPMorgan Chase – largest U.S. bank
  "V", // Visa – global payments network
  "MA", // Mastercard – global payments network
  "UNH", // UnitedHealth Group – healthcare & insurance
  "XOM", // Exxon Mobil – oil & gas supermajor
  "JNJ", // Johnson & Johnson – healthcare & pharma
  "PG", // Procter & Gamble – consumer staples

  // --- Big Tech & Growth ---
  "NFLX", // Netflix – streaming
  "ADBE", // Adobe – creative & enterprise software
  "CRM", // Salesforce – cloud CRM
  "INTC", // Intel – semiconductors
  "AMD", // Advanced Micro Devices – CPUs & GPUs
  "QCOM", // Qualcomm – mobile chips & IP
  "ORCL", // Oracle – enterprise software & cloud
  "IBM", // IBM – enterprise & AI infrastructure
  "SHOP", // Shopify – e-commerce software
  "SNOW", // Snowflake – cloud data platform
  "PLTR", // Palantir – data analytics & AI

  // --- Consumer & Brands ---
  "DIS", // Walt Disney – media & entertainment
  "NKE", // Nike – global apparel
  "MCD", // McDonald's – fast food
  "SBUX", // Starbucks – coffee chain
  "KO", // Coca-Cola – beverages
  "PEP", // PepsiCo – beverages & snacks
  "COST", // Costco – warehouse retail
  "WMT", // Walmart – retail giant
  "HD", // Home Depot – home improvement
  "LOW", // Lowe’s – home improvement

  // --- Finance, Energy, Industrials ---
  "BAC", // Bank of America
  "GS", // Goldman Sachs
  "MS", // Morgan Stanley
  "CVX", // Chevron – oil & gas
  "CAT", // Caterpillar – heavy equipment
  "BA", // Boeing – aerospace
  "GE", // General Electric – industrial & aerospace
  "RTX", // RTX (Raytheon) – defense & aerospace
  "LMT", // Lockheed Martin – defense
  "DE", // Deere & Co – agriculture & construction

  // --- ETFs (very popular for market exposure) ---
  "SPY", // S&P 500 ETF
  "QQQ", // Nasdaq-100 ETF
  "DIA", // Dow Jones ETF
  "IWM", // Russell 2000 (small caps)
  "VTI", // Total U.S. stock market
  "VOO", // Vanguard S&P 500
]).describe("The stock ticker symbol of the company (e.g. 'IBM', 'META', 'AAPL')");

export type StockSymbol = z.infer<typeof StockSymbolEnumZod>;
