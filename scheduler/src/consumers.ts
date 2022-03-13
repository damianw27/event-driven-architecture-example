import * as http from 'http';
import { server as Server } from 'websocket';
import Scheduler from './scheduler';
import Consumer from './consumer';

export default function registerConsumers(scheduler: Scheduler): void {
  const server = http.createServer();

  server.listen(4001);

  const ws = new Server({ httpServer: server });

  ws.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    const introduceYourselfConsumer: Consumer = {
      source: 'introduce-yourself-event',
      action: (event) => connection.send(JSON.stringify(event)),
    };

    const messageConsumer: Consumer = {
      source: 'message-event',
      action: (event) => connection.send(JSON.stringify(event)),
    };

    scheduler.subscribe(introduceYourselfConsumer);
    scheduler.subscribe(messageConsumer);
  });
}
