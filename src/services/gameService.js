import { storageService } from "./storage-service"

const KEY_DATA = 'dataDB'

export const gameService = {
    loadGame,
    updateCategory,
    updateCountry,
    updateSoundStatus,
    updateSound,
    updateLang,
    updateTime,
    updateTimeStatus,
    updateLevel,
    updateRoundIdx,
    updateUseQStatus,
    updateGame,
    getCForDisplay,
    tranCountry,
    setSettLngs
}

async function loadGame() {
    try {
        const { game } = await storageService.load(KEY_DATA)
        return game
    } catch (err) {
        console.log('err in gameService in loadGame:', err);
    }
}

async function updateGame(game) {
    try {
        var data = await storageService.load(KEY_DATA)
        data = { ...data, game }
        storageService.save(KEY_DATA, data)
    } catch (err) {
        console.log('err in gameService in updateGame:', err);
    }
}


async function updateCategory(category) {
    try {
        const { game } = await storageService.load(KEY_DATA)
        game.category = category
        return game
    } catch (err) {
        console.log('err in gameService in updateCategory:', err);
    }
}

async function updateCountry(country) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.country = country
        return game
    } catch (err) {
        console.log('err in gameService in updateCategory:', err);
    }
}

async function updateSoundStatus(status) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.soundObj.soundStatus = status
        return game
    } catch (err) {
        console.log('err in gameAction in updateSoundStatus:', err);
    }
}

async function updateSound(sound) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.soundObj.sound = sound
        return game
    } catch (err) {
        console.log('err in gameService in updateSound:', err);
    }
}

async function updateLang(lang) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.lang = lang
        return game
    } catch (err) {
        console.log('err in gameService in updateLang:', err);
    }
}

async function updateTimeStatus(status) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.timeObj.timeStatus = status
        return game
    } catch (err) {
        console.log('err in gameService in updateTimeStatus:', err);
    }
}

async function updateTime(time) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.timeObj.time = time
        return game
    } catch (err) {
        console.log('err in gameService in updateTime:', err);
    }
}

async function updateLevel(level) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.level = level
        return game
    } catch (err) {
        console.log('err in gameService in updateLevel:', err);
    }
}

async function updateRoundIdx(idx) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.roundIdx = idx
        return game
    } catch (err) {
        console.log('err in gameService in updateRoundIdx:', err);
    }
}

async function updateUseQStatus(status) {
    try {
        const data = await storageService.load(KEY_DATA)
        var { game } = data
        game.useQ = status
        return game
    } catch (err) {
        console.log('err in gameService in updateUseQStatus:', err);
    }
}

function getCForDisplay(val, lang, c) {
    if (lang === 'English') {
        if (val) return c.toLowerCase()
        else return c
    }
    else
        if (val)
            switch (c.toLowerCase()) {
                case 'nature': return 'טבע'
                case 'geography': return 'גיאוגרפיה'
                case 'animals': return 'בעלי חיים'
                case 'personalities': return 'אנשים'
                case 'movies': return 'סרטים'
                case 'medicine': return 'רפואה'
                case 'food': return 'אוכל'
                case 'sports': return 'ספורט'
                case 'music': return 'מוזיקה'
                case 'science': return 'מדע'
                case 'technology': return 'טכנולוגיה'
            }
        else {

            switch (c.slice(0, 1).toUpperCase() + c.slice(1)) {
                case 'Argentina': return 'ארגנטינה'
                case 'Australia': return 'אוסטרליה'
                case 'Austria': return 'אוסטריה'
                case 'Belgium': return 'בלגיה'
                case 'Brazil': return 'ברזיל'
                case 'Canada': return 'קנדה'
                case 'China': return 'סין'
                case 'Colombia': return 'קולומביה'
                case 'Denmark': return 'דנמרק'
                case 'England': return 'אנגליה'
                case 'Ethiopia': return 'אתיופיה'
                case 'Finland': return 'פינלנד'
                case 'France': return 'צרפת'
                case 'Germany': return 'גרמניה'
                case 'India': return 'הודו'
                case 'Israel': return 'ישראל'
                case 'Italy': return 'איטליה'
                case 'Japan': return 'יפן'
                case 'Mexico': return 'מקסיקו'
                case 'Morocco': return 'מרוקו'
                case 'Philippines': return 'פיליפינים'
                case 'Poland': return 'פולין'
                case 'Portugal': return 'פורטוגל'
                case 'Romania': return 'רומניה'
                case 'Russia': return 'רוסיה'
                case 'Spain': return 'ספרד'
                case 'Sweden': return 'שוודיה'
                case 'Switzerland': return 'שווייץ'
                case 'Thailand': return 'תאילנד'
                case 'Ukraine': return 'אוקראינה'
                case 'USA': return 'ארצות הברית'
            }
        }
}

function tranCountry(lang, country) {
    var arr = [
        ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'England', 'Ethiopia', 'Finland', 'France', 'Germany', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Morocco', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Ukraine', 'USA'],
        ['ארגנטינה', 'אוסטרליה', 'אוסטריה', 'בלגיה', 'ברזיל', 'קנדה', 'סין', 'קולומביה', 'דנמרק', 'אנגליה', 'אתיופיה', 'פינלנד', 'צרפת', 'גרמניה', 'הודו', 'ישראל', 'איטליה', 'יפן', 'מקסיקו', 'מרוקו', 'פיליפינים', 'פולין', 'פורטוגל', 'רומניה', 'רוסיה', 'ספרד', 'שוודיה', 'שווייץ', 'תאילנד', 'אוקראינה', 'ארצות הברית']
    ]
    var currCountry = arr[lang === 'English' ? 0 : 1][(arr[lang === 'English' ? 1 : 0]).findIndex(c => c === country)]
    return currCountry
}

function setSettLngs() {
    return {
        "sett-c": {
            en: 'Category',
            he: 'קטגוריה'
        },
        "sett-l": {
            en: 'Level',
            he: 'רמה'
        },
        "sett-s": {
            en: 'Sound',
            he: 'מוזיקה'
        },
        "sett-p-covers": {
            en: 'Piano Covers',
            he: "קאברים (פסנתר)",
        },
        "sett-p-songs": {
            en: 'Songs',
            he: "שירים",
        },
        "sett-t": {
            en: 'Round Time',
            he: "משך סיבוב"
        },
        "sett-lng": {
            en: 'Language',
            he: "שפה"
        },
        "sett-useQ": {
            en: 'Use Your Questions',
            he: "שימוש בשאלות שנוספו"
        }
    }
}