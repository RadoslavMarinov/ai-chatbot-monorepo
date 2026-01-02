import { EnvUtils } from "@repo/utils";
import { GithubAiEnv, GithubModels } from "./types";
import { BaseAi } from "../BaseAi";

export class GithubAi extends BaseAi{

  constructor(
    protected model: GithubModels = 'openai/gpt-4.1-mini',
    protected baseUrl: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_TOKEN"),
  ) {
    super( model, baseUrl, apiKey);
  }
}

