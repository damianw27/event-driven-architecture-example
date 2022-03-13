import Client from './client';

export default interface Messages {
  readonly client: Client;
  readonly messages: string[];
}
