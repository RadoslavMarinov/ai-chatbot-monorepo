import { EnvUtils } from "@repo/utils";
import { BaseAi } from "../BaseAi";
import { OllamaAIEnvVars, OllamaModels } from ".";

export class OllamaAi extends BaseAi{

  constructor(
    protected model: OllamaModels = "llama3.1:8b",
    protected baseUrl: string = EnvUtils.getEnvVariable<OllamaAIEnvVars>("OLLAMA_API_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<OllamaAIEnvVars>("OLLAMA_API_KEY")
  ) {
    super(model, baseUrl, apiKey);
  }

}