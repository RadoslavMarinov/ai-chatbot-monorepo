import OpenAI from "openai";
import { Messages, Tools } from "./types";

export abstract class BaseAi {
  protected ai: OpenAI;
  protected availableModels: string[] = [];

  constructor(
    protected model: string,
    protected baseUrl: string,
    protected apiKey?: string,
  ) {
    this.ai = new OpenAI({
      baseURL: baseUrl,
      apiKey: apiKey,
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

  async runTools(messages: Messages, tools: Tools, model?:string, ){
    const currentModel = model || this.model;
    
    return this.ai.chat.completions.runTools({
      messages,
      tools,
      model: currentModel,
      
      tool_choice: "auto",

    })
  }
}
