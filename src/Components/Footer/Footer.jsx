import React from 'react'
import css from './Footer.module.css'
import logo from '../../assets/fairTrade.png'
import {
    InboxIcon,
    PhoneIcon,
    LocationMarkerIcon,
    LoginIcon,
    UsersIcon,
    LinkIcon
} from '@heroicons/react/outline'
const Footer = () => {
    return (
        <div className={css.cFooterWrapper}>
            <hr />
            <div className={css.cFooter}>
                <div className={css.logo}>
                    <img src={logo} alt="" />
                    <span>FAH</span>
                </div>
                <div className={css.block}>
                    <div className={css.detail}>
                        <span>Contact-Us</span>
                        <span className={css.pngLine}>
                            <LocationMarkerIcon className={css.icon} />
                            <span>Hiast, Latifabad 2 no., Hyderabad</span>
                        </span>
                        <span className={css.pngLine}>
                            <PhoneIcon className={css.icon} />
                            <span>+923332795131</span>
                        </span>
                        <span className={css.pngLine}>
                            <InboxIcon className={css.icon} />
                            <span>musawir5502@gmail.com</span>
                        </span>
                    </div>
                </div>
                <div className={css.block}>
                    <div className={css.detail}>
                        <span>Account</span>
                        <span className={css.pngLine}>
                            <LoginIcon className={css.icon} />
                            <span>Sign-In</span>
                        </span>
                    </div>
                </div>
                <div className={css.block}>
                    <div className={css.detail}>
                        <span>Company</span>
                        <span className={css.pngLine}>
                            <UsersIcon className={css.icon} />
                            <span>About Us</span>
                        </span>
                    </div>
                </div>
                <div className={css.block}>
                    <div className={css.detail}>
                        <span>Resources</span>
                        <span className={css.pngLine}>
                            <LinkIcon className={css.icon} />
                            <span>Safety, Privacy, and Terms</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={css.copyRight}>
                <span></span>
                <span>Copyright ©2022 by FAH, Inc</span>
                <span>All Rights Reserved</span>
            </div>
        </div>
    )
}

export default Footer