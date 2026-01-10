import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export type RunToolsArgument = Parameters<typeof OpenAI.prototype.chat.completions.runTools>;
export type Tools = RunToolsArgument[0]["tools"]
export type Message = ChatCompletionMessageParam