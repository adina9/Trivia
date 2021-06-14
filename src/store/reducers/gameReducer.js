const initialState = {
    game: {}
}
export function gameReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_GAME': 
            return { ...state, game: action.game }
        default:
            return state
    }
}