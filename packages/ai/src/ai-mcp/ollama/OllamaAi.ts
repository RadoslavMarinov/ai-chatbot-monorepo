import { EnvUtils } from "@repo/utils";
import { BaseAi } from "../BaseAi";
import { OllamaAIEnvVars, OllamaModels } from ".";

export class OllamaAi extends BaseAi{

  constructor(
    protected model: OllamaModels = "llama3.1:8b",
    protected baseUrl: string = EnvUtils.getEnvVariable<OllamaAIEnvVars>("OLLAMA_API_BASE_URL"),
    protected apiKey: string = EnvUtils.getEnvVariable<OllamaAIEnvVars>("OLLAMA_API_KEY")
  ) {
    super(model, baseUrl, apiKey);
  }

  // async runTools(
  //   messages: OllamaMessage[],
  //   tools: OllamaTool[],
  //   toolFunctions: { [key: string]: any },
  //   onMsg: (msg: string) => void
  // ) {
  //   const response = await this.ollama.chat({
  //     model: this.model,
  //     messages: messages,
  //     tools: tools,
  //     stream: true,
  //   });

  //   for await (const chunk of response) {
  //     if (chunk.message.thinking) {
  //       onMsg(chunk.message.thinking);
  //     }
  //     if (chunk.message.content) {
  //       onMsg(chunk.message.content);
  //     }

  //     if (chunk.message.tool_calls) {
  //       for (const tool of chunk.message.tool_calls) {
  //         const functionToCall = toolFunctions[tool.function.name];
  //         if (functionToCall) {
  //           console.log("\nCalling function:", tool.function.name, "with arguments:", tool.function.arguments);
  //           const output = functionToCall(tool.function.arguments);
  //           console.log("> Function output:", output, "\n");

  //           messages.push(chunk.message);
  //           messages.push({
  //             role: "tool",
  //             content: output.toString(),
  //             tool_name: tool.function.name,
  //           });
  //         } else {
  //           console.log("Function", tool.function.name, "not found");
  //         }
  //       }
  //     }
  //   }
  // }
}

function getTemperature(args: { city: string }): string {
  const validCities = ["London", "Paris", "New York", "Tokyo", "Sydney"];

  if (!validCities.includes(args.city)) {
    return "Unknown city";
  }

  return `${Math.floor(Math.random() * 36)} degrees Celsius`;
}

function getConditions(args: { city: string }): string {
  const validCities = ["London", "Paris", "New York", "Tokyo", "Sydney"];

  if (!validCities.includes(args.city)) {
    return "Unknown city";
  }

  const conditions = ["sunny", "cloudy", "rainy", "snowy"];
  return conditions[Math.floor(Math.random() * conditions.length)] as string;
}

// Tool definitions
const getTemperatureTool = {
  type: "function",
  function: {
    name: "getTemperature",
    description: "Get the temperature for a city in Celsius",
    parameters: {
      type: "object",
      required: ["city"],
      properties: {
        city: { type: "string", description: "The name of the city" },
      },
    },
  },
};

const getConditionsTool = {
  type: "function",
  function: {
    name: "getConditions",
    description: "Get the weather conditions for a city",
    parameters: {
      type: "object",
      required: ["city"],
      properties: {
        city: { type: "string", description: "The name of the city" },
      },
    },
  },
};
