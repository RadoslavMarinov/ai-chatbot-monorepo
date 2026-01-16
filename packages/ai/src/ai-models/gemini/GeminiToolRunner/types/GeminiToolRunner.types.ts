import { OpenAIError } from "openai";
import { Message, Tools } from "../../../types";



export interface GeminiToolRunnerProps {
  messages: Message[]
  tools?: Tools
  onSystemMessage?: (msg: Message) => void;
  onError?: (err: Error) => void;
  baseUrl?: string;
}

export type AiError = OpenAIError & {
  status: number;
};
