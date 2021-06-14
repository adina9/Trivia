import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadUser } from '../store/actions/userAction.js'
import { loadGame } from '../store/actions/gameAction.js'

import { StatCmp } from '../cmps/StatCmp';

class _Dashboard extends Component {

    async componentDidMount() {
        await this.props.loadUser()
        await this.props.loadGame()

        const { user, history } = this.props
        if (!user?.nickname) history.push("/")
    }

    calculatedWidth = () => (this.props.user.pointsObj?.fullPoints / (43650 / 100)).toFixed(1)

    calculatedHeight = () => {
        const w = this.calculatedWidth()
        if (w > 15) return 70
        else {
            if (w === 0) return 0
            else
                if (w < 1 && !Number.isInteger(w)) return 20
                else
                    if (w < 6) return w * 10
                    else return ((w - 5) * 2) + 50
        }
    }

    title = () => this.props?.lang === 'English' ? 'total points percentage' : 'אחוז הנקודות הכולל'

    render() {
        const { pointsObj } = this.props.user
        return (
            <section className="dashboard pf page">
                <div className="total-points ma tac flex a-center">
                    <header><p>{this.title()}</p></header>
                    <div className="progress-container flex a-center">
                        <p>{this.calculatedWidth().substr(0, 1)}% <span>{`(${pointsObj?.fullPoints} / 43,650)`}</span></p>
                        <div className="percent pa"
                            style={{
                                width: `${pointsObj?.fullPoints < 500 ? '1' : this.calculatedWidth() * 0.9}%`,
                                height: window.screen.height < 800 ? `${pointsObj?.fullPoints < 500 ? `${this.calculatedHeight()}` : '70'}%` : '60%',
                                animation: window.screen.height < 800 ? `${this.calculatedWidth() * 0.9 < 20 ? 'progressSmall' : 'progressBig'} 3s ease` : 'progressBig 3s ease'
                            }}></div>
                    </div>
                </div>
                <StatCmp pointsObj={pointsObj} />
            </section>
        );
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
    loadGame
}
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)