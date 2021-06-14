const initialState = {
    items: [],
}
export function itemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.items }
        default: return state
    }
}