import React, { useEffect } from 'react'
import './Bet.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers, updateUser, updateDealerScore, updateDealerCards, updateBankValue, updateBetValue, updateBetArray, updateDoubleButton, updateDeal } from '../../action'
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
export default function Bet({ page }) {
    const dispatch = useDispatch()
    const Bank = useSelector((state) => state.Bank)
    const navigate = useNavigate();
    let { user, bankValue, betValue, betArray, isDeal, isDouble } = Bank
    
    useEffect(() => {
        socket.on('updateOnDouble', (connectedUsers) => {
            dispatch(updateUsers(connectedUsers))
            dispatch(updateUser(connectedUsers[user.name]))          
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    const handleOnClickDeal = () => {
        if(user.playerCards.length===0){
            socket.emit('playerCards',user)
        }
        dispatch(updateDoubleButton(true))
        dispatch(updateDeal(true))
        socket.emit('DealerInit', {})
        socket.on("getDealerInit", (dealer) => {
            dispatch(updateDealerScore(dealer.dealerScore))
            dispatch(updateDealerCards(dealer.dealerCards))
        })
        navigate('/game')
    }

    const removeBetValue = (e) => {
        if (!isDeal) {
            dispatch(updateBankValue(bankValue + parseInt(e.target.value)))
            dispatch(updateBetValue(betValue - parseInt(e.target.value)))
            betArray.pop(e.target.value)
            dispatch(updateBetArray(betArray))
        }
    }
    const handleDoubleValue = () => {
        dispatch(updateBankValue(bankValue - betValue))
        dispatch(updateBetValue(betValue + betValue))
        dispatch(updateDoubleButton(false))
        let btValue = betValue
        let btArray = betArray
        while (btValue > 0) {
            if (btValue >= 1000) {
                btValue -= 1000
                btArray.push(1000)
            }
            else if (btValue >= 500 && btValue < 1000) {
                btValue -= 500
                btArray.push(500)
            }
            else if (btValue >= 100 && btValue < 500) {
                btValue -= 100
                btArray.push(100)
            }
            else if (btValue >= 50 && btValue < 100) {
                btValue -= 50
                btArray.push(50)
            }
            else if (btValue >= 25 && btValue < 50) {
                btValue -= 25
                btArray.push(25)
            }
            else if (btValue >= 5 && btValue < 25) {
                btValue -= 5
                btArray.push(5)
            }
            else if (btValue >= 1 && btValue < 5) {
                btValue -= 1
                btArray.push(1)
            }
        }
        dispatch(updateBetArray(btArray))
        socket.emit('playerDouble', user)
    }
    return (
        <div className='bet'>
            <div className='bet-tokens'>
                {betValue > 0 && <>
                    <span inputMode='out-in'>
                        {isDouble === true && betValue <= bankValue && <button type="button" className="bet-coin-2x-button" onClick={handleDoubleValue}> X 2 Double </button>}
                        {betArray.map((value, i) =>
                            <button className='bet-coin-button' key={i} value={value} onClick={removeBetValue} style={{ transform: `translateX(${i * -2})` }}>{value}</button>
                        )}
                    </span>
                    <div className='total'>$ {betValue}</div>
                    {
                        page !== 'gamePage' &&
                        <button className='deal-button' onClick={handleOnClickDeal}>Deal</button>
                    }
                </>
                }
            </div>
        </div>
    )
}
