import React from 'react'
import css from './Logo.module.css'
import logo from '../../../assets/fairTrade.png'
import { BsSearch } from 'react-icons/bs'
const Logo = () => {
  return (
    <div className={css.logoSearch}>
        <img src={logo} alt="" />
        <div className={css.search}>
        <input type="text" className={css.search} placeholder="Search" />
        <div className={css.s_icon}>
            <BsSearch className={css.icon}/>
        </div>
        </div>
    </div>
  )
}

export default Logo