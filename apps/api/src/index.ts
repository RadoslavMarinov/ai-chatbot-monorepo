import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { ChatCompletionMessageParam } from 'openai/resources';
import { zodFunction } from 'openai/helpers/zod';
import { BooksModel } from './models/Books/Books.model';
import { z } from 'zod';
import { GeminiAi, GithubAi, NativeTools, OllamaAi } from '@repo/ai';
import {
  AlphaVantageForexApi,
  CryptoSymbol,
  Currency,
  forexMcpTools,
  AlphaVantageStockApi,
  StockSymbol,
  stocksMcpTools,
  AlphaVantageCryptoApi,
  CryptoSymbolEnumZod,
  alphaVantageCryptoTools,
} from '@repo/trading';
// import { GeminiAi } from './lib/ai/GeminiAi/GeminiAi';
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = process.env.PORT || 3002;

const chatHistory: Array<ChatCompletionMessageParam> = [
  {
    role: 'system',
    content: `
    # Instructions:
    ## Use the tools to retrieve data!
    ## Dont ask for permission - just use them!
    ## Relying on outdated information can be detrimental. From now on, I will make sure to use the tools for the most accurate information available!`,
  },
];
// const ai = new GithubAi("openai/gpt-4.1-mini");
const ai = new GeminiAi("gemini-3-flash-preview");
// const ai = new OllamaAi("mixtral:8x7b");

app.get('/', async (req, res) => {
  const data = await new AlphaVantageCryptoApi().getCryptoDaily({
    symbol: "BTC"
  })
  return res.json(data);
});

app.get('/list-models', async (req, res) => {
  // const models = await ai.listModels();
  res.json({});
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    console.log(`Received message => ${message}`);
    chatHistory.push({ role: 'user', content: `${message}` });

    const runner = await ai.runTools(
      chatHistory,
      [
        ...alphaVantageCryptoTools,
        // ...stocksMcpTools,
        // ...forexMcpTools,
        // zodFunction({
        //   name: 'listAllBooks',
        //   description: 'Returns a list of all books',
        //   parameters: z.object({}),
        //   function: () => BooksModel.all(),
        // }),
        // zodFunction({
        //   name: 'getBookByName',
        //   description: 'Search queries book by their name',
        //   parameters: z.object({ name: z.string() }),
        //   function: ({ name }) => BooksModel.findByName(name),
        // }),
        // zodFunction({
        //   name: 'getBookByGenre',
        //   description: 'Search queries book by their genre',
        //   parameters: z.object({ genre: z.string() }),
        //   function: ({ genre }) => BooksModel.findByGenre(genre),
        // }),
      ],
    );
    runner.on('message', (message) => {
      // console.log(`>>>> AI: ${JSON.stringify(message,null,2)}`);
    })
    const finalMessage = await runner.finalMessage();
    const response = finalMessage.content as string;
    console.log(`AI: ${response}\n`);
    chatHistory.push({ role: 'assistant', content: response });
    ws.send(`Hello, you sent -> ${response}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port} Server is listening on port ${port}`);
});

export default server;
