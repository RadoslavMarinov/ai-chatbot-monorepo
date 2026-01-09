export type AlphaVantageApiEnvs = "ALPHA_VANTAGE_API_BASE_URL" | "ALPHA_VANTAGE_API_KEY"
import { z } from "zod";

export const IntraDayIntervalZod = z.enum([
  "1min",
  "5min",
  "15min",
  "30min",
  "60min",
]);
export type IntraDayInterval = z.infer<typeof IntraDayIntervalZod>;

// --
export const AlphaVantageMarketZod =  z.enum(["USD"]);
export type AlphaVantageMarket = z.infer<typeof AlphaVantageMarketZod>;