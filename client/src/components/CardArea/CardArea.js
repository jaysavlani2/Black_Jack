import React from 'react'
import RandomCard from '../Card/Card'
import './CardArea.css'
import { useSelector } from 'react-redux'

export default function CardArea({ style, userType }) {
  const Bank = useSelector((state) => state.Bank)
  const { dealerCards, dealerScore, user } = Bank
  const getVal = (i) => {
    if (i % 2 === 0) {
      return '-'
    }
    return '+'
  }
  return (
    <div className='card-area' style={style}>
      <div className='cards'>
        <span inputMode='in-out'>
          {
            userType === 'player' ?
              user.playerCards && user.playerCards.map((card, i) =>
                <div key={i}>
                  <RandomCard card={card} style={{ transform: `translateY(-50%) translateX(-50%) translateX(${JSON.stringify(i * 50)}px) rotate(${getVal(i)}3deg)` }} />
                </div>
              ) : dealerCards.length === 1 ?
                <>
                  <RandomCard card={''} style={{ transform: `translateY(-50%) translateX(-50%) translateX(0px) rotate(-3deg)` }} />
                  <RandomCard card={dealerCards[0]} style={{ transform: `translateY(-50%) translateX(-50%) translateX(50px) rotate(3deg)` }} />
                </> : dealerCards.map((card, i) =>
                  <div key={i}>
                    <RandomCard card={card} style={{ transform: `translateY(-50%) translateX(-50%) translateX(${JSON.stringify(i * 50)}px) rotate(${getVal(i)}3deg)` }} />
                  </div>
                )
          }
        </span>
      </div>
      <div>
        <div className='score'>{userType !== 'dealer' ? user.playerScore : dealerScore}</div>
        <div className='owner-name'>{userType !== 'dealer' ? user.name : 'Dealer'}</div>
      </div>
    </div>
  )
}
