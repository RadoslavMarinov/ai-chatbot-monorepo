import OpenAI from "openai";

export type RunToolsArgument = Parameters<typeof OpenAI.prototype.chat.completions.runTools>;
export type Tools = RunToolsArgument[0]["tools"]
export type Messages = RunToolsArgument[0]["messages"]