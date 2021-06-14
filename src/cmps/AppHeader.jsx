import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import $ from "jquery";

import { Settings } from '../pages/Settings'
import { Logout } from './Logout'
import { Home } from '../pages/Home';


import avatarSrc from '../assets/imgs/user.png'
import logoSrc from '../assets/imgs/bookLogo.png'

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { loadUser, logout } from '../store/actions/userAction.js'


import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'

class _AppHeader extends Component {

    state = {
        className: 'menu',
        menuOptions: [{ txt: 'home', to: 'home' }, { txt: 'adding', to: 'adding' }, { txt: 'dashboard', to: 'dashboard' }, { txt: 'settings', to: 'settings' }, { txt: 'about', to: 'about' }],
        sideMenuOptions: [{ txt: 'home', to: 'about' }, { txt: 'editor', to: 'adding' }, { txt: 'dashboard', to: 'dashboard' }],
        isSettingsOpen: false,
        isProfileOpen: false
    }

    async componentDidMount() {
        await this.props.loadUser()
    }
    // componentDidUpdate() {

    //     $("html").click((e) => {
    //         if (e) {
    //             if (e.target.id !== 'menu' && e.target.id !== 'settings') {
    //                 $("#menu").removeClass('open');
    //             }
    //             if (e.target.id !== 'app-menu' && e.target.id !== 'menu-icon') {
    //                 $("#app-menu").removeClass('open');
    //             }
    //         }
    //     })

    // }


    updateClass = () => this.setState({ className: this.state.className === 'menu' ? 'menu open' : 'menu' })

    render() {
        const { className, menuOptions, isSettingsOpen, isProfileOpen, sideMenuOptions } = this.state
        const { nickname, image } = this.props.user || {}
        var isEn = this.props?.lang === 'English' ? true : false
        return (
            <React.Fragment>
                <header className="app-header pf">
                    <div className="inner flex">
                        <div className="flex j-between">
                            <img src={logoSrc} alt="" />
                            <p>trinius</p>
                        </div>
                        <div className="wider-menu flex">
                            {sideMenuOptions.map((o, idx) => <NavLink to={`/${o.to}`} exact={true} activeClassName="active-link" key={idx}>{o.txt}</NavLink>)}
                            <p id={`${isSettingsOpen ? 'settings' : ''}`} onClick={() => this.setState({ isSettingsOpen: !this.state.isSettingsOpen })}>{isEn ? 'Settings' : 'הגדרות'}<span><SettingsIcon /></span></p>
                            <Logout logout={this.props.logout} history={this.props.history} />
                        </div>
                        <MenuIcon id={`${className === 'menu open' ? 'menu-icon' : ''}`} className="menu-icon pa" onClick={() => this.setState({ className: className === 'menu' ? 'menu open' : 'menu' })} alt="" />

                        <div className="backImgs">
                            <img src={clock} alt="" />
                            <img src={round} alt="" />
                            <img src={finish} alt="" />
                        </div>
                    </div>
                    <section id="app-menu" className={className} onBlur={(ev) => {
                        ev.stopPropagation()
                        this.setState({ className: 'menu' })
                    }}>
                        <div className="little-profile">
                            <img src={image ? image?.src : avatarSrc} style={{ backgroundColor: image?.bgClr }} alt="" className="flex" />
                            <p className="tac">{nickname ? nickname : 'User'}</p>
                        </div>
                        <div className="menu-options flex column">
                            {menuOptions.map((o, idx) => <NavLink to={`/${o.to}`} onClick={() => this.setState({ className: 'menu' })} exact={true} activeClassName="active-menu-link" key={idx}>{o.txt}</NavLink>)}
                            <img src={logoSrc} alt="" />
                        </div>
                    </section>

                </header>

                <section id="menu" className={`settings-menu ${isSettingsOpen ? 'open' : ''}`}><Settings isOnDesktop={true} /></section>

                <div className="left-area">

                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={finish} alt="" />
                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={finish} alt="" />
                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={finish} alt="" />
                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={finish} alt="" />
                    <div className="profile flex a-center j-center pa ttc tac" onClick={() => this.setState({ isProfileOpen: !this.state.isProfileOpen })}>
                        <p>{isEn ? 'Your Profile' : 'פרופיל'}</p>
                        <ArrowRightIcon />
                    </div>
                </div>

                <div className={`back-dark ${isProfileOpen ? 'shown' : ''}`}> </div>
                <div className={`profile-div ${isProfileOpen ? 'open' : ''}`}>  <Home isOnDesktop={true} /></div>

            </React.Fragment >
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.userModule.user,
        lang: state.gameModule.game.lang
    }
}
const mapDispatchToProps = {
    loadUser,
    logout
}
export const AppHeader = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AppHeader));