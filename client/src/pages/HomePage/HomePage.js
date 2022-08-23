import React, { useState } from 'react'
import './HomePage.css'
import io from "socket.io-client";
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../action';
const socket = io.connect("http://localhost:3001");

export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nickname, setNickName] = useState('')
  // const [room, setRoomId] = useState('')
  const [error, setError] = useState(null)

  const setUser = ({ user, isUser }) => {
    if (isUser) {
      setError("User name taken")
    } else {
      setError("")
      dispatch(updateUser(user))
      socket.emit("USER_CONNECTED", user);
      navigate('/lobby')
    }
  }
  const handleUserNameChange = (e) => {
    setNickName(e.target.value)
  }
  // const handleRoomChange = (e) => {
  //   setRoomId(e.target.value)
  // }
  const handleSubmit = () => {
    // if (!isEmpty(nickname) && !isEmpty(room)) {
    //   socket.emit("VERIFY_USER", { nickname, room }, setUser)
    // }
    if (!isEmpty(nickname)) {
      socket.emit("VERIFY_USER", nickname, setUser)
    }

  }

  return (
    <div className="room">
      <label htmlFor="nickname">
        <h2>Got a nickname?</h2>
      </label>
      <input
        className='room-id'
        type="text"
        id="nickname"
        value={nickname}
        onChange={handleUserNameChange}
        placeholder={'UserName..'}
      />
      {/* <input
        className='room-id'
        type="text"
        id="room"
        value={room}
        onChange={handleRoomChange}
        placeholder={'Room..'}
      /> */}
      <div className="error">{error ? error : null}</div>
      <button className='room-id' onClick={handleSubmit}>Join</button>
    </div>
  )
}
