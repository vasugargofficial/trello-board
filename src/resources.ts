import {Priority} from "./stores/Store";

export interface Card {
    id: string;
    name: string;
    description?: string;
    priority: Priority;
}

export interface Column {
    id: string;
    name: string;
    cards: Card[];
}
