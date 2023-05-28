import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Switch, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import logo from './bnb2.png';
import Chart from './Chart/Chart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropdownMenu from './DropDown/Dropdown';
import { makeStyles } from '@material-ui/core';

const CssTextarea = styled(TextField)({
    // marginTop: '10px',
    // height: "auto",
    // "& label.Mui-focused": {
    //     color: "white",
    //     height: "auto",
    // },
    // "& .MuiOutlinedInput-root": {
    //     height: "auto",
    //     "& fieldset": {
    //         borderColor: "#00f902",
    //         borderRadius: "30px",
    //         color: "white",
    //         height: "auto",
    //     },
    //     "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
    //         color: "white",
    //         height: "auto",
    //         // background: "#414141",
    //     },
    //     "&:hover fieldset": {
    //         borderColor: "#00f902",
    //         borderRadius: "30px",
    //         transition: 'border-color 0.5s ease',
    //         height: "auto",
    //     },
    //     "&.Mui-focused fieldset": {
    //         borderColor: "#00f902",
    //         height: "auto",
    //     },
    "&  #customID": {
        color: "white",
        height: "10px",
        // top: "-20px",
        "&:placeholder": {
            color: 'white !important'
            // }
        },
    },
});

const useStyles = makeStyles({
    switch: {
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: 'Wheat !important',
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#00f902 !important',
      },
    },
})

const SnipeTool5 = () => {
    const classes = useStyles();
    const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
    const [IsBasicModalVisible1, setIsBasicModalVisible1] = useState(false);
    const [IsBasicModalVisible2, setIsBasicModalVisible2] = useState(false);
    const [switchStatus, setswitchStatus] = useState(false);
    const [switchStatus1, setswitchStatus1] = useState(false);

    const handleSwitch = () => {
        setswitchStatus(!switchStatus);
    };
    const handleSwitch1 = () => {
        setswitchStatus1(!switchStatus1);
    };
    let theme = useTheme();
    const backdropStyle = {
        backgroundColor: 'rgba(1, 1, 1, 0.7)'
    };
    const paperStyle = {
        backgroundColor: `${theme.palette.background.mainBg}`,
        color: "white",
        width: {lg: "40%", md: "40%", sm: "auto", xs: "auto"},
        height: "auto",
        padding: '20px',
    };
    return (
        <Box
            sx={{
                color: `${theme.palette.background.default}`
            }}
        >
            <Box>
                <Box sx={{ mb: '10px' }}>
                    <Typography>B. Connect wallet and swap with limits orders and recurring periods</Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%', mt: '50px' }}>
                <Grid container spacing={2}
                sx={{
                    display: "flex",
                    flexDirection: {lg: "row", md: "row", sm: "column", xs: "column"},
                    
                }}
                >
                    <Grid item lg={6} md={6} sm={12} xs={12}
                    sx={{
                        height: {lg: "auto", md: "auto", sm: "10px", xs: "10px"}
                    }}
                    >
                        <Box>
                            <Chart />
                        </Box>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}
                    sx={{
                        marginLeft: {lg: "auto", md: "auto", sm: "15px", xs: "15px"}
                    }}
                    >
                        <Box>
                            <Box>
                                <Grid container spacing={1}>
                                    <Grid item lg={3} md={3} sm={3} xs={6}>
                                        <Typography>Swap From</Typography>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} xs={6}>
                                        <Typography>Swap For</Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={1}
                                    sx={{
                                        border: '1px solid white',
                                        mt: '20px',
                                        borderRadius: '10px',
                                        height: { lg: '80px', md: '80px', sm: '80px', xs: 'auto' },
                                        width: '100%',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // overflow: 'scroll',
                                    }}
                                >
                                    <Grid item lg={4} md={4} sm={4} xs={12}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: "space-between",
                                                paddingX: "5px"
                                            }}
                                        >
                                            <Box>
                                                <img src={logo} width="20px" />
                                            </Box>
                                            <Box 
                                            // sx={{ mr: '10px' }}
                                            >

                                                <Button
                                                    sx={{ padding: '0px', margin: '0px', color: 'white' }}
                                                    variant="text"
                                                // onClick={(e) => e.preventDefault()}
                                                >
                                                    {/* <DropdownMenu cake="BNB" /> */}
                                                </Button>
                                                {/* <Dropdown overlay={positionMenu} trigger={['click']}>
                          <Button
                            sx={{ padding: '0px', margin: '0px', color: 'white' }}
                            variant="text"
                            // onClick={(e) => e.preventDefault()}
                          >
                            BNB <KeyboardArrowDownIcon />
                          </Button>
                        </Dropdown> */}
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '60px',
                                                    height: '27px',
                                                    backgroundColor: '#3e517e',
                                                    border: '1px solid #3e517e',
                                                    borderRadius: '20px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography>0.0</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={12}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: "space-between",
                                                paddingX: "5px",
                                            }}
                                        >
                                            <Box>
                                                <img src={logo} width="20px" />
                                            </Box>
                                            <Box sx={{ mr: '0px' }}>
                                                {/* <DropdownMenu cake="cake" /> */}
                                                <Button
                                                    variant="text"
                                                    sx={{ padding: '0px', margin: '0px', color: 'white' }}
                                                // onClick={(e) => e.preventDefault()}
                                                >
                                                    {/* <DropdownMenu cake="cake" /> */}
                                                </Button>
                                                {/* <Dropdown overlay={positionMenu} trigger={['click']}>
                          <Button
                            variant="text"
                            sx={{ padding: '0px', margin: '0px', color: 'white' }}
                            // onClick={(e) => e.preventDefault()}
                          >
                            CAKE <KeyboardArrowDownIcon />
                          </Button>
                        </Dropdown> */}
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '60px',
                                                    height: '27px',
                                                    backgroundColor: '#3e517e',
                                                    border: '1px solid #3e517e',
                                                    borderRadius: '20px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography>0.0</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={12}>
                                        {/* <Dropdown overlay={prefrenceMenu} trigger={['click']}> */}
                                        <Box
                                        sx={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        >
                                        <Button
                                            // sx={{ padding: '0px', margin: '0px', color: 'white' }}
                                            sx={{
                                                margin: 'auto !important',
                                                // border: `1px solid ${theme.palette.background.default} !important`,
                                                borderRadius: "5px !important",
                                                height: "auto !important",
                                                backgroundColor: "transparent !important",
                                                color: `${theme.palette.background.default} !important`,
        
                                                "&:hover": {
                                                    backgroundColor: "transparent !important",
                                                    // color: "blue",
                                                    // borderColor: "blue",
                                                },
                                            }}
                                            variant="text"
                                            onClick={() => setIsBasicModalVisible1(true)}
                                        >
                                            SET PREFERENCES <KeyboardArrowDownIcon />
                                        </Button>
                                        </Box>
                                        
                                        {/* </Dropdown> */}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={IsBasicModalVisible1} onClose={() => setIsBasicModalVisible1(false)}
                BackdropProps={{ style: backdropStyle }}
                PaperProps={{ style: paperStyle }}
            >
                <DialogTitle
                    sx={{ mb: '10px' }}
                >SET PREFERENCES</DialogTitle>
                <DialogContent>
                    <Box>
                        <Box>
                            <Box>
                                <Typography variant="body2">Selected Pair :</Typography>
                                <Typography variant="body2">BNB - CAKE</Typography>
                            </Box>
                            <Box
                                sx={{
                                    // width: '50%',
                                    mt: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Box>
                                        <Typography variant="body2">BNB Balance:</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '1px solid #339cfd',
                                            borderRadius: '12px',
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="body2">0.00</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ ml: '20px' }}>
                                    <Box>
                                        <Typography variant="body2">CAKE Balance:</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '1px solid #339cfd',
                                            borderRadius: '12px',
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="body2">0.00</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: '10px', mb: '5px' }}>
                                <Typography variant="body2">Current Price:</Typography>
                            </Box>
                            <Box
                                sx={{
                                    // width: '50%',
                                    display: 'flex',
                                    flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
                                    // justifyContent: 'space-between',
                                    mt: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2">BNB</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '1px solid #339cfd',
                                            borderRadius: '12px',
                                            width: '100px',
                                            textAlign: 'center',
                                            ml: '5px',
                                        }}
                                    >
                                        <Typography variant="body2">0.00</Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        ml: { lg: '20px', md: '20px', sm: '20px', xs: '0px' },
                                        mt: { lg: '0px', md: '0px', sm: '0px', xs: '10px' },
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2">CAKE</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '1px solid #339cfd',
                                            borderRadius: '12px',
                                            width: '100px',
                                            textAlign: 'center',
                                            ml: '5px',
                                        }}
                                    >
                                        <Typography variant="body2">0.00</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <Box>
                                    <Typography variant="body2">Gas in Gwei</Typography>
                                </Box>
                                <Box>
                                    <CssTextarea placeholder="0.00" sx={{
                                        border: '1px solid #339cfd',
                                        borderRadius: '12px',
                                        width: '100px',
                                        marginY: "5px",
                                        // height: "10px",
                                        textAlign: 'center',
                                        ml: '5px',
                                    }}
                                        id='customID'
                                    />
                                </Box>
                                {/* <Box
                  sx={{
                    border: '1px solid darkgray',
                    borderRadius: '12px',
                    width: '100px',
                    textAlign: 'center',
                    backgroundColor: 'gray',
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box> */}
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <Box>
                                    <Typography variant="body2">SLIPPAGE</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        <CssTextarea placeholder="0.00" sx={{
                                            border: '1px solid #339cfd',
                                            borderRadius: '12px',
                                            width: '100px',
                                            textAlign: 'center',
                                            ml: '5px',
                                            marginY: "5px",
                                            marginRight: "3px"
                                        }}
                                            id="customID"
                                        />
                                    </Box>
                                    {/* <Box
                    sx={{
                      border: '1px solid darkgray',
                      borderRadius: '12px',
                      width: '100px',
                      textAlign: 'center',
                      backgroundColor: 'gray',
                    }}
                  >
                    <Typography variant="body2">0.00</Typography>
                  </Box> */}
                                    <Box>
                                        <Typography>%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <Typography variant="body2">Set Dex router</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'space-around',
                                }}
                            >
                                <Box>
                                    <Typography variant="body2">Pancakeswap</Typography>
                                </Box>
                                <Box sx={{ ml: '10px' }}>
                                    <Typography variant="body2" sx={{ color: '#339cfd' }}>
                                        Uniswap
                                    </Typography>
                                </Box>
                                <Box sx={{ ml: '10px' }}>
                                    <Typography variant="body2">1inch</Typography>
                                </Box>
                                <Box sx={{ ml: '10px' }}>
                                    <Typography variant="body2">SushiSwap</Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    mt: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Typography variant="body2">Anti-bot (MEV Bot)</Typography>
                                </Box>
                                <Box>
                                    <Switch onClick={handleSwitch} checked={switchStatus} classes={{ root: classes.switch }} />
                                </Box>
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <Box>
                                    <Typography variant="body2">Set Execution</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2">Time and Triggering</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <input
                                    type="date"
                                    style={{
                                        width: '100%',
                                        height: '26px',
                                        backgroundColor: '#25284B',
                                        color: '#9292a0',
                                        border: '1px solid #a9a9a9',
                                        borderRadius: '25px',
                                        fontSize: '16px',
                                        padding: '11.4px 11px',
                                    }}
                                ></input>
                            </Box>
                            <Box sx={{ mt: '10px' }}>
                                <Button
                                    variant="text"
                                    sx={{
                                        textTransform: 'capitalize',
                                        // color: `${theme.palette.background.mainBg} !important`,
                                        border: `1px solid ${theme.palette.background.hoverColor} !important`,
                                        borderRadius: "5px !important",
                                        height: "30px !important",
                                        backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}
                                    onClick={() => setIsBasicModalVisible2(true)}
                                >
                                    Recurring
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    mt: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Typography variant="body2">Set for all wallets</Typography>
                                </Box>
                                <Box>
                                    <Switch onClick={handleSwitch1} checked={switchStatus1} classes={{ root: classes.switch }} />
                                </Box>
                            </Box>
                            <Box sx={{ mt: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                                <Button variant="contained"
                                    sx={{
                                        border: `1px solid ${theme.palette.background.hoverColor} !important`,
                                        borderRadius: "5px !important",
                                        height: "50px !important",
                                        backgroundColor: "transparent !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}
                                >Confirm & Swap</Button>
                            </Box>
                        </Box>
                        <Dialog open={IsBasicModalVisible2} onClose={() => setIsBasicModalVisible2(false)}
                            BackdropProps={{ style: backdropStyle }}
                            PaperProps={{ style: paperStyle }}
                        >
                            <DialogTitle></DialogTitle>
                            <DialogContent>
                                <Box
                                    // rules={[{ message: t('forms.stepFormLabels.loginError') }]}
                                    style={{ fontSize: '20px', margin: '0px' }}
                                >
                                    <Box>
                                        <Box>
                                            Recurring
                                            <Box>
                                                <Box sx={{ mt: '10px' }}>
                                                    <Button variant="text" sx={{
                                        textTransform: 'capitalize',
                                        // color: `${theme.palette.background.mainBg} !important`,
                                        border: `1px solid ${theme.palette.background.hoverColor} !important`,
                                        borderRadius: "5px !important",
                                        height: "30px !important",

                                        // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}>
                                                        Daily
                                                    </Button>
                                                </Box>
                                                <Box sx={{ mt: '10px' }}>
                                                    <Button variant="text" sx={{
                                        textTransform: 'capitalize',
                                        // color: `${theme.palette.background.mainBg} !important`,
                                        border: `1px solid ${theme.palette.background.hoverColor} !important`,
                                        borderRadius: "5px !important",
                                        height: "30px !important",

                                        // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}>
                                                        Weekly
                                                    </Button>
                                                </Box>
                                                <Box sx={{ mt: '10px' }}>
                                                    <Button variant="text" sx={{
                                        textTransform: 'capitalize',
                                        // color: `${theme.palette.background.mainBg} !important`,
                                        border: `1px solid ${theme.palette.background.hoverColor} !important`,
                                        borderRadius: "5px !important",
                                        height: "30px !important",

                                        // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            // backgroundImage: "linear-gradient(to right, #00F902, black) !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}>
                                                        Monthly
                                                    </Button>
                                                </Box>
                                            </Box>
                                            <Box sx={{ mt: '30px' }}>
                                                <Box
                                                sx={{
                                                    paddingY: "10px"
                                                }}
                                                >
                                                    <Typography variant="body2"
                                                    sx={{
                                                        color: `${theme.palette.background.hoverColor} !important`,
                                                        fontWeight: "bold"
                                                    }}
                                                    >Custom</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography variant="body2">Every</Typography>
                                                    </Box>
                                                    <Box sx={{ ml: '30px' }}>
                                                        <CssTextarea placeholder="Hours" sx={{ width: '130px', height: 'auto',
                                                        border: `1px solid ${theme.palette.background.hoverColor} !important`, 
                                                        borderRadius: '5px' 
                                                    }}
                                                        id='customID' />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setIsBasicModalVisible2(false)} sx={{
                                        // border: `1px solid ${theme.palette.background.default} !important`,
                                        borderRadius: "5px !important",
                                        height: "auto !important",
                                        backgroundColor: "transparent !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}
                                    >
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsBasicModalVisible2(false)} sx={{
                                        // border: `1px solid ${theme.palette.background.default} !important`,
                                        borderRadius: "5px !important",
                                        height: "auto !important",
                                        backgroundColor: "transparent !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }} >
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsBasicModalVisible1(false)} sx={{
                                        // border: `1px solid ${theme.palette.background.default} !important`,
                                        borderRadius: "5px !important",
                                        height: "auto !important",
                                        backgroundColor: "transparent !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }}>
                        Cancel
                    </Button>
                    <Button onClick={() => setIsBasicModalVisible1(false)} sx={{
                                        // border: `1px solid ${theme.palette.background.default} !important`,
                                        borderRadius: "5px !important",
                                        height: "auto !important",
                                        backgroundColor: "transparent !important",
                                        color: `${theme.palette.background.default} !important`,

                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                            // color: "blue",
                                            // borderColor: "blue",
                                        },
                                    }} >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SnipeTool5