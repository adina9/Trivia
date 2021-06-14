import { userService } from "../../services/userService";

export function loadUser() {
    return async dispatch => {
        try {
            const user = await userService.loadUser()
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err in userAction in loadUser:', err);
        }
    }
}

export function updateNickname(nickname, user) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updateNickname(nickname, user)
            await userService.updateUser(updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in setNickname', err);
        }
    }
}
export function updateUserImage(imgSrc) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updateImgSrc(imgSrc)
            await userService.updateUser(updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in setUserImage:', err);
        }
    }
}

export function updatePointsObj(obj, user) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updatePointsObj(obj)
            await userService.updateUser(updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in updatePointsObj:', err);
        }
    }
}


export function addQuestion(obj) {
    return async dispatch => {
        try {
            const upadtedUser = await userService.addQuestion(obj)
            await userService.updateUser(upadtedUser)

        } catch (err) {
            console.log('err in itemAction in addQuestion:', err);
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await userService.updateUser({
                nickname: '',
                pointsObj: {
                    categories: {
                        nature: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        geography: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        animals: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        personalities: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        movies: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        medicine: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        food: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        sports: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        music: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        science: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        technology: {
                            E: 0,
                            M: 0,
                            H: 0
                        }
                    },
                    countries: {
                        Argentina: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Australia: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Austria: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Belgium: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Brazil: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Canada: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        China: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Colombia: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Denmark: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        England: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Ethiopia: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Finland: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        France: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Germany: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        India: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Israel: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Italy: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Japan: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Mexico: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Morocco: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Philippines: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Poland: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Portugal: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Romania: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Russia: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Spain: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Sweden: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Switzerland: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Thailand: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        Ukraine: {
                            E: 0,
                            M: 0,
                            H: 0
                        },
                        USA: {
                            E: 0,
                            M: 0,
                            H: 0
                        }
                    },
                    fullPoints: 10

                },
                image: {
                    src: '/static/media/user.579e0088.png',
                    bgClr: '#ff955a'
                },
                objectsArray: []
            })
        } catch (err) {
            console.log('err in userAction in logout:', err);
        }
    }
}

