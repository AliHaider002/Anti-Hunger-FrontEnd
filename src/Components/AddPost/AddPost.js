import axios from 'axios';
import React, { useState } from 'react'
import classes from './AddPost.module.css'
import sideWallpaper from '../../assets/assets2/sideWall.jpeg'
function AddPost() {
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = user.firstName + " " + user.lastName
        console.log(username);
        await axios.post('http://localhost:5000/post/create', {
            userId: user._id,
            userName: username,
            foodName: inputs.foodName,
            desc: inputs.desc,
            quantity: inputs.quantity,
            hygeneLevel: inputs.hygeneLevel,
            foodId: inputs.category,
            cookedTime: inputs.cookedTime,
            expiryTime: inputs.expiryTime,
            type: inputs.type,
        }).then((resp) => {
            console.log(resp.data);
            window.location.replace('/');
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className={classes.container}>
                <div className={classes.sideWall}>
                    <img src={sideWallpaper} alt="side Wallper" width={"60%"} className={classes.wallpaper} />
                </div>
                <div className={classes.loginContent}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.loginFields}>
                            <div>
                                <h2><u>Add Food for Hungry</u></h2>
                                <input
                                    type="text"
                                    name='foodName'
                                    value={inputs.foodName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food Name"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="text"
                                    name='desc'
                                    value={inputs.desc || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food description"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="number"
                                    name='quantity'
                                    value={inputs.quantity || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food quantity"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="number"
                                    name='hygeneLevel'
                                    value={inputs.hygeneLevel || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food Hygene Level"
                                    className={classes.inputField}
                                    required
                                />
                                <select className={classes.inputField} name="category" onChange={handleChange} required>
                                    <option disabled>Select your Food Type</option>
                                    <option value='1'>Human Food</option>
                                    <option value='2'>Animal Food</option>
                                    <option value='3'>Composite Food</option>
                                </select>
                                <input
                                    type="time"
                                    name='cookedTime'
                                    value={inputs.cookedTime || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food Cooked Time"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="time"
                                    name='expiryTime'
                                    value={inputs.expiryTime || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food expected Expiry Time"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="text"
                                    name='type'
                                    value={inputs.type || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Food type (ex: Dinner, Breakfast)"
                                    className={classes.inputField}
                                    required
                                />
                            </div>
                        </div>
                        <input type="submit" className={classes.btn} value="Add" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddPost