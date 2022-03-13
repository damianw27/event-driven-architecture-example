import Event from './event';

export default interface Consumer {
    readonly registeredID?: number;
    readonly source: string;
    // eslint-disable-next-line no-unused-vars
    readonly action: (event: Event) => void;
}
