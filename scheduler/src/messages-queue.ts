import Message from './message';

export default class MessagesQueue {
  readonly messages: Message[];

  constructor() {
    this.messages = [];
  }

  public dequeue(): Message | undefined {
    return this.messages.pop();
  }

  public enqueue(message: Message): void {
    this.messages.push(message);
  }
}
