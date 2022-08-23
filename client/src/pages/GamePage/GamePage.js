import React, { useEffect } from 'react'
import Actions from '../../components/Actions/Actions'
import Bet from '../../components/Bet/Bet'
import CardArea from '../../components/CardArea/CardArea'
import './GamePage.css'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { updateUsers, updateBankValue, updateBetValue, updateDealerCards, updateDealerScore, updateGameOver, updateUser, updateBetArray, updateDeal } from '../../action'
import { toast } from 'react-toastify';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function GamePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Bank = useSelector((state) => state.Bank)
  const dealerScore = useSelector((state) => state.Bank.dealerScore)
  const { bankValue, betValue, isGameOver, user} = Bank
  useEffect(() => {
    socket.on('updatePlayerCards', (connectedUsers) => {
        dispatch(updateUsers(connectedUsers))
        dispatch(updateUser(connectedUsers[user.name]))          
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [socket])
  useEffect(() => {
    socket.on('updateOnGameOver', (connectedUsers) => {
      dispatch(updateUser(connectedUsers[user.name]))
      dispatch(updateUsers(connectedUsers))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(() => {
    setTimeout(() => {
      if (isGameOver) {
        if (user.playerScore > 21) {
          toast.error("BUST", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
          setTimeout(() => {
            toast.success("DEALER WINS", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000
            })
          }, 1000)
        }
        else if (dealerScore > 21) {
          toast.error("BUST", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
          setTimeout(() => {
            toast.success("PLAYER WINS", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000
            })
            dispatch(updateBankValue(bankValue + (2 * betValue)))
          }, 1000)
        }

        else if (dealerScore > user.playerScore) {
          toast.error("DEALER WINS", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
        } else if (dealerScore === user.playerScore) {
          toast.error("PUSH", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
          dispatch(updateBankValue(bankValue + betValue))
        } else if (user.playerScore > dealerScore) {
          toast.success("PLAYER WINS", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
          dispatch(updateBankValue(bankValue + (2 * betValue)))
        }
        setTimeout(() => {
          dispatch(updateDealerScore(0))
          dispatch(updateDealerCards([]))
          dispatch(updateBetValue(0))
          dispatch(updateBetArray([]))
          dispatch(updateDeal(false))
          dispatch(updateGameOver(false))
          socket.emit('onGameOver', user)
          navigate('/bet')
        }, 3000)
      }
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver])
  useEffect(() => {
    if (isEmpty(user)) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='player'>
      <ToastContainer />
      <div className='game-wallet'>
        <div className='game-wallet-header'>
          <p>Bank:
            <strong> ${bankValue}</strong>
          </p>
        </div>
      </div>
      <CardArea userType={'dealer'} />
      <CardArea style={{ bottom: '15px' }} userType={'player'} />
      <div className='actions'>
        <Actions />
      </div>
      <div className='game-bet'>
        <Bet
          page={'gamePage'}
        />
      </div>
    </div>
  )
}
