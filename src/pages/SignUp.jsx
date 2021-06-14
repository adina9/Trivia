import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUser, updateNickname } from '../store/actions/userAction.js'

import logoSrc from '../assets/imgs/bookLogo.png'
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'

class _SignUp extends Component {

    state = {
        isGuestClicked: false,
        nickname: ''
    }

    async componentDidMount() {
        await this.props.loadUser()
        this.setState({ nickname: this.props.user?.nickname })
    }

    handleChange = ({ target }) => {
        let nickname = target?.value
        this.setState({ nickname }, () => this.props.updateNickname(this.state.nickname, this.props.user))

    }

    render() {
        const { isGuestClicked, nickname } = this.state
        const { user } = this.props
        return (
            <section className="sign-up tac page">
                <div className="top">
                    <p>welcome to trinius</p>
                    <small>the game that will make you a genius</small>
                    <img src={logoSrc} alt="" />
                </div>
                <img src={logoSrc} alt="" className="logo flex ma" />
                {!isGuestClicked && <div className="signs-options">
                    <h2>Sign up with</h2>
                    <div className="enter-facebook">Facebook</div>
                    <div className="enter-google">Google</div>
                    <h3>Or</h3>
                    <div className="enter-guest" onClick={() => this.setState({ isGuestClicked: !isGuestClicked })}>Play as a guest</div>
                </div>}
                {isGuestClicked && <div className="set-nickname">
                    <input type="text" placeholder="Choose a nickname" required name="nickname" autoComplete="off" onChange={this.handleChange} value={nickname} className="tac" />
                    <Link to={`/${nickname ? 'home' : 'signup'}`} onClick={() => this.props.updateNickname(nickname, user)}> <div>Start</div></Link>
                    <Link to={`/${nickname ? 'about' : 'signup'}`} onClick={() => this.props.updateNickname(nickname, user)}> <div>Start</div></Link>
                </div>}

                <div className="backImgs">
                    <img src={finish} alt="" />
                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={round} alt="" />
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    updateNickname,
    loadUser,
}
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)
