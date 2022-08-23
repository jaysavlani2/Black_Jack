import React from 'react'
import './Wallet.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateBankValue, updateBetArray, updateBetValue } from '../../action'
export default function Wallet() {
  const dispatch = useDispatch()
  const Bank = useSelector((state) => state.Bank)
  let { bankValue, betValue, betArray } = Bank

  const handleBankValue = (e) => {
    dispatch(updateBankValue(bankValue - parseInt(e.target.value)))
    dispatch(updateBetValue(betValue + parseInt(e.target.value)))
    betArray.push(parseInt(e.target.value))
    dispatch(updateBetArray(betArray))
  }

  const handleAllIn = () => {
    let bkValue = bankValue
    let btValue = betValue
    let btArray = betArray
    while (bkValue > 0) {
      if (bkValue >= 1000) {
        btValue += 1000
        bkValue -= 1000
        btArray.push(1000)
      }
      else if (bkValue >= 500 && bkValue < 1000) {
        btValue += 500
        bkValue -= 500
        btArray.push(500)
      }
      else if (bkValue >= 100 && bkValue < 500) {
        btValue += 100
        bkValue -= 100
        btArray.push(100)
      }
      else if (bkValue >= 50 && bkValue < 100) {
        btValue += 50
        bkValue -= 50
        btArray.push(50)
      }
      else if (bkValue >= 25 && bkValue < 50) {
        btValue += 25
        bkValue -= 25
        btArray.push(25)
      }
      else if (bkValue >= 5 && bkValue < 25) {
        btValue += 5
        bkValue -= 5
        btArray.push(5)
      }
      else if (bkValue >= 1 && bkValue < 5) {
        btValue += 1
        bkValue -= 1
      }
    }
    dispatch(updateBankValue(0))
    dispatch(updateBetValue(btValue))
    dispatch(updateBetArray(btArray))
  }

  return (
    <div className='wallet'>
      <div className='wallet-header'>
        <p>
          Bank:
          <strong> ${bankValue}</strong>
        </p>
        <button className='all-in-button' onClick={handleAllIn} disabled={bankValue === 0}>All In</button>
      </div>
      <div className='tokens'>
        {bankValue >= 1 && <button className='coin-button' onClick={handleBankValue} value={1}>1</button>}
        {bankValue >= 5 && <button className='coin-button' onClick={handleBankValue} value={5}>5</button>}
        {bankValue >= 25 && <button className='coin-button' onClick={handleBankValue} value={25}>25</button>}
        {bankValue >= 50 && <button className='coin-button' onClick={handleBankValue} value={50}>50</button>}
        {bankValue >= 100 && <button className='coin-button' onClick={handleBankValue} value={100}>100</button>}
        {bankValue >= 500 && <button className='coin-button' onClick={handleBankValue} value={500}>500</button>}
        {bankValue >= 1000 && <button className='coin-button' onClick={handleBankValue} value={1000}>1000</button>}
      </div>
    </div>
  )
}
