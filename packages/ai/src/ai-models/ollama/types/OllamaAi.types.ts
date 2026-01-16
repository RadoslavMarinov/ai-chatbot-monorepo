export type OllamaModels = 
| "llama3-groq-tool-use:8b" // Best for tooling so far!
| "llama3.1:8b" // Not great reasoning but ok

|"lama3-groq-tool-use:latest" // Test this
|"llama3.1:8b" // Test this
|"qwen3:8b" // Test this
// | "aliafshar/gemma3-it-qat-tools:12b" // Works with tools but not impressive
// | "MFDoom/deepseek-r1-tool-calling:14b" // DELETED Does not call tools
//| "devstral-small-2" // DELETED TOO HEAVY  123B parameters
// | "orieg/gemma3-tools:12b" // DELETED TOO HEAVY
//| "mistral:7b" // DELETED Doesnt work well with tools
// | "nexusraven:13b" // DELETED - DOES NOT SUPPORT TOOLS
// |"qwen2.5:7b" // DELETED  - Fucks up responses - replies in Chineese 
// | "gpt-oss:latest" // DELETED - Too heavy CPU Burnout and too slowx§
// | "orieg/gemma3-tools:4b" // DELETED -  Doesn't work with openai - tools = needs a wrapper!
// | "nemotron-mini:4b"  // DELETED  -  Doesn't work with tools at all - it sucks in every aspect
// | "granite3-dense:8b" // DOESNT call  the tools - it sucks!
// | "mixtral:8x7b" // Does not support tools at all!
// | "PetrosStav/gemma3-tools:12b" // DOESNT WORK with tools - it sucks!
// | "gemma3:4b";  //DOESNT work with tools at all


export type OllamaModelsNativeTools = 
|"MFDoom/deepseek-r1-tool-calling:14b"

export type OllamaAIEnvVars = "OLLAMA_API_BASE_URL" | "OLLAMA_API_KEY";


/**
  Tell me what is the exchange rate between Euro and the US dollar
    - "aliafshar/gemma3-it-qat-tools:12b" - 100%
    - llama3.1:8b - 100% GREAT
*/  


/* Call the tools for crypto curency to find out the price of Ethereum 
  - "aliafshar/gemma3-it-qat-tools:12b" - 100%

/**
How many books do you have with genre Fantasy
  - "aliafshar/gemma3-it-qat-tools:12b" - slow, 50%
  - llama3.1:8b - 100% GREAT
 */
