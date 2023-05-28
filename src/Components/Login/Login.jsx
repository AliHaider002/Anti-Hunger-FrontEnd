import classes from './Login.module.css';
import background from '../../assets/assets2/bg.svg'
import wave from '../../assets/assets2/wave.png'
import avatar from '../../assets/assets2/avatar.jpeg'
import { useState } from 'react';
import axios from 'axios';
export default function Login(props) {
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/auth/login', {
            email: inputs.email,
            password: inputs.password
        }).then((resp) => {
            var user = resp.data.user;
            var token = resp.data.auth;
            var count = parseInt(0);
            var category = resp.data.category;
            localStorage.setItem("token",
                token
            )
            localStorage.setItem("user",
                JSON.stringify(user)
            )
            localStorage.setItem("category",
                JSON.stringify(category)
            )
            localStorage.setItem("cart", count)
            window.location.replace('/home')
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className={classes.wave}>
                <img src={wave} layout='intrinsic' />
            </div>
            <div className={classes.container}>
                <div className={classes.img}>
                    <img src={background} layout='intrinsic' />
                </div>
                <div className={classes.loginContent}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.loginFields}>
                            <img src={avatar} className={classes.loginAvatar} width={220} height={220} />
                            <h2><u>LOGIN</u></h2>
                            <div>
                                <input
                                    type="email"
                                    name='email'
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    className={classes.inputField}
                                />
                                <input
                                    type="password"
                                    name='password'
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                    className={classes.inputField}
                                />
                            </div>
                            <h4>Don't have account? <a  href="/register"><span style={{ color: "red" }}>Register</span></a></h4>
                        </div>
                        <input type="submit" className={classes.btn} />
                    </form>
                </div>
            </div>
        </>
    )
}