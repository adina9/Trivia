import { storageService } from "./storage-service";

const KEY_DATA = 'dataDB'


export const itemService = {
    loadItems,
}

async function loadItems() {
    try {
        const { items } = await storageService.load(KEY_DATA)
        return items
    } catch (err) {
        console.log('err in itemService in loadItems:', err);
    }
}



