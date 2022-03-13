import Message from './message';

export default interface Event extends Message {
    readonly updated: number;
};
