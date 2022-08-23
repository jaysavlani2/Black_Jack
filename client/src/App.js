import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import BetPage from './pages/BetPage/BetPage';
import GamePage from './pages/GamePage/GamePage';
import Deck from './components/Deck/Deck';
import HomePage from './pages/HomePage/HomePage';
import LobbyPage from './pages/LobbyPage/LobbyPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='board'>
        <div className='board-bg'></div>
        <div className='board-content'>
          <div className='game'>
            <Deck />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/bet" element={<BetPage />} />
                <Route path="/lobby" element={<LobbyPage />} />
              </Routes>
            </BrowserRouter>
            {/* <HomePage />
            {/* <Deck />
            {isDeal === true ? <GamePage /> : <BetPage />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
