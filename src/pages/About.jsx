import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gameService } from "../services/gameService";


function _About() {
    const { t } = useTranslation()
    var isEn = gameService.loadGame().then(data => {
        return data.lang === 'English' ? true : false
    }).then(e => isEn = e );

    return (
        <section className="app-about ttc pf left-trans" style={{ fontFamily: isEn.then(e => e ? 'montserrat' : 'sans-serif') }}>
            <header>
                <p style={{ letterSpacing: isEn.then(e => e ? '1.3vw' : '') }}>{t('a-welcome')}</p>
                <small>{t('a-small')}</small>
            </header>
            <div>{t('a-div')}</div>
            <footer>
                <p>{t('a-wish')}</p>
            </footer>
            <footer>
                <Link to="/settings">
                    <p>{t('a-lnk-s')}</p>
                </Link>
                <Link to='/play'>
                    <p>{t('a-lnk-p')}</p>
                </Link>
            </footer>
        </section>
    )

}
const mapStateToProps = state => {
    return {
        lang: state.gameModule.game.lang
    }
}
const mapDispatchToProps = {
}
export const About = connect(mapStateToProps, mapDispatchToProps)(_About)