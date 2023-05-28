import React from 'react'
import css from './Products.module.css'
import Plane from '../../assets/plane.png'
import {ProductsData} from '../../data/products'
import { useState } from 'react'
import { useAutoAnimate } from "@formkit/auto-animate/react"
const Products = () => {
  const [parent] = useAutoAnimate();
  const [MenuProducts, setMenuProducts] = useState(ProductsData);
  const filter = (type) => {
    setMenuProducts(ProductsData.filter((product)=>product.type === type))
  }
  return (
    <div>
        <div className={css.container}>
            <img src={Plane} alt="plane of feature component"/>
            <h1>Featured Products </h1>
            <div className={css.products}>
                <ul className={css.menu}>
                    <li onClick={()=>setMenuProducts(ProductsData)}>All</li>
                    <li onClick={()=>filter("skin care")}>Burger</li>
                    <li onClick={()=>filter("conditioner")}>Biryani</li>
                    <li onClick={()=>filter("foundation")}>Bread</li>
                </ul>
                <div className={css.list} ref={parent}>
                  {
                    MenuProducts.map((product,i)=>(
                      <div className={css.product}>
                        <div className={css.left}>
                          <div className={css.name}>
                            <span>{product.name}</span>
                            <span>{product.detail}</span>
                          </div>
                          <span>{product.price}Rs</span>
                          <div>
                            Shop Now!
                          </div>
                        </div>
                        <img src={product.img} alt="product" />
                      </div>
                    ))
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products