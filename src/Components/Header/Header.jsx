import React, { useContext } from 'react'
import css from './Header.module.css'
import logo from '../../assets/logo.png'
import fairTrade from '../../assets/fairTrade.png'
import { CgShoppingBag } from 'react-icons/cg'
import { CartCount } from '../FoodListComp/FoodListComp'
import { CartNumber } from './HeaderContext'

export const Header = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // const cartCounter = useContext(CartNumber);
    const counter = useContext(CartCount)
    return (
        <div className={css.container}>
            <div className={css.logo}>
                <img src={fairTrade} alt="logo the Anti-hunger" />
                <img src={logo} alt="logo the Anti-hunger" />
            </div>
            <div className={css.right}>
                <div className={css.menu}>
                    <ul className={css.menu}>
                        <li style={{
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px"
                        }}><a href='/home'>Home</a></li>
                        <li><a>Notification</a>
                            <ul className={css.ul_two}>
                                <li><a href="#">No Alerts</a></li>
                            </ul>

                        </li>
                        <li>
                            <a>Collection</a>
                            <ul >
                                <li><a href="/humanFood/1"> Human Food</a></li>
                                <li><a href="/animalFood/2">Animal Food</a></li>
                                <li><a href="/compositeFood/3">Composed Food</a></li>
                            </ul>
                        </li>

                        <li><a>News</a>
                            <ul >
                                <li><a >News 1</a></li>
                                <li><a >News 2</a></li>
                                <li><a >News 3</a></li>
                            </ul>
                        </li>
                        <li><a >About</a>
                            <ul >
                                <li><a >Contact-Us</a></li>
                            </ul>
                        </li>
                        <li><p>{user.firstName} {user.lastName}</p>
                            <ul >
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/addpost">Add Food</a></li>
                                <li><a href='/' onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('user')
                                }}>Log-Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <input type="text" className={css.search} placeholder="Search" />
                <a href="/cart"><CgShoppingBag className={css.cart} /></a>
                {counter}
            </div>
        </div>
    )
}

export default Header;