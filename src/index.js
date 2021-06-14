import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss'
import { App } from './App.jsx';
import { HashRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store/store.js'


// // window.screen.orientation.lock("portrait")
// // .then(
// //   success => console.log(success),
// //   failure => console.log(failure)
// // )


// // var lockFunction =  window.screen.orientation.lock;
// // if (lockFunction.call(window.screen.orientation, 'landscape')) {
// //            console.log('Orientation locked')
// //         } else {
// //             console.error('There was a problem in locking the orientation')
// //         }
// console.log(window.screen);
// window.screen.orientation.onchange = () => {
//   console.log("The orientation of the screen is: " + window.screen.orientation);
// };

// window.screen.orientation.lock('portrait');

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
