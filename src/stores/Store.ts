import {action, makeObservable, observable} from "mobx";
import {Card, Column} from "../resources";

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export class CardComposerStore {
    showCardComposer: boolean = false;
    cardComposerTitle: string = "";

    constructor() {
        makeObservable(this, {
            showCardComposer: observable,
            cardComposerTitle: observable,
            toggleCardComposer: action,
            setCardComposerTitle: action,
        })
    }

    toggleCardComposer = () => {
        this.showCardComposer = !this.showCardComposer;
    }

    setCardComposerTitle = (value: string) => {
        this.cardComposerTitle = value;
    }
}

export class Store {
    columns: Column[] = [];
    showColumnComposer: boolean = false;
    columnComposerTitle: string = "";

    constructor() {
        makeObservable(this, {
            columns: observable,
            showColumnComposer: observable,
            columnComposerTitle: observable,
            addColumn: action,
            deleteColumn: action,
            addCardInColumn: action,
            deleteCardFromColumn: action,
            toggleColumnComposer: action,
            setColumnComposerTitle: action
        });
    }

    addColumn = (column: Column) => {
        this.columns.push(column);
    }

    deleteColumn = (columnId: string) => {
        this.columns = this.columns.filter(column => column.id !== columnId);
    }

    addCardInColumn = (columnId: string, card: Card) => {
        const column = this.columns.find(column => column.id === columnId);

        if (column) {
            column.cards.push(card);
        }
    }

    deleteCardFromColumn = (columnId: string, cardId: string) => {
        const column = this.columns.find(column => column.id === columnId);
        const card = column?.cards.find(card => card.id === cardId);

        if (column && card) {
            column.cards = column.cards.filter(card => card.id !== cardId);
        }
    }

    saveToStorage = () => {
        localStorage.setItem('columns', JSON.stringify(this.columns));
    }

    setColumnComposerTitle = (value: string) => {
        this.columnComposerTitle = value;
    }

    toggleColumnComposer = () => {
        this.showColumnComposer = !this.showColumnComposer;
    }
}

export const store = new Store();
