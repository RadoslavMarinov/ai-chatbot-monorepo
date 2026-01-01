import { EnvUtils } from "@repo/utils";
import { GeminiAITypes } from "./types";
import { AbstractAi } from "../AbstractAi";

export class GeminiAi extends AbstractAi {
  constructor(
    protected baseUrl: string = EnvUtils.getEnvVariable<GeminiAITypes>("GEMINI_AI_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<GeminiAITypes>("GEMINI_AI_API_KEY")
  ) {
    super(baseUrl, apiKey);
  }
}
