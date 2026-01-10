import { OpenAIError } from "openai";
import { Message, Tools } from "../../types";
import { GeminiAi } from "../GeminiAi";
import { ChatCompletionMessage } from "openai/resources";

type AiError = OpenAIError & {
  status: number;
};

type GeminiModels = "gemini-3-flash-preview" | "gemini-2.5-flash";

export class GeminiToolRunner {
  private aiModelsList: GeminiModels[] = ["gemini-3-flash-preview", "gemini-2.5-flash"];
  private ai: GeminiAi;
  baseUrl?: string;
  apiKey?: string;
  onMessage?: (msg: Message) => void;
  onError?: (err: Error) => void;

  constructor(
    startWithModel: GeminiModels,
    onMessage?: (msg: Message) => void,
    onError?: (err: Error) => void,
    baseUrl?: string,
    apiKey?: string
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.ai = new GeminiAi(startWithModel, baseUrl, apiKey);
  }

  private changeAiModel(model: GeminiModels) {
    console.log(`🚧 Changing model: ${model}`);
    this.ai = new GeminiAi(model, this.baseUrl, this.apiKey);
  }

  async runTools(messages: Message[], tools: Tools): Promise<ChatCompletionMessage> {
    return new Promise((resolve, reject) => {
      return this.ai
        .runTools(messages, tools)
        .then((runner) => {
          runner.on("message", (message) => {
            console.log(`>>>> AI: ${JSON.stringify(message, null, 2)}`);
            // this?.onMessage?.(message);
          });

          runner.on("error", (err) => {
            if (this.isAiError(err)) {
              if (err.status === 429) {
                this.aiModelsList.shift();
                const nextModel = this.aiModelsList[0];
                if (nextModel) {
                  this?.onMessage?.({ role: "assistant", content: `🚧 Changing model: ${nextModel}` });
                  this.changeAiModel(nextModel);
                  // runner.abort();
                  // this.runTools(messages, tools);
                  return resolve({
                    role: "assistant",
                    refusal: `Changing model: ${nextModel}`,
                    content: `🚧 Changing model: **${nextModel}**! Please try again!`,
                  });
                } else {
                  // this?.onError?.("No more models available. All models exhausted.");
                  reject("No more models available. All models exhausted.")
                }
              }
            }
          });

          return runner.finalMessage();
        })
        .then((finalMessage) => {
          resolve(finalMessage);
        })
        .catch((err) => {
          if(this.isAiError(err)){  
            this?.onError?.(err);
          } else {
            reject(err);
          }
        });
    });
  }

  private isAiError(err: unknown): err is AiError {
    return (err as AiError).status !== undefined;
  }
}
