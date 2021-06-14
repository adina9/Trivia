import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { loadGame } from '../store/actions/gameAction.js'

class _Logout extends Component {

    componentDidMount = async () => {
        await this.props.loadGame()
    }

    logout = () => {
        Swal.fire({
            title: 'Are Your Sure You Want To Log Out?',
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#ff955a',
            reverseButtons: true,
            allowOutsideClick: false
        }).then(result => {
            if (result.isConfirmed) {
                this.props.logout()
                this.props.history.push("/")
            }
        })
    }
    render() {
        const isEn = this.props?.lang === 'English' ? true : false
        return (
            <div className="logout a-center ttc j-center flex" onClick={this.logout}>
                <p>{`${isEn ? 'Log out' : 'התנתק/י'}`}<span><ExitToAppIcon /></span></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.gameModule?.game?.lang
    }
}
const mapDispatchToProps = {
    loadGame
}
export const Logout = connect(mapStateToProps, mapDispatchToProps)(_Logout)