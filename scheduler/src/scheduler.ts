import { randomUUID } from 'crypto';
import MessagesQueue from './messages-queue';
import Consumer from './consumer';
import Event from './event';
import Message from './message';
import Client from './client';

export default class Scheduler {
  private readonly messagesQueue: MessagesQueue;

  private readonly consumers: Record<string, Consumer[]>;

  private readonly clients: Client[];

  private lastConsumerID: number;

  private mainIntervalID: NodeJS.Timer | undefined;

  constructor(messagesQueue: MessagesQueue) {
    this.messagesQueue = messagesQueue;
    this.consumers = {};
    this.clients = [];
    this.lastConsumerID = 0;
  }

  public subscribe(consumer: Consumer): number {
    if (consumer.registeredID !== undefined) {
      return -1;
    }

    this.lastConsumerID += 1;

    const registeredConsumer: Consumer = {
      registeredID: this.lastConsumerID,
      ...consumer,
    };

    if (this.consumers[consumer.source] === undefined) {
      this.consumers[consumer.source] = [];
    }

    this.consumers[consumer.source].push(registeredConsumer);
    return registeredConsumer.registeredID ?? -1;
  }

  public unsubscribe(consumerID: number) {
    Object.entries(this.consumers).forEach(([source, consumers]) => {
      this.consumers[source] = consumers.filter((consumer) => consumer.registeredID !== consumerID);
    });
  }

  public schedulerLoop(): void {
    this.mainIntervalID = setInterval(() => {
      const message = this.messagesQueue.dequeue();

      if (message === undefined) {
        return;
      }

      console.log(`received '${message.source}' at ${message.created}`);
      const event = Scheduler.createEventFromMessage(message);
      this.emmitEvent(event);
    }, 100);
  }

  public shutdownScheduler(): void {
    if (this.mainIntervalID === undefined) {
      return;
    }

    clearInterval(this.mainIntervalID);
    console.warn('scheduler loop is closed!');
  }

  public getConsumers(): Record<string, Consumer[]> {
    return this.consumers;
  }

  public createNewClient(name: string): Client {
    const client: Client = {
      name,
      uuid: randomUUID(),
    };

    this.clients.push(client);
    return client;
  }

  private static createEventFromMessage(message: Message): Event {
    return <Event> {
      updated: Date.now(),
      ...message,
    };
  }

  private emmitEvent(event: Event) {
    console.log(this.consumers);
    const consumers = this.consumers[event.source];

    if (consumers === undefined) {
      return;
    }

    consumers.forEach((consumer) => consumer.action(event));
  }
}
