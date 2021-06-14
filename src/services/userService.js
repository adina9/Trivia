import { storageService } from './storage-service.js'

const KEY_DATA = 'dataDB'

var { data } = require('../data/db.json')

export const userService = {
    loadUser,
    updateUser,
    updateNickname,
    updateImgSrc,
    updatePointsObj,
    addQuestion
}
async function loadUser() {
    try {
        if (!await storageService.load(KEY_DATA)) storageService.save(KEY_DATA, data)
        const { user } = await storageService.load(KEY_DATA)
        return user
    } catch (err) {
        console.log('err in userService in loadUser:', err);
    }
}

async function updateUser(user) {
    try {
        var dataDB = await storageService.load(KEY_DATA)
        dataDB = { ...dataDB, user }
        storageService.save(KEY_DATA, dataDB)
    } catch (err) {
        console.log('err in userService in updateUser:', err);
    }
}

async function updateNickname(nickname, currUser) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { user } = data
        user.nickname = nickname
        return user
    } catch (err) {
        console.log('err in userService in updateNickname:', err);
    }
}


async function updateImgSrc(img) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { user } = data
        user.image = img
        return user
    } catch (err) {
        console.log('err in userService in setUserImage:', err);
    }
}

async function updatePointsObj(obj) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { user } = data
        user = { ...user, pointsObj: JSON.parse(JSON.stringify(obj)) }
        return user
    } catch (err) {
        console.log('err in userService in updatePointsObj:', err);
    }
}

async function addQuestion(obj) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { user } = data
        var objectsArray = user.objectsArray
        if (objectsArray.length) objectsArray.push(obj)
        else objectsArray = [obj]
        user = { ...user, objectsArray }
        return user
    } catch (err) {
        console.log('err in itemService in addQuestion:', err);
    }
}

