import * as express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import MessagesQueue from './messages-queue';
import Scheduler from './scheduler';
import Message from './message';

export default function registerProducers(
  messagesQueue: MessagesQueue,
  scheduler: Scheduler,
): void {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.get('/rest/list-consumers', (req, res) => {
    res.send(scheduler.getConsumers());
  });

  app.get('/rest/close', () => {
    scheduler.shutdownScheduler();
  });

  app.post('/rest/introduce-yourself', (req, res) => {
    const { name } = req.body;
    const client = scheduler.createNewClient(name);

    const message: Message = {
      created: Date.now(),
      source: 'introduce-yourself-event',
      data: client,
    };

    messagesQueue.enqueue(message);
    res.send(client);
  });

  app.post('/rest/message', (req, res) => {
    const { client, content } = req.body;
    const message: Message = {
      created: Date.now(),
      source: 'message-event',
      data: { client, content },
    };
    messagesQueue.enqueue(message);
    res.sendStatus(200);
  });

  app.listen(4000);
  console.log('express application started at http://localhost:3000!');
}
