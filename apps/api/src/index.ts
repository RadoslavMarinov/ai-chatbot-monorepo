import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { ChatCompletionMessageParam } from 'openai/resources';
import { zodFunction } from 'openai/helpers/zod';
import { BooksModel } from './models/Books/Books.model';
import { z } from 'zod';
import {
  BellaDatasource,
  bellaTools,
  GeminiAi,
  GeminiToolRunner,
  GeminiToolWrapper,
  GithubAi,
  NativeTools,
  OllamaAi,
  Tools,
} from '@repo/ai';
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
    ## Dont ask for permission - just use them!`,
  },
];

app.get('/', async (req, res) => {
  // const data = await new AlphaVantageCryptoApi().getCryptoDaily({
  //   symbol: "BTC"
  // })
  // return res.json(data);
  const data = await BellaDatasource.getInformationAboutBella();
  return res.send(data);
});

app.get('/list-models', async (req, res) => {
  // const models = await ai.listModels();
  res.json({});
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  // ------------- AIs ----------------- //

  // const ai = new GithubAi("openai/gpt-4.1-mini");

  // const ai = new GeminiAi('gemini-2.5-flash');
  // const ai = new GeminiToolRunner()
  const ai = new GeminiToolWrapper(chatHistory, [
    ...alphaVantageCryptoTools,
    ...bellaTools,
  ], (msg) => {
    ws.send(msg.content as string);
  })

  // const ai = new OllamaAi("llama3-groq-tool-use:8b");

  ws.on('message', async (message) => {
    console.log(`Received message => ${message}`);
    // chatHistory.push({ role: 'user', content: `${message}` });
    const response = await ai.run(message.toString());

      console.log(`🚀 AI: ${response}\n`);
      // chatHistory.push({ role: 'assistant', content: response.content });
      ws.send(`${response.content}`);
  });

  ws.on('close', () => {
    console.log(`❌ WS Client disconnected`);
  });
  ws.on('error', (err) => {
    console.log(`❌ WS Client error: `, err);
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port} Server is listening on port ${port}`);
});

export default server;


