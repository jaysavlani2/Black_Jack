import React, { useEffect } from 'react'
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { updateUsers } from '../../action';
import { values } from 'lodash'
import './LobbyPage.css'
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
const socket = io.connect("http://localhost:3001");

export default function LobbyPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Bank = useSelector((state) => state.Bank)
    let { users, user } = Bank

    useEffect(() => {
        socket.on("USER_CONNECTED", (users) => {
            dispatch(updateUsers(values(users)))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (isEmpty(user)) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleStartGame = () => {
        navigate('/bet')
    }
    return (
        <div className='lobby'>
            Users Connected: {users.map((usr, i) =>
                <div key={i}>
                    <div className='lobby-user'>{usr.name}</div>
                </div>
            )}
            <button
                className='room-id'
                onClick={handleStartGame}
            >
                Start Game
            </button>
        </div>
    )
}
