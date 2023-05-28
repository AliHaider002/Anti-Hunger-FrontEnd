import React from 'react'
import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import Products from '../Components/Products/Products'
import Slider from '../Components/Slider/Slider'
import Testimonials from '../Components/Testimonials/Testimonials'
import HeaderContext from '../Components/Header/HeaderContext'
import Header from '../Components/Header/Header'

function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Slider />
            <Products />
            <Testimonials />
            <Footer />
        </>
    )
}

export default Home