import React, { Component } from 'react';
import { connect } from 'react-redux'

//icons:
import nature from '../assets/imgs/categories/nature-c.png'
import animals from '../assets/imgs/categories/animals-c.png'
import food from '../assets/imgs/categories/food-c.png'
import geography from '../assets/imgs/categories/geography-c.png'
import medicine from '../assets/imgs/categories/medicine-c.png'
import movies from '../assets/imgs/categories/movies-c.png'
import personalities from '../assets/imgs/categories/personalities-c.png'
import science from '../assets/imgs/categories/science-c.png'
import music from '../assets/imgs/categories/music-c.png'
import technology from '../assets/imgs/categories/technology-c.png'
import sports from '../assets/imgs/categories/sports-c.png'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { loadGame, updateCategory } from '../store/actions/gameAction.js'


class _Category extends Component {

    state = {
        categoriesSrc: [nature, geography, animals, personalities, movies, medicine, food, sports, music, science, technology],
        categoriesNamesEnglish: ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology'],
        categoriesNamesHebrew: ['טבע', 'גיאוגרפיה', 'בעלי חיים', 'אנשים', 'סרטים', 'רפואה', 'אוכל', 'ספורט', 'מוזיקה', 'מדע', 'טכנולוגיה'],
        categories: [],
        currCategory: ''
    }
    async componentDidMount() {
        await this.props.loadGame()
        const { category } = this?.props?.game
        let { categoriesNamesEnglish, categoriesSrc } = this.state
        let categories = categoriesSrc.map((c, idx) => c = { name: categoriesNamesEnglish[idx].toUpperCase(), src: c })
        this.setState({ currCategory: category, categories })
    }

    selectCategory = async (ev, currCategory) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({ currCategory })
        await this.props.updateCategory(currCategory)
    }

    get categoriesForDisplay() {
        const { lang } = this.props.game
        let { categoriesNamesEnglish, categoriesNamesHebrew, categoriesSrc, currCategory } = this.state
        let currArr = lang === 'English' ? categoriesNamesEnglish : categoriesNamesHebrew
        var arr = lang === 'English' ? categoriesNamesHebrew : categoriesNamesEnglish
        var category = currArr[arr.findIndex(c => c === currCategory.name)]
        // let categories = categoriesSrc.map((c, idx) => c = { name: currArr[idx], src: c })
        return [category, currArr]
    }


    render() {
        const { currCategory, categories } = this.state
        const { isOnDesktop, game } = this.props
        var categoryForDisplay = this.categoriesForDisplay[0] ? this.categoriesForDisplay[0] : game?.category
        var isEn = game.lang === 'English' ? true : false
        return (
            <section className={this.props.class}>
                <header className="j-between tas">
                    <div className="category j-between" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
                        <p style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }}>{isEn ? 'Category' : 'קטגוריה'}</p>
                        <img src={categoryForDisplay ? categoryForDisplay.src : nature} alt="" />
                    </div>
                    <div className="start" onClick={this.props.onClose}>
                        <p><CloseRoundedIcon /></p>
                    </div>
                </header>
                <div className="categories grid">
                    {categories.map((c, idx) => <div onClick={(ev) => this.selectCategory(ev, c)} key={idx} style={{ fontSize: c.name.length >= 10 ? '14px' : '', backgroundColor: currCategory.name === c.name ? '#ff7629' : !isOnDesktop ? 'white' : '#cacaca', boxShadow: currCategory.name === c.name ? '' : '0px 5px 0 #80808014' }}>
                        <img src={c.src} alt="" />
                        <p>{this.categoriesForDisplay[1][idx]}</p>
                    </div>)}
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => {
    return {
        game: state.gameModule.game
    }
}
const mapDispatchToProps = {
    loadGame,
    updateCategory
}
export const Category = connect(mapStateToProps, mapDispatchToProps)(_Category)

