import { Message, Tools } from "../../types";
import { GeminiAi } from "../GeminiAi";
import { ChatCompletionRunner } from "openai/lib/ChatCompletionRunner.js";
import { GeminiModels } from "..";
import { EnvUtils } from "@repo/utils";
import { AiError, GeminiToolRunnerProps } from "./types";

const INITIAL_AI_MODELS: GeminiModels[] = [
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  // "gemma-3-27b",
];

export class GeminiToolRunner {
  private apiKeys = EnvUtils.getEnvVariable("GEMINI_AI_API_KEYS").split(",");
  private aiModelsList: GeminiModels[] = [...INITIAL_AI_MODELS];
  private ai: GeminiAi;
  baseUrl?: string;
  onSystemMessage?: (msg: Message) => void;
  onError?: (err: Error) => void;

  constructor(props?: GeminiToolRunnerProps) {
    this.baseUrl = props?.baseUrl;
    this.onSystemMessage = props?.onSystemMessage;
    this.onError = props?.onError;
    this.ai = new GeminiAi(this.aiModelsList[0]!, this.baseUrl, this.getApiKey());
  }

  async runTools(messages: Message[], tools: Tools): Promise<ChatCompletionRunner> {
    return new Promise((resolve, reject) => {
      return this.ai
        .runTools(messages, tools)
        .then((runner) => {
          runner.on("message", (message) => {
            console.log(
              `>>>> 🤖 AI 🤖 (${this.ai.getModel()}): ${JSON.stringify({ ...message, content: `${message.content?.slice(0, 100)}...` }, null, 2)}`
            );
          });

          return runner.finalMessage().then((msg) => {
            resolve(runner);
          });
        })
        .catch(async (err) => {
          if (this.isAiError(err) && err.status === 429) {
            const hasNextKey = this.changeNextApiKey();
            if (!hasNextKey) {
              this.initApiKeys();
              this.changeAiModel();
            }
            const newRunner = await this.runTools(messages, tools);
            resolve(newRunner);
          } else {
            reject(err);
          }
        });
    });
  }

  private changeNextApiKey() {
    const nextApiKey = this.apiKeys.shift();
    if (!nextApiKey) {
      this.onNoMoreApiKeys();
      return false;
    }
    this.ai = new GeminiAi(this.getModel()!, this.baseUrl, this.getApiKey()!);
    this.onNextApiKey();
    return true;
  }

  private getApiKey() {
    return this.apiKeys[0];
  }

  private initApiKeys() {
    this.apiKeys = EnvUtils.getEnvVariable("GEMINI_AI_API_KEYS").split(",");
  }

  private onNextApiKey() {
    this?.onSystemMessage?.({
      role: "assistant",
      content: `🚧 Changing ApiKey: **${this.getApiKey()?.slice(0, 4) + "*******" + this.getApiKey()?.slice(-4)} **! Please try again!`,
    });
  }
  private onNoMoreApiKeys() {
    this?.onSystemMessage?.({
      role: "assistant",
      content: `🚧 No more ApiKeys available`,
    });
  }

  /**
   *
   * @returns True if there are more models to be exploited
   */
  private changeAiModel(): boolean {
    const nextModel = this.aiModelsList.shift();
    if (!nextModel) {
      this.onNoMoreModels();
      return false;
    }
    this.ai = new GeminiAi(this.getModel()!, this.baseUrl, this.getApiKey()!);
    this.onChangedAiModel();
    return true;
  }

  private getModel() {
    return this.aiModelsList[0];
  }
  private onChangedAiModel() {
    this?.onSystemMessage?.({
      role: "assistant",
      content: `🚧 Changing model: **${this.aiModelsList[0]}**! Please try again!`,
    });
  }

  private onNoMoreModels() {
    this?.onSystemMessage?.({
      role: "assistant",
      content: `🚧 No more models available`,
    });
  }

  private isAiError(err: unknown): err is AiError {
    return (err as AiError).status !== undefined;
  }
}
