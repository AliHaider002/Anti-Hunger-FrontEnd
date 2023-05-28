import React from 'react'
import css from './ProfileCard.module.css'
import profile from '../../../assets/Social/profile.jpg'
import cover from '../../../assets/Social/cover.jpeg'
const ProfileCard = () => {
  return (
    <div className={css.ProfileCard}>
        <div className={css.ProfileImages}>
            <img src={cover} alt="" />
            <img src={profile} alt="" />
            
        </div>
        <div className={css.ProfileName}>
            <span>Ali Haider</span>
            <span>Developer</span>
        </div>
        <div className={css.followStatus}>
            <hr/>
            <div>
                <div className={css.follow}>
                    <span>6890</span>
                    <span>Followings</span>
                </div>
                <div className={css.vline}></div>
                <div className={css.follow}>
                    <span>1</span>
                    <span>Followers</span>
                </div>
            </div>
            <hr/>
        </div>
    </div>
  )
}

export default ProfileCard