import React from 'react'
import { decode } from 'html-entities';
import './Card.css'
export default function RandomCard({ style, card }) {
    return (
        <div
            className={'playing-card '.concat(card?.cardSuit).toLowerCase()}
            style={style}
        >
            {card === '' ?
                <>
                    <div className='empty-card'>
                        <div className='empty-inner'></div>
                    </div>
                </> :
                <>
                    <span className="card-value-suit top">{card.cardValue} {decode(card.entity)}</span>
                    <span className="card-suit"> {decode(card.entity)}</span>
                    <span className="card-value-suit bot">{card.cardValue} {decode(card.entity)}</span>
                </>
            }
        </div>

    )
}