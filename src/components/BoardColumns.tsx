import {observer} from "mobx-react";
import React from "react";
import {IStore} from "../App";
import {Button, Form} from "react-bootstrap";
import {CardComposerStore, Priority, Store} from "../stores/Store";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {Column} from "../resources";
import {Trash3} from "react-bootstrap-icons";
import {Droppable, Draggable} from "react-beautiful-dnd";
import ColumnCard from "./ColumnCard";


const BoardColumns = observer((props: IStore) => {
    const {store} = props;

    return <>
        {
            store.columns.map(column => {
                const cardStore = new CardComposerStore();
                return <ColumnItem cardStore={cardStore} column={column} store={store}/>
            })
        }
    </>
})

export interface IColumnProps {
    column: Column,
    store: Store,
    cardStore: CardComposerStore
}

const ColumnItem = observer(({column, store, cardStore}: IColumnProps) => {
    return <div key={column.id} className='board-column-wrap'>
        <div className='board-column-content'>
            <div className='d-flex justify-content-between align-items-center p-2'>
                <span className={'fw-bold'}>
                    {column.name}
                </span>
                <Trash3 size={14} onClick={() => store.deleteColumn(column.id)}/>
            </div>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className='cards-container' ref={provided.innerRef} {...provided.droppableProps}>
                        {column.cards.map((card, index) => (
                            <Draggable
                                key={card.id}
                                draggableId={card.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <ColumnCard key={card.id} card={card}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {cardStore.showCardComposer && <div className={'column-card p-2'}>
                <Form.Control
                    size={'sm'}
                    as={'textarea'}
                    value={cardStore.cardComposerTitle}
                    onChange={(e) => cardStore.setCardComposerTitle(e.target.value)}
                    placeholder="Enter a title for this card..."/>
                <div className='d-flex justify-content-center pt-2'>
                    <Button
                        className='btn-sm btn-info me-2'
                        onClick={() => {
                            if (!cardStore.cardComposerTitle.trim().length) {
                                return;
                            }

                            store.addCardInColumn(column.id, {
                                id: generateUniqueID(),
                                name: cardStore.cardComposerTitle,
                                priority: Priority.MEDIUM
                            });
                            cardStore.toggleCardComposer();
                            cardStore.setCardComposerTitle('');
                        }}
                    >{'Add card'}</Button>
                    <Button
                        className={'btn-sm btn-danger'}
                        onClick={() => {
                            cardStore.toggleCardComposer();
                            cardStore.setCardComposerTitle('');
                        }}>{'Cancel'}</Button>
                </div>
            </div>}
            {!cardStore.showCardComposer && <div>
                <div
                    className='py-1 px-2 my-1 mx-2 add-card rounded'
                    onClick={cardStore.toggleCardComposer}
                >
                    {'+ Add Card'}
                </div>
            </div>
            }
        </div>
    </div>
})

export default BoardColumns;
