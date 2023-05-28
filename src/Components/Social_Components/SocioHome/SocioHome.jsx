import React from 'react'
import ProfileSide from '../ProfileSide/ProfileSide'
import css from './SocioHome.module.css'
const SocioHome = () => {
  return (
    <div className={css.home}>
        <div className={css.profileSide}>
            <ProfileSide/>
            
        </div>
        <div className={css.postSide}>
            Posts            
        </div>
        <div className={css.rightSide}>
            Rightside
        </div>
    </div>
  )
}

export default SocioHome