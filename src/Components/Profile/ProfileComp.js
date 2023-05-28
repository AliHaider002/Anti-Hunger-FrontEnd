import React, { useEffect, useState } from 'react'
import css from './ProfileComp.module.css'
import avatar from '../../assets/assets2/avatar.jpeg'
import axios from 'axios';
function ProfileComp() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user._id;
    const category = JSON.parse(localStorage.getItem('category'))
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        axios.get(`http://localhost:5000/post/get/userPosts/${id}`)
            .then((resp) => {
                console.log(resp.data);
                setPosts(resp.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <div className={css.mainContainer}>
                <div className={css.userDetails}>
                    <div>
                        <div className={css.profileDiv}>
                            <img src={avatar} className={css.avatar} alt="userDp" />
                            <div className={css.profileBox}>
                                <p><span style={{ fontWeight: 'bold' }}>{user.firstName} {user.lastName}</span></p>
                            </div>
                            <hr />
                            <div className={css.aboutDiv}>
                                <table>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: 'left', color: "#566573" }}>Email</td>
                                        <td style={{ width: "50%" }}><span>{user.email}</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: 'left', color: "#566573" }}>Occupation</td>
                                        <td style={{ width: "50%" }}><span>{category.groupName}</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: 'left', color: "#566573" }}>Phone</td>
                                        <td style={{ width: "50%" }}><span>{user.phone}</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: 'left', color: "#566573" }}>about</td>
                                        <td style={{ width: "50%" }}>{user.about}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: 'left', color: "#566573" }}>Member Since</td>
                                        <td style={{ width: "50%" }}>{user.createdAt}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.userProducts}>
                    <div className={css.productsHeading}>
                        <h1>Products</h1>
                    </div>
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
                            posts.map((post) => (
                                <div>
                                    <div key={post._id} className={css.listContainer}>
                                        <div className={css.listItem}>
                                            {post.foodName}
                                        </div>
                                        <div className={css.listItem}>
                                            {post.quantity}
                                        </div>
                                        <div className={css.listItem}>
                                            {post.cookedTime}
                                        </div>
                                        <div className={css.listItem}>
                                            {post.expiryTime}
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
            </div>
        </>
    )
}

export default ProfileComp