import React, { createContext, useContext, useState } from 'react'
import Header from './Header'
import { CartCount } from '../FoodListComp/FoodListComp';

export const CartNumber = createContext();

function HeaderContext(props) {
    const cartCounter = useContext(CartCount)
  return (
    <>
        <CartCount.Provider value={cartCounter}>
          <Header/>
        </CartCount.Provider>
    </>
  )
}

export default HeaderContext