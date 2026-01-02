import { EnvUtils } from "@repo/utils";
import { GeminiModels, GeminiAITypes } from "./types";
import { BaseAi } from "../BaseAi";

export class GeminiAi extends BaseAi {
  constructor(
    protected model:GeminiModels,
    protected baseUrl: string = EnvUtils.getEnvVariable<GeminiAITypes>("GEMINI_AI_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<GeminiAITypes>("GEMINI_AI_API_KEY"),
  ) {
    super( model, baseUrl, apiKey );
  }
}
