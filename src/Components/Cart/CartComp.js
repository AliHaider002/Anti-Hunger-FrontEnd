import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import css from './Cart.module.css'
import axios from 'axios'
function CartComp() {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user._id;
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    axios.post("http://localhost:5000/cart/", {
      userId: id
    }).then((resp) => {
      console.log(resp.data);
      setCartItems(resp.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className={css.mainComponent}>
      <div className={css.container}>
        <div className={css.products}>
          <h1>Products</h1>
          <div className={css.productsContainer}>
                        <div className={css.listContainer}>
                            {/* <table>
                                <tr>
                                    <td>Food Name</td>
                                    <td>Quantity</td>
                                    <td>Cooked Time</td>
                                    <td>Expiry Time</td>
                                    <td>Submittion</td>
                                </tr>
                            </table> */}
                            
                            <div className={css.listHeading}>
                            Food Name
                            </div>
                            <div className={css.listHeading}>
                            Quantity
                            </div>
                            <div className={css.listHeading}>
                            Cooked Time
                            </div>
                            <div className={css.listHeading}>
                            Expiry Time
                            </div>
                            <div className={css.listHeading}>
                            Submittion
                            </div>
                        </div>
                        {
                            cartItems.map((item) => (
                                <div>
                                    <div key={item._id} className={css.listContainer}>
                                        <div className={css.listItem}>
                                            {item.foodName}
                                        </div>
                                        <div className={css.listItem}>
                                            {item.quantity}
                                        </div>
                                        <div className={css.listItem}>
                                            {item.cookedTime}
                                        </div>
                                        <div className={css.listItem}>
                                            {item.expiryTime}
                                        </div>
                                        <div className={css.listItem}>
                                            <button type="submit" className={css.deleteButton}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
        </div>
        <div className={css.checkOut}>
          <div className={css.checkOutButton}>
            <button type="submit" className={css.checkOutBtn}>Check Out</button>
          </div>
          <div className={css.checkOutButton}>
            <button type="submit" className={css.clearBtn} onClick={() => {
              localStorage.removeItem('cart')
              window.location.reload(false);
            }}>Clear All</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartComp