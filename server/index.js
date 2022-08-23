const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const uuidv4 = require('uuid/v4')
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let connectedUsers = {}
let dealer = {
  dealerCards: [],
  dealerScore: 0,
}

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //Verify Username
  socket.on("VERIFY_USER", (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null })
    } else {
      callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) })

    }
  })

  //User Connects with username
  socket.on("USER_CONNECTED", (user) => {
    user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    io.emit("USER_CONNECTED", connectedUsers)
    console.log(connectedUsers);
  })

  socket.on('DealerInit', () => {
    if (dealer.dealerCards.length === 0) {
      dealer.dealerCards.push(randomCardGenerator(deckBuilder()))
      dealer.dealerScore = updateScore(dealer.dealerCards)
    } else if (dealer.dealerCards.length > 1) {
      dealer.dealerCards = []
      dealer.dealerScore = 0
      dealer.dealerCards.push(randomCardGenerator(deckBuilder()))
      dealer.dealerScore = updateScore(dealer.dealerCards)
    }
    io.emit('getDealerInit', dealer)
    console.log(connectedUsers);
  })
  socket.on('playerCards', (user) => {
    connectedUsers[user.name].playerCards.push(randomCardGenerator(deckBuilder()))
    connectedUsers[user.name].playerCards.push(randomCardGenerator(deckBuilder()))
    connectedUsers[user.name].playerScore=updateScore(connectedUsers[user.name].playerCards)
    io.emit('updatePlayerCards', connectedUsers)
    console.log(connectedUsers);
  })
  socket.on('playerHit', (user) => {
    if (connectedUsers[user.name].playerScore < 22) {
      connectedUsers[user.name].playerCards.push(randomCardGenerator(deckBuilder()))
      connectedUsers[user.name].playerScore = updateScore(connectedUsers[user.name].playerCards)
    }
    io.emit('updateOnHit', connectedUsers)
    console.log(connectedUsers);
  })

  socket.on('playerStand', (user) => {
    connectedUsers[user.name].isStand = true
    io.emit('updateOnStand', connectedUsers)
    console.log(connectedUsers);
  })

  socket.on('playerDouble', (user) => {
    connectedUsers[user.name].playerCards.push(randomCardGenerator(deckBuilder()))
    connectedUsers[user.name].playerScore = updateScore(connectedUsers[user.name].playerCards)
    connectedUsers[user.name].isStand = true
    io.emit('updateOnDouble', connectedUsers)
    console.log(connectedUsers);
  })

  socket.on('updateDealerCards', () => {
    if (dealer.dealerCards.length === 1) {
      dealer.dealerCards.unshift(randomCardGenerator(deckBuilder()))
      dealer.dealerScore = updateScore(dealer.dealerCards)
      while (dealer.dealerScore < 18) {
        dealer.dealerCards.push(randomCardGenerator(deckBuilder()))
        dealer.dealerScore = updateScore(dealer.dealerCards)
      }
    }
    io.emit('updateOnDealerCards', dealer.dealerCards, dealer.dealerScore)
    console.log(connectedUsers);
  })

  socket.on('onGameOver', (user) => {
    connectedUsers[user.name].playerCards=[]
    connectedUsers[user.name].playerScore=0
    connectedUsers[user.name].isStand=false
    dealer.dealerCards=[]
    dealer.dealerScore=0
    io.emit('updateOnGameOver', connectedUsers)
    console.log(connectedUsers);
  })

  //User disconnects
  socket.on('disconnect', () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name)
      console.log("Disconnect", connectedUsers);
      // dealer.dealerCards = []
      // dealer.dealerScore = 0
    }
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

const createUser = ({ name = "", socketId = null } = {}) => {
  return {
    id: uuidv4(),
    name,
    socketId,
    playerScore: 0,
    playerCards: [],
    isStand: false
  }
}
function isUser(userList, username) {
  return username in userList
}
function addUser(userList, user) {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}
function removeUser(userList, username) {
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}
const deckBuilder = () => {
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",];
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const cards = [];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      const value = values[v];
      const suit = suits[s];
      cards.push({ value, suit });
    }
  }
  return cards;
}

const randomCardGenerator = (cards) => {
  const random = Math.floor(Math.random() * 51);
  const cardValue = cards[random].value;
  const cardSuit = cards[random].suit;
  let entity;
  cardSuit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + cardSuit.toLowerCase() + ";");
  return { cardSuit, cardValue, entity }
}

const updateScore = (cards) => {
  let arr = []
  let score = 0
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].cardValue === 'A') {
      arr.push('A')
    } else if (cards[i].cardValue > 1 && cards[i].cardValue < 11) {
      score += parseInt(cards[i].cardValue)
    }
    else if (cards[i].cardValue === 'J' || cards[i].cardValue === 'Q' || cards[i].cardValue === 'K') {
      score += 10
    }
  }
  for (let j = 0; j < arr.length; j++) {
    if (score + 11 <= 21) {
      score += 11
    }
    else {
      score += 1
    }
  }
  return score
}

