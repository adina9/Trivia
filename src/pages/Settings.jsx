import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Howl, Howler } from 'howler';
import i18n from "../services/i18next";
import translate from "translate";

//components:
import { Category } from '../cmps/Category';
import { ToggleWrapper } from '../cmps/ToggleWrapper';
import { Logout } from '../cmps/Logout';

//functions:
import { loadGame, updateSoundStatus, updateSound, updateLang, updateTime, updateTimeStatus, updateLevel, updateUseQStatus, updateCountry } from '../store/actions/gameAction.js'
import { loadUser, logout } from '../store/actions/userAction.js'
import { gameService } from '../services/gameService';

//icons:
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import ClassIcon from '@material-ui/icons/Class';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import SignalCellularNoSimOutlinedIcon from '@material-ui/icons/SignalCellularNoSimOutlined';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

//tunes:
//piano-covers:
import p01 from '../music/piano/01.mp3'
import p02 from '../music/piano/02.mp3'
import p03 from '../music/piano/03.mp3'
import p04 from '../music/piano/04.mp3'
import p05 from '../music/piano/05.mp3'
import p06 from '../music/piano/06.mp3'
import p07 from '../music/piano/07.mp3'
import p08 from '../music/piano/08.mp3'
import p09 from '../music/piano/09.mp3'
import p10 from '../music/piano/10.mp3'
import p11 from '../music/piano/11.mp3'
import p12 from '../music/piano/12.mp3'
import p13 from '../music/piano/13.mp3'
import p14 from '../music/piano/14.mp3'
import p15 from '../music/piano/15.mp3'
import p16 from '../music/piano/16.mp3'
import p17 from '../music/piano/17.mp3'
import p18 from '../music/piano/18.mp3'
import p19 from '../music/piano/19.mp3'

//songs:
import s01 from '../music/songs/01.mp3'
import s02 from '../music/songs/02.mp3'
import s03 from '../music/songs/03.mp3'
import s04 from '../music/songs/04.mp3'
import s05 from '../music/songs/05.mp3'
import s06 from '../music/songs/06.mp3'
import s07 from '../music/songs/07.mp3'
import s08 from '../music/songs/08.mp3'
import s09 from '../music/songs/09.mp3'
import s10 from '../music/songs/10.mp3'
import s11 from '../music/songs/11.mp3'
import s12 from '../music/songs/12.mp3'


var music = {
    overworld: new Howl({
        src: [p01]
    })
}

class _Settings extends Component {

    state = {
        isSoundOn: false,
        selectedSound: null,
        languages: ['English', '??????????'],
        isTimeLevelOn: false,
        timeOps: [60, 90, 120, 240],
        selectedTime: null,
        isCategoryOpen: false,
        levels: [
            { n: 'E', c: '#ff9800' },
            { n: 'M', c: '#FF5733' },
            { n: 'H', c: '#E92337' }
        ],
        selectedLevel: null,
        useQStatus: '',
        tunesArr: [
            {
                title: 'covers',
                tunes: [
                    { s: p01, n: 'Art of silence', isPlaying: false },
                    { s: p02, n: 'friends - aura dione', isPlaying: false },
                    { s: p03, n: 'bach - aria variata', isPlaying: false },
                    { s: p04, n: 'the shadow of your smile', isPlaying: false },
                    { s: p05, n: 'believer', isPlaying: false },
                    { s: p06, n: 'everyone - monplaisir', isPlaying: false },
                    { s: p07, n: 'attention - charlie puth', isPlaying: false },
                    { s: p08, n: 'don\'t stop me now - queen', isPlaying: false },
                    { s: p09, n: 'chandelier - sia', isPlaying: false },
                    { s: p10, n: 'how long - charlie puth', isPlaying: false },
                    { s: p11, n: 'demons - imagine dragons', isPlaying: false },
                    { s: p12, n: 'despacito', isPlaying: false },
                    { s: p13, n: 'shape of you', isPlaying: false },
                    { s: p14, n: 'the hills - the weekend', isPlaying: false },
                    { s: p15, n: 'dance monkey - tones and i', isPlaying: false },
                    { s: p16, n: 'in dreams - scott buckley', isPlaying: false },
                    { s: p17, n: 'can\'t stop my feet', isPlaying: false },
                    { s: p18, n: 'empowered ending', isPlaying: false },
                    { s: p19, n: 'atmosphere', isPlaying: false },
                ]
            },
            {
                title: 'songs',
                tunes: [
                    { s: s01, n: 'faded - alan walker', isPlaying: false },
                    { s: s02, n: 'thank u, next - ariana grande', isPlaying: false },
                    { s: s03, n: 'hallo - beyonce', isPlaying: false },
                    { s: s04, n: 'bad guy - biilie eilish', isPlaying: false },
                    { s: s05, n: 'lovely - billie eilish', isPlaying: false },
                    { s: s06, n: 'my heart will go on - celine dion', isPlaying: false },
                    { s: s07, n: 'perfect - ed sheeran', isPlaying: false },
                    { s: s08, n: 'photograph - ed sheeran', isPlaying: false },
                    { s: s09, n: 'story of life - one direction', isPlaying: false },
                    { s: s10, n: 'what makes you beautiful - one direction', isPlaying: false },
                    { s: s11, n: 'you & i - one direction', isPlaying: false },
                    { s: s12, n: 'fade - tony tucker', isPlaying: false },
                ]
            }
        ]
    }


    async componentDidMount() {
        await this.props.loadGame()
        await this.props.loadUser()
        const { user, history, game } = this.props
        const { soundObj, timeObj, lang, level, useQ, country } = game

        if (!user?.nickname) history?.push("/")

        this.setState({ isSoundOn: soundObj?.soundStatus, useQStatus: useQ, isTimeLevelOn: timeObj?.timeStatus })

        if (!lang) await this.props.updateLang('English')

        if (!country) await this.props.updateCountry(lang === 'English' ? 'Brazil' : '??????????')

        if (!soundObj?.sound) {
            this.setState({ isSoundOn: false, selectedSound: this.state.tunesArr[0].tunes[0] })
            await this.props.updateSound(this.state.tunesArr[0].tunes[0])
            await this.props.updateSoundStatus(this.state.isSoundOn)
        } else this.setState({ selectedSound: soundObj.sound })

        if (!timeObj?.time) {
            this.setState({ isTimeLevelOn: false, selectedTime: 60 })
            await this.props.updateTime(60)
            await this.props.updateTimeStatus(this.state.isTimeLevelOn)
        } else this.setState({ selectedTime: timeObj.time })

        if (!level) {
            this.setState({ selectedLevel: Object.values(this.state.levels)[0] })
            await this.props.updateLevel(this.state.selectedLevel)
        } else this.setState({ selectedLevel: level })

    }

    onUpdateLang = async ({ target }) => {
        await this.props.updateLang(target.value)
        const { country } = this.props?.game
        var currCountry = gameService.tranCountry(target.value, country)
        // await translate(target.value, {key: process.env.TRANSLATE_KEY, from: lang === 'English' ? 'en' : 'he', to: lang === 'English' ? 'he' : 'en' }).then(c => { currCountry = c })
        // await this.props.updateCountry(currCountry)
        await this.props.updateCountry(currCountry)
        i18n.changeLanguage(this.lngForChange(target.value))
    }

    lngForChange = (lng) => lng === 'English' ? 'en' : 'he'

    onCloseCategory = () => this.setState({ isCategoryOpen: false })

    onUpdate = async (key, value) => {

        switch (key) {
            case 'soundStatus':
                this.setState({ isSoundOn: value })
                await this.props.updateSoundStatus(value)
                break
            case 'sound':
                this.setState({ selectedSound: value })
                await this.props.updateSound(value)
                break
            case 'timeStatus':
                this.setState({ isTimeLevelOn: value })
                await this.props.updateTimeStatus(value)
                break
            case 'time':
                this.setState({ selectedTime: value })
                await this.props.updateTime(value)
                break
            case 'level':
                this.setState({ selectedLevel: { ...value } })
                await this.props.updateLevel(value)
                break
            case 'useQ':
                this.setState({ useQStatus: value })
                await this.props.updateUseQStatus(value)
                break
            default:
                break;
        }
    }

    soundPlay = (ev, src, value) => {
        ev.stopPropagation()
        music.overworld.stop()
        this.checkCurrSound(src, value)
        music = { overworld: new Howl({ src }) }
        if (!music.overworld.playing()) music.overworld.play()
    }

    checkCurrSound = (src, value) => {
        var fullTunesArr = this.falseAll()
        fullTunesArr.forEach(arr => arr.tunes.forEach(currSound => {
            if (currSound.s === src) currSound.isPlaying = value
        }))
        this.setState({ tunesArr: fullTunesArr })
    }

    falseAll = () => {
        var fullTunesArr = this.state.tunesArr.slice()
        fullTunesArr.forEach(arr => arr.tunes.forEach(t => t.isPlaying = false))
        return fullTunesArr
    }

    soundStop = (ev, src, value) => {
        ev.stopPropagation()
        this.checkCurrSound(src, value)
        music.overworld.stop()
    }

    componentWillUnmount() {
        music.overworld.stop()
        this.falseAll()
    }

    render() {
        const { languages, isTimeLevelOn, isSoundOn, tunesArr, selectedSound, timeOps, selectedTime, isCategoryOpen, levels, selectedLevel, useQStatus } = this.state
        const { game, isOnDesktop, children } = this.props
        const { category, lang } = game
        var lngs = gameService.setSettLngs()
        return (
            <React.Fragment>
                <section className="settings left-trans">
                    <span className="span-children">{children}</span>

                    <div className="categories">
                        <div>
                            <span><ClassIcon /></span>
                            <p>{lngs["sett-c"][this.lngForChange(lang)]}</p>
                        </div>
                        <div className="to-category flex j-evenly a-center">
                            <p className="pa a-center flex ttc">{category?.name ? category.name.toLowerCase() : <SignalCellularNoSimOutlinedIcon />}</p>
                            <DoubleArrowRoundedIcon onClick={() => this.setState({ isCategoryOpen: true })} />
                        </div>
                    </div>
                    <div className="levels">
                        <div>
                            <span><BarChartRoundedIcon /></span>
                            <p>{lngs["sett-l"][this.lngForChange(lang)]}</p>
                        </div>
                        <div className="level-select flex j-between">
                            {levels.map((l, idx) => <div key={idx} onClick={() => this.onUpdate('level', l)} style={{ border: selectedLevel?.n === l.n && !isOnDesktop ? '2px solid black' : '', backgroundColor: l.c }}>
                                <p style={{ color: selectedLevel?.n === l.n ? 'black' : 'white' }}>{l.n}</p>
                            </div>)}
                        </div>
                    </div>

                    <div style={{ marginBottom: isSoundOn ? 0 : '3%', borderRadius: isSoundOn ? '5px 5px 0 0' : '5px' }}>
                        <div>
                            <span><VolumeUpRoundedIcon /></span>
                            <p>{lngs["sett-s"][this.lngForChange(lang)]}</p>
                        </div>
                        <ToggleWrapper obj={{ value: isSoundOn, key: 'soundStatus' }} onUpdate={this.onUpdate} />
                    </div>
                    <div className={`sound-select ${isSoundOn ? 'open' : ''}`}>
                        <p className="selected-sound pa tas ma">{selectedSound?.n}</p>
                        {tunesArr.map((arr, idx) => <div key={idx}>
                            <p className="piano-p tac">{lngs[`sett-p-${arr.title}`][this.lngForChange(lang)]}</p>
                            <div>
                                {arr.tunes.map((p, idx) => <div className="tune" key={idx} onClick={() => this.onUpdate('sound', p)} style={{ backgroundColor: selectedSound?.n === p.n ? '#ff9800' : '#e8eaed' }}>
                                    {!p.isPlaying && <PlayCircleOutlineIcon onClick={(ev) => this.soundPlay(ev, p.s, true)} />}
                                    {p.isPlaying && <PauseCircleOutlineIcon onClick={(ev) => this.soundStop(ev, p.s, false)} />}
                                    <p>{p.n}</p>
                                </div>)}
                            </div>
                        </div>)}
                    </div>

                    <div style={{ marginBottom: isTimeLevelOn ? 0 : '3%', borderRadius: isTimeLevelOn ? '5px 5px 0 0' : '5px' }}>
                        <div>
                            <span><AccessAlarmRoundedIcon /></span>
                            <p>{lngs["sett-t"][this.lngForChange(lang)]}</p>
                        </div>
                        <ToggleWrapper obj={{ value: isTimeLevelOn, key: 'timeStatus' }} onUpdate={this.onUpdate} />
                    </div>
                    <div className={`time-select flex j-between ${isTimeLevelOn ? 'open' : ''}`}>
                        {timeOps.map((t, idx) => <div key={idx} onClick={() => this.onUpdate('time', t)} style={{ backgroundColor: selectedTime === t ? '#ff9800' : !isOnDesktop ? 'white' : '#151515', boxShadow: selectedTime === t ? '' : '0px 7px 0 #80808014' }}>
                            <p>{t}</p>
                        </div>)}
                    </div>

                    <div>
                        <div>
                            <span><LanguageRoundedIcon /></span>
                            <p>{lngs["sett-lng"][this.lngForChange(lang)]}</p>
                        </div>
                        <select name="languages" onChange={this.onUpdateLang}>
                            {languages.map((l, idx) => <option key={idx} value={l}>{l}</option>)}
                        </select>
                    </div>

                    <div>
                        <div>
                            <span><QuestionAnswerOutlinedIcon /></span>
                            <p>{lngs["sett-useQ"][this.lngForChange(lang)]}</p>
                        </div>
                        <ToggleWrapper obj={{ value: useQStatus, key: 'useQ' }} onUpdate={this.onUpdate} />
                    </div>

                    <Logout logout={this.props.logout} history={this.props.history} />

                </section>
                <Category onClose={this.onCloseCategory} isOnDesktop={isOnDesktop} class={`category-section ${isCategoryOpen ? 'open' : ''}`} />
            </React.Fragment >
        );
    }
}
const mapStateToProps = state => {
    return {
        game: state.gameModule.game,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadGame,
    loadUser,
    updateSound,
    updateSoundStatus,
    updateLang,
    updateTime,
    updateTimeStatus,
    updateLevel,
    updateUseQStatus,
    updateCountry,
    logout
}
export const Settings = connect(mapStateToProps, mapDispatchToProps)(_Settings)

