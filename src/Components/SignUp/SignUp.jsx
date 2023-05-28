import classes from './SignUp.module.css';
import background from '../../assets/assets2/bg.svg'
import wave from '../../assets/assets2/wave.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
export const SignUp = (props) => {
    // const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({});
    const [catData, setCatData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/user/category').then((resp) => {
            setCatData(resp.data)
        }).catch((err) => {
            console.log(err);
            
        })
    }, [])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/auth/register', {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            password: inputs.password,
            category: inputs.category,
            phone: inputs.phone,
            gender: inputs.gender,
        }).then((resp) => {
            console.log(resp.data);
            window.location.replace('/');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className={classes.wave}>
                <img src={wave} layout='intrinsic' alt='wave' />
            </div>
            <div className={classes.container}>
                <div className={classes.img}>
                    <img src={background} layout='intrinsic' alt='background' />
                </div>
                <div className={classes.loginContent}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.loginFields}>
                            <div>
                                <h2><u>REGISTER</u></h2>
                                <input
                                    type="text"
                                    name='firstName'
                                    value={inputs.firstName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your First Name"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="text"
                                    name='lastName'
                                    value={inputs.lastName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Last Name"
                                    className={classes.inputField}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name='email'
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    className={classes.inputField}
                                    required
                                />
                                <input
                                    type="password"
                                    name='password'
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                    className={classes.inputField}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name='confirmPassword'
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className={classes.inputField}
                                style={{ width: "75%" }}
                                required
                            />
                            <div>
                                <input
                                    type="text"
                                    name='phone'
                                    value={inputs.phone || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Phone Number"
                                    className={classes.inputField}
                                    required
                                />
                                <select className={classes.inputField} name="category" onChange={handleChange} required>
                                    <option disabled>Select your Category</option>
                                    {
                                        catData.map(data => (
                                            <option key={data._id} value={data._id}>{data.groupName}</option>
                                        ))
                                    }
                                </select>
                                <input
                                    type="text"
                                    name='address'
                                    value={inputs.address || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Address"
                                    className={classes.inputField}
                                    style={{ width: "75%" }}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='gender'
                                    value="male"
                                    onChange={handleChange}
                                    required
                                />Male
                                <input
                                    type="radio"
                                    name='gender'
                                    value="male"
                                    onChange={handleChange}
                                    required
                                />female
                            </div>
                            <h4>Already have account? <a href="/"><span style={{ color: "red" }}>Login</span></a></h4>
                        </div>
                        <input type="submit" className={classes.btn} />
                    </form>
                </div>
            </div>
        </>
    )
}
