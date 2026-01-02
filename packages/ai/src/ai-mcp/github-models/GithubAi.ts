import { EnvUtils } from "@repo/utils";
import { GithubAiEnv, GithubModels } from "./types";
import { AbstractAi } from "../AbstractAi";

export class GithubAi extends AbstractAi{

  constructor(
    protected model: GithubModels = 'openai/gpt-4.1-mini',
    protected baseUrl: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_TOKEN"),
  ) {
    console.log(`👉 baseUrl = `, baseUrl);
    console.log(`👉 apiKey = `, apiKey);
    super( model, baseUrl, apiKey);
  }

   
}

