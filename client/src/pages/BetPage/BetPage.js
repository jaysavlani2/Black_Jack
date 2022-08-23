import React, { useEffect } from 'react'
import Bet from '../../components/Bet/Bet'
import Wallet from '../../components/Wallet/Wallet'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

export default function BetPage() {
  const navigate = useNavigate()
  const Bank = useSelector((state) => state.Bank)
  let { user } = Bank
  useEffect(() => {
    if (isEmpty(user)) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Bet />
      <Wallet />
    </>
  )
}
