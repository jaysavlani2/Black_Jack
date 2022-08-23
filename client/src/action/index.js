export const updateBankValue = (data) => {
    return {
        type: "bankValue",
        data: data
    }
}
export const updateBetValue = (data) => {
    return {
        type: "betValue",
        data: data
    }
}
export const updateBetArray = (data) => {
    return {
        type: "betArray",
        data: data
    }
}
export const updateDoubleButton = (data) => {
    return {
        type: "doubleButton",
        data: data
    }
}
export const updateDeal = (data) => {
    return {
        type: "isDeal",
        data: data
    }
}

export const updateDealerCards = (data) => {
    return {
        type: "dealerCards",
        data: data
    }
}
export const updateDealerScore = (data) => {
    return {
        type: "dealerScore",
        data: data
    }
}
export const updateGameOver = (data) => {
    return {
        type: "isGameOver",
        data: data
    }
}
export const updateUser = (data) => {
    return {
        type: 'user',
        data: data
    }
}
export const updateUsers = (data) => {
    return {
        type: 'users',
        data: data
    }
}