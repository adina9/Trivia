import { Switch, Route, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignUp } from './pages/SignUp';
import { Settings } from './pages/Settings';
import { Adding } from './pages/Adding';
import { Playing } from './pages/Playing';
import { Dashboard } from './pages/Dashboard';
import { AppHeader } from './cmps/AppHeader';
import { AppNav } from './cmps/AppNav';

import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { loadUser } from './store/actions/userAction';

function _App(props) {
  var { pathname } = useLocation()
  const { nickname } = props.user
  if (!nickname) pathname = "/"
  loadUser()


  var { width, height } = window.screen

  window.addEventListener('resize', () => {

    var w = window.screen.width
    var h = window.screen.height

    var isMobile = (w < 1000 && h < 500) || (w < 500 && h < 1000) ? true : false
    var totalCheck = isMobile && w > width ? true : false

    if ((width === h && height === w) && isMobile)

      Swal.fire({
        title: totalCheck ? 'Please Rotate Your Device' : 'Great!',
        icon: totalCheck ? 'warning' : 'success',
        showConfirmButton: false,
        allowOutsideClick: totalCheck ? false : true,
        backdrop: '#e8eaed',
        background: '#e8eaed',
        iconColor: totalCheck ? '#ff3737c2' : '#ff955a',
        timer: totalCheck ? false : 1200
      })

    width = window.screen.width
    height = window.screen.height
  })

  return (
    <div className="App">
      {pathname !== '/play' && pathname !== "/" && <AppHeader />}
      {pathname !== '/play' && pathname !== "/" && <AppNav />}
      <Switch>
        <Route path='/about' component={About} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path='/settings' component={Settings} />
        <Route path='/adding' component={Adding} />
        <Route path="/play" component={Playing} />
        <Route path='/home' component={Home} />
        <Route path="/" component={SignUp} />
      </Switch>
    </div>
  )

}
const mapStateToProps = state => {
  return {
    user: state.userModule.user
  }
}
const mapDispatchToProps = {
  loadUser

}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)


