import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { Save, Print, Share } from '@material-ui/icons';
import { Box, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography, styled, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const useStyles = makeStyles((theme = useTheme()) => ({
    button: {
        backgroundColor: "transparent",
        color: "white",
        boxShadow: "none",
        fontSize: "10px",
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: "none",
        },
    },
    menu: {
        
        backgroundColor: "#151617",
        color: "white"
    },

}));

const CssTextField = styled(TextField)({
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
            transition: 'border-color 0.5s ease',
            height: "50px",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00f902",
            height: "50px",
        },
        "&  #customID": {
            color: "white",
            height: "50px",
            top: "-20px",
        },
    },
});

const PreferenceMenu = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { cake } = props;
    const [value, setValue] = useState();
    const onChange = (e) => {
        setValue(e.target.value);
      }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                className={classes.button}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
            >
                PreferenceMenu <KeyboardArrowDownIcon />
            </Button>
            <Menu style={{ padding: '10px', position: 'relative', zIndex: '1', width: '250px' }}

                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{
                    paper: classes.menu,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        mb: '20px',
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '12px' }}>SET PREFERENCES</Typography>
                    </Box>
                    <Box sx={{ ml: '10px' }}>
                        <Tooltip
                            disableFocusListener
                            title="Set Preferences"
                            sx={{
                                width: '10px',
                            }}
                        >
                            <IconButton
                                sx={{
                                    border: '1px solid white',
                                    borderRadius: '50%',
                                    width: '10px',
                                    height: '10px',
                                }}
                            >
                                <QuestionMarkIcon sx={{ fontSize: '9px', color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ mb: '10px' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ mr: '10px', fontSize: '10px' }}>Set Date</Box>
                        <Box>
                            <RadioGroup onChange={onChange} value={value}>
                                <Radio value="1" />
                            </RadioGroup>
                        </Box>
                    </Box>
                    {/* <DayjsDatePicker style={{ width: '100%', height: '26px' }} /> */}
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
                <Box sx={{ mb: '10px' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ mr: '10px', fontSize: '10px' }}>Set Price Limit</Box>
                        <Box>
                            <RadioGroup onChange={onChange} value={value}>
                                <Radio value="2" />
                            </RadioGroup>
                        </Box>
                    </Box>
                    <input style={{ width: '80px', height: '26px', borderRadius: '25px' }} />
                </Box>
                <Box sx={{ mb: '30px' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ mr: '10px', fontSize: '10px' }}>Recurring</Box>
                        <Box>
                            <RadioGroup onChange={onChange} value={value}>
                                <Radio value="3" />
                            </RadioGroup>
                        </Box>
                    </Box>
                    <TextField placeholder="Days" style={{ width: '60px', height: '26px', borderRadius: '25px' }} />
                </Box>
                <Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ mr: '10px', fontSize: '10px' }}>All wallets</Box>
                        <Box>
                            <RadioGroup onChange={onChange} value={value}>
                                <Radio value="4" />
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>
            </Menu>
        </Box>


    )
}

export default PreferenceMenu