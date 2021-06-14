import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import backImg from '../assets/imgs/finish.png'

export function FinishCmpChild(props) {

    const { roundFinishObj, isCategoryFinished } = props
    return (
        <section className="finishCmp child">
            <img src={backImg} alt="" />
            <div className="bless">
                <h1>{isCategoryFinished ? 'CATEGORY COMPLETED!' : roundFinishObj?.largeTxt}</h1>
                <h4> {roundFinishObj?.littleTxt}</h4>
            </div>
            <div className={`btns-div ${isCategoryFinished ? 'j-cneter' : 'j-between'}`}>
                <Link to="/dashboard" className="btn-div" style={{ width: isCategoryFinished ? '100%' : '45%' }}><div><p>STATUS</p></div></Link>
                {!isCategoryFinished && <div className="btn-div" onClick={async () => await props.continue(roundFinishObj?.status)}>
                    <p>{roundFinishObj?.continueTxt}</p>
                </div>}
            </div>
        </section>
    );

}
