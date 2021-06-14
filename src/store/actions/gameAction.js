
import { gameService } from "../../services/gameService";


export function loadGame() {
    return async dispatch => {
        try {
            const game = await gameService.loadGame()
            dispatch({ type: 'SET_GAME', game })
        } catch (err) {
            console.log('err in gameAction in loadGame:', err);
        }
    }
}

export function updateCategory(category) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateCategory(category)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateCategory:', err);
        }
    }
}

export function updateCountry(country) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateCountry(country)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateCountry:', err);
        }
    }
}

export function updateSoundStatus(status) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateSoundStatus(status)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateSoundStatus:', err);
        }
    }
}

export function updateSound(sound) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateSound(sound)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateSound:', err);
        }
    }
}

export function updateLang(lang) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateLang(lang)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gamaAction in updateLang:', err);
        }
    }
}

export function updateTime(time) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateTime(time)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateTime:', err);
        }
    }
}

export function updateTimeStatus(time) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateTimeStatus(time)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateTimeStatus:', err);
        }
    }
}

export function updateLevel(level) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateLevel(level)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateLevel:', err);
        }
    }
}

export function updateRoundIdx(idx) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateRoundIdx(idx)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err in gameAction in updateRoundIndex:', err);
        }
    }
}

export function updateUseQStatus(status) {
    return async dispatch => {
        try {
            const updatedGame = await gameService.updateUseQStatus(status)
            gameService.updateGame(updatedGame)
            dispatch({ type: 'SET_GAME', game: updatedGame })
        } catch (err) {
            console.log('err ingameAction in updateQStatus:', err);
        }
    }
}


