import { OpenAIError } from "openai";
import { Message, Tools } from "../../types";
import { GeminiAi } from "../GeminiAi";
import { ChatCompletionRunner } from "openai/lib/ChatCompletionRunner.js";
import { GeminiModels } from "..";
import { EnvUtils } from "@repo/utils";

type AiError = OpenAIError & {
  status: number;
};

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
  onMessage?: (msg: Message) => void;
  onError?: (err: Error) => void;

  constructor(onMessage?: (msg: Message) => void, onError?: (err: Error) => void, baseUrl?: string) {
    this.baseUrl = baseUrl;
    this.onMessage = onMessage;
    this.onError = onError;
    this.onError = onError;
    this.ai = new GeminiAi(this.aiModelsList[0]!, baseUrl, this.apiKeys[0]);
  }

  async runTools(messages: Message[], tools: Tools): Promise<ChatCompletionRunner> {
    return new Promise((resolve, reject) => {
      return this.ai
        .runTools(messages, tools)
        .then((runner) => {
          runner.on("message", (message) => {
            console.log(`>>>> 🤖 AI 🤖 (${this.ai.getModel()}): ${JSON.stringify(message, null, 2)}`);
          });

          runner.on("error", (err) => {
            if (this.isAiError(err)) {
              if (err.status === 429) {
                const nextModel = this.changeAiModel()
                if(!nextModel){
                  const nextApiKey = this.changeApiKeyNext();
                  if(!nextApiKey){
                    console.log(`❌ NO MORE MODELS OR ACCOUNTS TO EXPLOIT ! ❌ `, );
                    reject(err)
                  }
                }
              }
            }
          });
          return runner.finalMessage().then((msg) => {
            resolve(runner);
          });
        })
        .catch((err) => {
          if (this.isAiError(err)) {
            this?.onError?.(err);
          } else {
            reject(err);
          }
        });
    });
  }

  private changeApiKeyNext() {
    if (this.apiKeys.shift()) {
      this.aiModelsList = [...INITIAL_AI_MODELS];
      this?.onMessage?.({
        role: "assistant",
        content: `🚧 Changing ApiKey: **${this.apiKeys[0]?.slice(4) + "*******" + this.apiKeys[0]?.slice(-4)} **! Please try again!`,
      });
      this.changeAiModel();
      return true
    } else {
      return false
    }
  }

  /**
   * 
   * @returns True if there are more models to be exploited
   */
  private changeAiModel(): boolean {
    const nextModel = this.aiModelsList.shift();
    if(nextModel){
      this.ai = new GeminiAi(nextModel!, this.baseUrl, this.apiKeys[0]!);
      this?.onMessage?.({
        role: "assistant",
        content: `🚧 Changing model: **${this.aiModelsList[0]}**! Please try again!`,
      });
      return true
    } else {
      this?.onMessage?.({
        role: "assistant",
        content: `🚧 No more models or accounts to exploit! Please try again later!`,
      });
      return false
    }
  }

  private isAiError(err: unknown): err is AiError {
    return (err as AiError).status !== undefined;
  }
}
