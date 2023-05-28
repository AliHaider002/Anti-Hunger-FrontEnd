import React from 'react'
import css from './Hero.module.css'
import HeroImg from '../../assets/slider.png'
import slider2 from '../../assets/slider2.png'
import {RiShoppingBagFill} from 'react-icons/ri'
import {BsArrowRight} from 'react-icons/bs'
import { motion } from 'framer-motion'
const Hero = () => {
    const transition = {duration: 3, type: "spring"};
    return (
        <div className={css.container}>
            {/* Left Slide */}
            <div className={css.h_sides}>
                <span className={css.text1}></span>
                <div className={css.text2}>
                    <span>Fresh Food</span>
                    <span>
                        {" "}
                        Thank you for your consideration. 
                        Appreciate your benevolence.
                    </span>
                </div>
            </div>
            {/* Middle Slide */}
            <div className={css.wrapper}>
                    <div className={css.Circlefloating}>
                    <motion.img initial={{bottom: "3rem"}} whileInView={{bottom: "1rem"}} transition={transition} src={slider2} className={css.blueCircle} alt="slider2 behind the slider1" />
                    
                    </div>
                    <motion.img initial={{bottom: "-3rem"}} whileInView={{bottom: "4rem"}} transition={transition} src={HeroImg} alt="" width={400} />
                        
                <motion.div 
                initial={{right: "4%"}} whileInView={{right: "2%"}} transition={transition}
                className={css.cart2}>
                    <RiShoppingBagFill />
                    <div className={css.signup}>
                        <span>Best SignUp Offers</span>
                        <div>
                            <BsArrowRight />
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Right Slide */}
            <div className={css.h_sides}>
                <div className={css.traffic}>
                    <span>1.5m</span>
                    <span>Monthly Traffic</span>
                </div>
                <div className={css.customers}>
                    <span>10k</span>
                    <span>Hungry People in your Area</span>
                </div>
            </div>
        </div>
    )
}

export default Hero