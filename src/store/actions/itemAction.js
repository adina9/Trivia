import { itemService } from '../../services/itemService.js'

export function loadItems() {
    return async dispatch => {
        try {
            const items = await itemService.loadItems()
            dispatch({ type: 'SET_ITEMS', items })
        } catch (err) {
            console.log('err in itemAction in loadItems:', err);
        }
    }
}


