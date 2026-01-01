import OpenAI from "openai";

export type GithubModels =
  | "openai/gpt-4.1"
  | "openai/gpt-4.1-mini"
  | "openai/gpt-4.1-nano"
  | "xai/grok-3"
  | "xai/grok-3-mini";

export type GithubAiEnv = "GITHUB_AI_BASE_URL" |"GITHUB_AI_TOKEN"
