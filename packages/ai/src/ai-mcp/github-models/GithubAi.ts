import { EnvUtils } from "@repo/utils";
import { GithubAiEnv } from "./types";
import { AbstractAi } from "../AbstractAi";

export class GithubAi extends AbstractAi{

  constructor(
    protected baseUrl: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<GithubAiEnv>("GITHUB_AI_TOKEN")
  ) {
    super(baseUrl, apiKey);
  }

   
}

