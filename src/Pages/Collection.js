import React from 'react'
import Footer from '../Components/Footer/Footer'
import Products from '../Components/Products/Products'
import HeaderContext from '../Components/Header/HeaderContext'

function Collection() {
  return (
    <div>
      <HeaderContext />
      <Products />
      <Footer />
    </div>
  )
}

export default Collection