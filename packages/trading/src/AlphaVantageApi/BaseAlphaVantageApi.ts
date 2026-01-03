import { EnvUtils } from "@repo/utils";
import { AlphaVantageApiEnvs } from "./types";

export abstract class BaseAlphaVantageApi<SearchParams extends Record<string, any>> {
  protected apiBaseUrl: string;
  protected apiKey: string;

  constructor(apiBaseUrl?: string, apiKey?: string) {
    this.apiBaseUrl = apiBaseUrl ?? EnvUtils.getEnvVariable<AlphaVantageApiEnvs>("ALPHA_VANTAGE_API_BASE_URL");
    this.apiKey = apiKey ?? EnvUtils.getEnvVariable<AlphaVantageApiEnvs>("ALPHA_VANTAGE_API_KEY");
  }

  // -------------------- PROTECTED METHODS -------------------- //
  protected getWithParams(params: SearchParams) {
    const url = `${this.apiBaseUrl}?${this.buildSearchParams(params)}`;
    console.log(`👉 url = `, url);
    return fetch(url);
  }

  protected handleResponse(res: Response){
    if(res.ok){
      return res.json()
    }
    throw new Error(`timeSeriesDaily failed with status ${res.status}, ${res.statusText}`)
  }

  // -------------------- PRIVATE METHODS -------------------- //
  private buildSearchParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    searchParams.append("apikey", this.apiKey);
    const str = searchParams.toString() 
    console.log(`👉 str = `, str);
    return str;
  }

}
