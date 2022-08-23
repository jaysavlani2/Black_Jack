const intialState = {
    bankValue: 1000,
    betValue: 0,
    betArray: [],
    isDeal: false,
    isDouble: false,
    dealerCards: [],
    dealerScore: 0,
    isGameOver: false,
    user: {},
    users: [],
};

const Bank = (state = intialState, action) => {
    let new_state
    switch (action.type) {
        case 'bankValue':
            new_state = { ...state }
            new_state.bankValue = action.data
            return new_state
        case 'betValue':
            new_state = { ...state }
            new_state.betValue = action.data
            return new_state
        case 'betArray':
            new_state = { ...state }
            new_state.betArray = action.data
            return new_state
        case 'doubleButton':
            new_state = { ...state }
            new_state.isDouble = action.data
            return new_state
        case 'isDeal':
            new_state = { ...state }
            new_state.isDeal = action.data
            return new_state
        case 'dealerCards':
            new_state = { ...state }
            new_state.dealerCards = action.data
            return new_state
        case 'dealerCardCount':
            new_state = { ...state }
            new_state.dealerCardCount = action.data
            return new_state
        case 'dealerScore':
            new_state = { ...state }
            new_state.dealerScore = action.data
            return new_state
        case 'isGameOver':
            new_state = { ...state }
            new_state.isGameOver = action.data
            return new_state
        case 'user':
            new_state = { ...state }
            new_state.user = action.data
            return new_state
        case 'users':
            new_state = { ...state }
            new_state.users = action.data
            return new_state
        default:
            return state
    }
}
export default Bank;