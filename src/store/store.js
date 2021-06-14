import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { gameReducer } from './reducers/gameReducer.js';
import { userReducer } from './reducers/userReducer.js';
import { itemReducer } from './reducers/itemReducer.js';

const rootReducer = combineReducers({

    userModule: userReducer,
    gameModule: gameReducer,
    itemModule: itemReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


// For Debug
window.theStore = store;
// store.subscribe(() => {
//     console.log('Global State is:', store.getState())
// })
