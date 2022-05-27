import {Card} from '../../src/resources';
import {observer} from "mobx-react";
import React, {FC} from "react";

export interface ICardProps {
    card: Card
}

// @ts-ignore
const ColumnCard: FC<ICardProps> = observer((props) => {
    return <div className={'column-card p-2'}>
        {props.card.name}
        <div>
            <span className={'badge priority-badge-' + props.card.priority.toLowerCase()}>
                {props.card.priority.toLowerCase()}
            </span>
        </div>
    </div>
})

export default ColumnCard;
