import { OpenAIError } from "openai";
import { Message, Tools } from "../../../types";


interface AssistantProps {
  onMessage?: (msg: Message) => void;
  onError?: (err: Error) => void;
}

export interface GeminiToolRunnerProps {
  messages: Message[]
  tools?: Tools
  assistant?: AssistantProps
  baseUrl?: string;
}

export type AiError = OpenAIError & {
  status: number;
};
