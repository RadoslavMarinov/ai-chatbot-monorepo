import OpenAI from "openai";
import { Messages, Tools } from "./types";



export abstract class AbstractAi {
  protected ai: OpenAI; //TODO: make protected
  protected availableModels: string[] = [];

  constructor(
    protected baseUrl: string,
    protected apiKey: string
  ) {
    this.ai = new OpenAI({
      baseURL: this.baseUrl,
      apiKey: this.apiKey,
    });
  }

  async listModels() {
    if (this.availableModels.length > 0) {
      return this.availableModels;
    }

    const models = [];
    for await (const model of this.ai.models.list()) {
      models.push(model);
    }
    this.availableModels = models.map((m) => m.id.split("/")[1]).filter(Boolean) as string[];
    return this.availableModels;
  }

  async runTools(model:string,  messages: Messages, tools: Tools ){
    return this.ai.chat.completions.runTools({
      messages,
      tools,
      model: model,
    })
  }
}
