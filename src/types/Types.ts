export type Domain = "google" | "twitter" | "moodys" | "yahoo" | "hotmail";
export type Label = "tag" | "ticket" | "sticker" | "stamp" | "spongebob";

export const Domains:Array<Domain> = ["google", "twitter", "moodys", "yahoo", "hotmail"];
export const Labels:Array<Label> = ["tag", "ticket", "sticker", "stamp", "spongebob"];

export interface RowData {
    id: string,
    name: string,
    description: string,
    domains: Array<Domain>,
    labels: Array<Label>,
    value: number
}