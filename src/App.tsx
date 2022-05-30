import React from 'react';
import './App.css';
import {observer} from "mobx-react";
import Header from "./components/Header";
import BoardColumns from "./components/BoardColumns";
import {Store} from "./stores/Store";
import {Button, Form} from "react-bootstrap";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { DragDropContext} from "react-beautiful-dnd";

export interface IStore {
    store: Store;
}

const App = observer((props: IStore) => {
    const {store} = props;

    return (
        <div className={'App-container'}>
        <div className='layout'>
            <Header/>
            <DragDropContext
                onDragEnd={(result) => {
                    const srcColumnId = result.source.droppableId;
                    const desColumnId = result.destination?.droppableId;
                    const srcIndex = result.source.index;
                    const desIndex = result.destination?.index;

                    if (desIndex && desColumnId) {
                        const card = store.columns.find(column => column.id === srcColumnId)?.cards[srcIndex];
                        if (card) {
                            store.columns.find(column => column.id === srcColumnId)?.cards.splice(srcIndex, 1);
                            store.columns.find(column => column.id === desColumnId)?.cards.splice(desIndex, 0, card);
                        }
                    }
                }}
            >
                <div className='content-main p-4'>
                <BoardColumns {...props}/>
                <div className={'add-column-btn-container'}>

                    {!store.showColumnComposer ?
                        <Button
                            className={'ml'}
                            variant={'outline-info'}
                            onClick={store.toggleColumnComposer}
                        >
                            {'+ Add new list'}
                        </Button>
                        :
                        <div className={'column-card p-2'}>
                            <Form.Control
                                size={'sm'}
                                as={'textarea'}
                                value={store.columnComposerTitle}
                                onChange={(e) => store.setColumnComposerTitle(e.target.value)}
                                placeholder="Enter a title for this list..."/>
                            <div className='d-flex justify-content-center pt-2'>
                                <Button
                                    className='btn-sm btn-info me-2'
                                    onClick={() => {
                                        if (!store.columnComposerTitle.trim().length) {
                                            return;
                                        }

                                        store.addColumn({
                                            id: generateUniqueID(),
                                            name: store.columnComposerTitle,
                                            cards: []
                                        });
                                        store.toggleColumnComposer();
                                        store.setColumnComposerTitle('');
                                    }}
                                >{'Add List'}</Button>
                                <Button
                                    className={'btn-sm btn-danger'}
                                    onClick={() => {
                                        store.toggleColumnComposer();
                                        store.setColumnComposerTitle('');
                                    }}>{'Cancel'}</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            </DragDropContext>
        </div>
        </div>
    );
})

export default App;
