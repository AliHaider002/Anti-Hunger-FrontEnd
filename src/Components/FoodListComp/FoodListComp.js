import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import css from './FoodListComp.module.css'
import profile from '../../assets/assets2/cooking.png'
import Header from '../Header/Header';

export const CartCount = createContext();

const FoodListComp = (props) => {
  const { id } = props;
  const [data, setData] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const [cartItem , setCartItem] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:5000/post/get/foodList/${id.id}`)
      .then((resp) => {
        setData(resp.data)
      }).catch((err) => {
        console.log(err);
      })
  }, []);
  const handleSubmit = async () => {
    const parsed = JSON.stringify(cartItem);
    console.log(parsed);
    await axios.post("http://localhost:5000/cart/create", {
      postId: cartItem._id,
      userId: userId,
      foodName: cartItem.foodName
    }).then((resp)=>{
      console.log(resp.data);
    })
  }
  return (
    <>
      <div className={css.container}>
        {data?.map(item => (
          <div key={item._id} className={css.grid}>
            <div className={css.userGrid}>
              <img src={profile} width={180} height={180} style={{ padding: 20 }} /> <br />
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}><span><b>Food Name:</b></span></div>
                <div className={css.userGridRowTwo}><span> {item.foodName}</span></div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Description:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span> {item.desc}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Quantity:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span> {item.quantity}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Hygene Level:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span> {item.hygeneLevel}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Cooked Time:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span style={{ color: "green", fontWeight: "bold" }}> {item.cookedTime}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Expiry Time:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span style={{ color: "red", fontWeight: "bold" }}> {item.expiryTime}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Food Type:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span> {item.type}</span>
                </div>
              </div>
              <div className={css.userGridCol}>
                <div className={css.userGridRowOne}>
                  <b>Food By:</b>
                </div>
                <div className={css.userGridRowTwo}>
                  <span> {item.userName}</span>
                </div>
              </div>
              <div>
                <button type="submit" onClick={() => {
                  setCartItem(item)
                  handleSubmit()
                }} className={css.btn}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default FoodListComp