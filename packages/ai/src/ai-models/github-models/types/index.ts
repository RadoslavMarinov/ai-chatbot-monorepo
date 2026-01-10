
/**
 * Starting from the best Ive tested top down
 */
export type GithubModels =
  | "openai/gpt-4.1-mini" // tested - works well with >800 tokens and makes good analysys
  | "gpt-4.1"
  | "openai/gpt-4.1-nano"
  | "xai/grok-3"
  | "xai/grok-3-mini";

export type GithubAiEnv = "GITHUB_AI_BASE_URL" |"GITHUB_AI_TOKEN"
