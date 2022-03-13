export default interface Message {
    readonly source: string;
    readonly data: Record<string, any> | string;
    readonly created: number;
}