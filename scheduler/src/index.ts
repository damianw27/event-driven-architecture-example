import MessagesQueue from './messages-queue';
import Scheduler from './scheduler';
import registerConsumers from './consumers';
import registerProducers from './producers';

const messagesQueue = new MessagesQueue();
const scheduler = new Scheduler(messagesQueue);

registerConsumers(scheduler);
registerProducers(messagesQueue, scheduler);

scheduler.schedulerLoop();
