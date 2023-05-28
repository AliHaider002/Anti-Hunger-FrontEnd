import { makeStyles } from '@material-ui/core';
import { Box, Button, Radio, RadioGroup, TextField, Typography, styled, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CssTextField = styled(TextField)({
    // width: "100%",
    // marginTop: '10px',
    height: "50px",
    "& label.Mui-focused": {
        color: "white",
        height: "50px",
    },
    "& .MuiOutlinedInput-root": {
        height: "50px",
        "& fieldset": {
            borderColor: "white",
            color: "white",
            height: "50px",
        },
        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
            color: "white",
            height: "50px",
            // background: "#414141",
        },

        "&:hover fieldset": {
            borderColor: "#00f902",
            transition: "border-color 0.5s ease",
            height: "50px",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00f902",
            height: "50px",
        },
        "&  #customID": {
            color: "white",
            height: "50px",
            // top: "-20px",
        },
    },
});

const useStyles = makeStyles({
    switch: {
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "Wheat !important",
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#00f902 !important",
      },
    },
    radio: {
      "& .MuiRadio-colorSecondary.Mui-checked": {
        color: "#4caf50 !important",
      },
      "& .css-135p9kp-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
        color: "#4caf50 !important",
      },
      "& .css-hyxlzm": {
        color: "#00f902 !important",
      },
    },
  });

const Signup = () => {
    const classes = useStyles();
    const theme = useTheme()

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
            <Box
                sx={{
                    color: `${theme.palette.background.default}`,
                    
                }}
            >
                <Box>
                    <form >
                        <Box 
                        sx={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        >
                            <Box>
                                <h2><u>REGISTER</u></h2>
                                <CssTextField
                                    id='customID'
                                    type="text"
                                    name='firstName'
                                    value={inputs.firstName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your First Name"
                                    // className={classes.inputField}
                                    required
                                />
                                <CssTextField
                                    id='customID'
                                    type="text"
                                    name='lastName'
                                    value={inputs.lastName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Last Name"
                                    // className={classes.inputField}
                                    required
                                />
                            </Box>
                            <Box>
                                <CssTextField
                                    id='customID'
                                    type="email"
                                    name='email'
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    // className={classes.inputField}
                                    required
                                />
                                <CssTextField
                                    id='customID'
                                    type="password"
                                    name='password'
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                    // className={classes.inputField}
                                    required
                                />
                            </Box>
                            <CssTextField
                                id='customID'
                                type="text"
                                name='confirmPassword'
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                // className={classes.inputField}
                                sx={{ width: "75%" }}
                                required
                            />
                            <Box>
                                <CssTextField
                                    id='customID'
                                    type="text"
                                    name='phone'
                                    value={inputs.phone || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Phone Number"
                                    // className={classes.inputField}
                                    required
                                />
                                <select
                                    // className={classes.CssTextFieldField}
                                    name="category" onChange={handleChange} required>
                                    <option disabled>Select your Category</option>
                                    {
                                        catData.map(data => (
                                            <option key={data._id} value={data._id}>{data.groupName}</option>
                                        ))
                                    }
                                </select>
                                <CssTextField
                                    id='customID'
                                    type="text"
                                    name='address'
                                    value={inputs.address || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your Address"
                                    // className={classes.inputField}
                                    style={{ width: "75%" }}
                                    required
                                />
                            </Box>
                            <Box
                            sx={{
                              width: {
                                lg: "25%",
                                md: "30%",
                                sm: "25%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.default}`,
                                }}
                              >
                                Male
                              </Typography>
                            </Box>

                            <Box>
                              <RadioGroup
                                onChange={handleChange}
                                // value={valueRadio}
                              >
                                <Radio
                                  value="male"
                                  // sx={{
                                  //   color: "white"
                                  // }}
                                  classes={{ root: classes.radio }}
                                />
                              </RadioGroup>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: {
                                lg: "25%",
                                md: "30%",
                                sm: "25%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.default}`,
                                }}
                              >
                                Female
                              </Typography>
                            </Box>

                            <Box>
                              <RadioGroup
                                onChange={handleChange}
                                // value={valueRadio}
                              >
                                <Radio
                                  value="female"
                                  // sx={{
                                  //   color: "white"
                                  // }}
                                  classes={{ root: classes.radio }}
                                />
                              </RadioGroup>
                            </Box>
                          </Box>
                            {/* <Box>
                                <CssTextField
                                    type="radio"
                                    name='gender'
                                    value="male"
                                    onChange={handleChange}
                                    required
                                />Male
                                <CssTextField
                                    id='customID'
                                    type="radio"
                                    name='gender'
                                    value="male"
                                    onChange={handleChange}
                                    required
                                />female
                            </Box> */}
                            <h4>Already have account? <a href="/"><span style={{ color: "red" }}>Login</span></a></h4>
                        </Box>
                        <Button type="submit"
                        onSubmit={handleSubmit}
                        // className={classes.btn} 
                        >
                            submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Signup