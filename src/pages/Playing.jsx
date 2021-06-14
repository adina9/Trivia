import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Howl } from 'howler';
import { gameService } from '../services/gameService.js';

//cmps:
import { RoundIsFinished } from '../cmps/RoundIsFinished.jsx';
import { Timer } from '../cmps/Timer.jsx';
import { DynamicChildCmp } from '../cmps/DynamicChildCmp.jsx';

//functions:
import { loadGame, updateRoundIdx, updateLevel } from '../store/actions/gameAction.js'
import { loadItems } from '../store/actions/itemAction.js'
import { loadUser, updatePointsObj } from '../store/actions/userAction.js'
import { Loading } from '../cmps/Loading.jsx';

//imgs:
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'


var music = {
    overworld: new Howl({ src: [''] })
}

class _Playing extends Component {

    state = {
        items: [],
        roundIndex: null,
        firstC: '',
        objIndex: 0,
        q: '',
        answers: [],
        correctAns: '',
        correctCounter: 0,
        answersClass: 'come',
        countryQ: false,
        currCategory: '',
        currCountry: '',
        IndicationClass: 'indication-label flex',
        indicationClassObj: '',
        isSpliced: false,
        roundIsFinished: false,
        isTimeOver: false,
        isResetTime: false,
        isFinishLevel: false,
        roundFinishObj: '',
        isCategoryFinished: false,
    }

    async componentDidMount() {

        await this.props.loadUser()
        await this.props.loadGame()
        await this.props.loadItems()

        const { game, user, items, history } = this.props
        const { soundObj, useQ, level, lang, roundIdx, category, country } = game
        if (!user?.nickname) history.push("/")

        if (roundIdx === null) {
            this.setState({ roundIndex: 0 })
            await this.props.updateRoundIdx(0)
        } else this.setState({ roundIndex: roundIdx })

        if (!level) this.props.updateLevel({ n: 'E', c: '#ff9800' })
        this.setState({
            currCategory: gameService.getCForDisplay(true, lang, category?.name),
            currCountry: country,
            firstC: lang === 'English' ? 'nature' : 'טבע',
            items: useQ ? this.spliceItems(items[lang], this.transObjArr(lang, user.objectsArray)) : items[lang],
            isCategoryFinished: false
        })

        if (soundObj.soundStatus) this.playMusic(true)
        this.startRound()
    }
    transObjArr = (lang, arr) => {
        var a = arr.map(obj => obj = {
            ...obj,
            c: gameService.getCForDisplay(obj.c.substr(0, 1) === obj.c.substr(0, 1).toUpperCase() ? false : true, lang, obj.c),
            object: lang === 'English' ? { ...obj.object } : {
                ...obj.object,
                correct_answer: obj.object.incorrect_answers.length > 2 ? obj.object.correct_answer : obj.object.correct_answer === 'True' ? 'נכון' : 'לא נכון',
                incorrect_answers: obj.object.incorrect_answers.length > 2 ? [...obj.object.zincorrect_answers] : obj.object.incorrect_answers === ['True'] ? ['נכון'] : ['לא נכון']
            }
        })
        return a
    }

    componentWillUnmount() {
        music.overworld.stop()
    }

    playMusic = (val) => {
        const { soundStatus, sound } = this.props.game.soundObj
        music = { overworld: new Howl({ src: sound.s, loop: true, volume: 0.6 }) }
        if (soundStatus)
            if (val) {
                if (!music.overworld.playing()) music.overworld.play()
            } else music.overworld.fade(1, 0, 1000, music.overworld.play())
    }

    spliceItems = (items, objectsArray) => {
        let { firstC } = this.state
        var currLocation
        objectsArray.forEach((obj, idx) => {
            for (let location in items) {
                var objectLocation = (Object.keys(items[location]).some(k => k === firstC)) ? items.categories : items.countries
                for (let currObjName in objectLocation) {
                    if (currObjName === obj.c) currLocation = objectLocation === items.categories ? objectLocation[currObjName][obj.level][this.state.roundIndex] : objectLocation[currObjName][obj.level]
                }
            }
            currLocation[idx] = obj.object
            currLocation[idx]["isSpliced"] = true
        })
        return items
    }

    startRound = () => {
        var { currCategory, items } = this.state
        this.setState({ correctCounter: 0 })
        this.getFullNextObject(currCategory, items.categories)
    }

    getFullNextObject = (objectName, objectLocation) => {

        setTimeout(() => {

            this.setState({ answersClass: 'come' })

            let { answers, objIndex } = this.state
            answers = this.objectAnswers(objectName, objectLocation).map(a => a = {
                txt: this.props?.game?.lang === 'English' ? a.slice(0, 1).toUpperCase() + a.slice(1) : a,
                bgClr: 'white'
            })

            this.setState({
                q: this.currObject(objectName, objectLocation).question,
                answers,
                correctAns: this.correctAnswer(objectName, objectLocation),
                objIndex: objIndex === 10 ? 0 : objIndex + 1,
                isSpliced: this.checkSplice(objectName, objectLocation)
            }, () => {
                this.setState({
                    IndicationClass: this.state.isSpliced || this.state.objIndex === 10 ? 'indication-label flex show' : 'indication-label flex',
                    indicationClassObj: this.indicationClassObj,
                    roundFinishObj: this.roundFinishObj
                })
            })
        }, 500)
    }


    currObject = (objectName, objectLocation) => {
        console.log(objectName, objectLocation);
        let { roundIndex, objIndex, firstC } = this.state
        const { n } = this.props?.game?.level
        var currLocation
        for (let currObjName in objectLocation) {
            if (currObjName === objectName) currLocation = objectLocation[currObjName]
        }
        return Object.keys(objectLocation)[0] === firstC ? currLocation[n][roundIndex][objIndex] : currLocation[n][roundIndex]
    }

    correctAnswer = (objectName, objectLocation) => this.currObject(objectName, objectLocation).correct_answer

    objectAnswers = (objectName, objectLocation) => {
        let currQObject = this.currObject(objectName, objectLocation)
        return this.shuffleAnswers([currQObject.correct_answer, ...currQObject?.incorrect_answers])
    }

    checkSplice = (objectName, objectLocation) => this.currObject(objectName, objectLocation).isSpliced

    shuffleAnswers = (arr) => {
        var copyArr = arr.slice()
        var i, x, j
        for (i = copyArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = copyArr[i]
            copyArr[i] = copyArr[j]
            copyArr[j] = x
        }
        return copyArr
    }

    checkAnswer = async (ev, answer) => {
        ev.preventDefault()
        let { answers, objIndex, correctCounter, items, correctAns, currCategory, currCountry } = this.state
        const { level } = this.props?.game
        const { pointsObj } = this.props?.user

        let currAnswerIdx = answers.findIndex(currAns => currAns === answer)
        let { bgClr } = answers[currAnswerIdx]
        if (answer.txt === correctAns) {
            bgClr = '#47bd47d1'
            this.setState({ correctCounter: correctCounter + 1, countryQ: objIndex === 10 ? true : false },
                async () => {
                    let objectLocation = this.state.countryQ ? pointsObj.countries : pointsObj.categories
                    let isCategoryObject = this.state.countryQ ? false : true
                    await this.props.updatePointsObj(this.calcPointsObj(pointsObj.fullPoints + (this.state.countryQ ? 15 : 10), objectLocation, isCategoryObject))
                })
        } else bgClr = '#ff3737c2'

        answers[currAnswerIdx].bgClr = bgClr
        this.setState({ answers })

        if (objIndex === 10) setTimeout(() => this.setState({ roundIsFinished: true, isCategoryFinished: level.n === 'H' ? true : false }), 300)
        else {
            let objectLocation = objIndex === 9 ? items.countries : items.categories
            let objectName = objIndex === 9 ? currCountry : currCategory.toLowerCase()
            setTimeout(() => this.setState({ answersClass: 'leave' }), 200)
            setTimeout(() => this.getFullNextObject(objectName, objectLocation), 300)
        }
    }

    calcPointsObj = (fullPoints, objectLocation, isCategoryObject) => {
        const { level } = this.props.game
        const { pointsObj } = this.props.user
        var { currCategory, currCountry } = this.state
        var copyPointsObj = pointsObj
        const objectName = isCategoryObject ? currCategory.toLowerCase() : currCountry
        for (let currObject in objectLocation) {
            if (currObject === objectName) objectLocation[currObject][level.n] += isCategoryObject ? 10 : 15
        }
        copyPointsObj.fullPoints = fullPoints
        return copyPointsObj
    }

    onTimeIsOver = () => this.setState({ roundIsFinished: true, isTimeOver: true })

    onUpdateRoundIdx = async (updatedRoundIdx) => {
        this.setState({ roundIndex: updatedRoundIdx })
        await this.props.updateRoundIdx(updatedRoundIdx)
    }

    continue = async (status) => {

        let { roundIndex } = this.state
        setTimeout(() => this.setState({ roundIsFinished: false, isResetTime: true }), 300)

        switch (status) {
            case 'round':
                await this.props.updateRoundIdx(roundIndex + 1)
                this.setState({ roundIndex: roundIndex + 1, objIndex: 0 }, () => this.startRound())
                break
            case 'finish':
                this.finishLevel()
                this.setState({ objIndex: 0 }, () => this.startRound())
                break
            default:
                this.setState({ objIndex: 0 }, () => this.startRound())
                break
        }

    }

    finishLevel = async () => {
        this.setState({ isFinishLevel: true, roundIndex: 0 })
        await this.props.updateRoundIdx(0)
        if (this.levelForUpdate) await this.props.updateLevel(this.levelForUpdate)
        else this.finishCategory()
    }

    get levelForUpdate() {
        switch (this.props.game.level.n) {
            case 'E': return { n: 'M', c: '#FF5733' }
            case 'M': return { n: 'H', c: '#E92337' }
            case 'H': return { n: false }
            default: return this.props.game.level //this is why it stays at the same category...
        }
    }

    finishCategory = () => this.setState({ isCategoryFinished: true })
    onTurnResetTimeOff = () => this.setState({ isResetTime: false })

    get roundFinishObj() {
        var { objIndex, roundIndex } = this.state
        var isEn = this.props.game.lang === 'English' ? true : false

        if (objIndex === 10) {
            if (roundIndex === 9) return isEn ? {
                status: 'finish',
                largeTxt: 'level completed!',
                littleTxt: 'congratulations!',
                continueTxt: 'next level'
            } : {
                status: 'finish',
                largeTxt: 'סיימת שלב!',
                littleTxt: 'מזל טוב!',
                continueTxt: 'שלב הבא'
            }
            else return isEn ? {
                status: 'round',
                largeTxt: 'round completed',
                littleTxt: 'Let\'s see your results',
                continueTxt: 'next round'
            } : {
                status: 'round',
                largeTxt: 'סיימת סיבוב!',
                littleTxt: 'התוצאות שלך',
                continueTxt: 'הסיבוב הבא'
            }
        } else return isEn ? {
            status: 'time',
            largeTxt: 'time is over...',
            littleTxt: 'Better luck next time!',
            continueTxt: 'try again'
        } : {
            status: 'time',
            largeTxt: '...נגמר הזמן',
            littleTxt: 'בהצלחה בפעם הבאה!',
            continueTxt: 'נסה/י שוב'
        }
    }

    get indicationClassObj() {
        var isEn = this.props.game.lang === 'English' ? true : false
        var { isSpliced, objIndex } = this.state
        if (isSpliced) var finalObj = { c: objIndex === 10 ? '#e96b3c' : '#937c37', txt: isEn ? 'Your Question' : 'השאלה שלך', status: true }
        else if (objIndex === 10) finalObj = { c: '#6a6a6a', txt: isEn ? 'Country Question' : 'שאלת מדינה', status: false }
        return finalObj
    }

    get qForDisplay() {
        const { q, answers } = this.state
        var english = /^[A-Za-z0-9]*$/
        var check = false
        var i = q.length
        while (i--) {
            if (english.test(q[i])) check = true
        }
        return answers.length > 2 ? check ? q + '?' : '?' + q : q
    }

    ansLength = () => this.state.answers.some(ans => ans.txt.length > 50)

    render() {
        const { category, level, roundIdx, timeObj, lang } = this.props?.game
        const { pointsObj } = this.props?.user
        const { answers, objIndex, roundIsFinished, IndicationClass, isResetTime, indicationClassObj, roundFinishObj, isCategoryFinished, countryQ, correctCounter, answersClass, currCountry } = this.state
        if (!this.state || !this.props) return <Loading />
        return (
            <React.Fragment>

                <section className="playing" style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif' }}>

                    <header className="flex j-between">
                        <div><p>{`${objIndex}/10`}</p></div>

                        {timeObj?.timeStatus && <Timer time={timeObj?.time} timeIsOver={this.onTimeIsOver} roundIsFinished={roundIsFinished} isResetTime={isResetTime} turnResetTimeOff={this.onTurnResetTimeOff} />}

                        <Link to={"/settings"}> <div style={{ backgroundColor: level?.c }}>
                            <img src={category?.src} alt="" />
                            <p>{level?.n}</p>
                        </div>
                        </Link>
                    </header>

                    <div className="main-container" style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif' }}>
                        <div className="q flex j-center">
                            <div style={{ backgroundColor: indicationClassObj?.c, flexDirection: lang === 'English' ? 'row' : 'row-reverse' }} className={IndicationClass}>
                                <p>{indicationClassObj?.txt}</p>
                                {!indicationClassObj?.status && <p>{currCountry}</p>}
                            </div>
                            <p>{this.qForDisplay}</p>
                        </div>
                        <div className={`options ${answersClass}`}>
                            {answers.map((ans, idx) => <div key={idx} onClick={(ev) => this.checkAnswer(ev, ans)} style={{ backgroundColor: ans.bgClr, padding: ans.txt.length > 50 ? '3%' : '5%', fontSize: this.ansLength() || ans.txt.length > 50 ? 'smaller' : 'unset' }}>{ans.txt}</div>)}
                        </div>
                    </div>
                    <div className="backImgs">
                        <img src={finish} alt="" />
                        <img src={clock} alt="" />
                        <img src={round} alt="" />
                        <img src={round} alt="" />
                        <img src={finish} alt="" />
                    </div>
                    <div className={`back-shadow ${roundIsFinished ? 'dark' : ''}`} ></div>
                </section>

                <RoundIsFinished lang={lang} updateRoundIdx={this.onUpdateRoundIdx} currRound={roundIdx} className={`roundIsFinished ${roundIsFinished ? 'show' : ''}`} roundIsFinished={roundIsFinished} points={pointsObj?.fullPoints} countryQ={countryQ} correctCounter={correctCounter}>
                    <DynamicChildCmp lang={lang} continue={this.continue} roundFinishObj={roundFinishObj} isCategoryFinished={isCategoryFinished} />
                </RoundIsFinished>

            </React.Fragment >
        )
    }
}


const mapStateToProps = state => {
    return {
        game: state.gameModule.game,
        user: state.userModule.user,
        items: state.itemModule.items,
    }
}
const mapDispatchToProps = {
    loadGame,
    loadUser,
    loadItems,
    updatePointsObj,
    updateRoundIdx,
    updateLevel
}
export const Playing = connect(mapStateToProps, mapDispatchToProps)(_Playing)