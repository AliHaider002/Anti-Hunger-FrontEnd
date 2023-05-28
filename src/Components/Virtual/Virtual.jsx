import React from 'react'
import css from './Virtual.module.css'
import shade from '../../assets/shade.png'
import ReactCompareImage from 'react-compare-image'
import Before from '../../assets/Hunger.jpg'
import after from '../../assets/Hunger2.png'
const Virtual = () => {
  return (
    <div>
        <div className={css.virtual}>
            <div className={css.left}>
                <span>Virtual Try-on</span>
                <span>Never Wrong food to Wrong Person</span>
                <span>Try Now!</span>
                <img src={shade} alt="Shade of Virtual Componenet" />
            </div>
            <div className={css.right}>
                <div className={css.wrapper}>
                    <ReactCompareImage 
                    leftImage={Before}
                    rightImage={after}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Virtual