import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { ChatCompletionMessageParam } from 'openai/resources';
import { zodFunction } from 'openai/helpers/zod';
import { BooksModel } from './models/Books/Books.model';
import { z } from 'zod';
import { GeminiAi, GithubAi, OllamaAi } from '@repo/ai';
import {
  AlphaVantageForexApi,
  CryptoSymbol,
  Currency,
  forexMcpTools,
} from '@repo/trading';
// import { GeminiAi } from './lib/ai/GeminiAi/GeminiAi';
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = process.env.PORT || 3002;

const chatHistory: Array<ChatCompletionMessageParam> = [
  {
    role: 'system',
    content: 'Use/call the tools to retrieve data about different data sets.',
  },
];
// const ai = new GithubAi("openai/gpt-4.1-mini");
// const ai = new GeminiAi("gemini-2.0-flash");
const ai = new OllamaAi();

app.get('/', async (req, res) => {
  const data = await new AlphaVantageForexApi().getMonthlyTimeSeries(
    Currency.EUR,
    Currency.USD
  );
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
      chatHistory, //
      [
        ...forexMcpTools,
        zodFunction({
          name: 'listAllBooks',
          description: 'Returns a list of all books',
          parameters: z.object({}),
          function: () => BooksModel.all(),
        }),
        zodFunction({
          name: 'getBookByName',
          description: 'Search queries book by their name',
          parameters: z.object({ name: z.string() }),
          function: ({ name }) => BooksModel.findByName(name),
        }),
        zodFunction({
          name: 'getBookByGenre',
          description: 'Search queries book by their genre',
          parameters: z.object({ genre: z.string() }),
          function: ({ genre }) => BooksModel.findByGenre(genre),
        }),
      ]
    );
    
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
