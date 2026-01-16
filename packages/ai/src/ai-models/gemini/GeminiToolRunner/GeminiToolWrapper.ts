import { ChatCompletionMessageParam } from "openai/resources";
import { GeminiToolRunner } from ".";
import { Message, Tools } from "../..";

export class GeminiToolWrapper {
  ai: GeminiToolRunner;

  constructor(
    public chatHistory: Array<ChatCompletionMessageParam>,
    public tools: Tools,
    public onSystemMessage?: (msg: Message) => void
  ) {
    this.ai = new GeminiToolRunner({
      messages: this.chatHistory,
      onSystemMessage: this.onSystemMessage,
    });
  }

  async run(msg: string) {
    this.chatHistory.push({ role: "user", content: `${msg}` });
    const runner = await this.ai.runTools(this.chatHistory, this.tools);
    const finalMesssage = await runner.finalMessage();
    this.chatHistory.push(finalMesssage)
    return finalMesssage;
  }
}
