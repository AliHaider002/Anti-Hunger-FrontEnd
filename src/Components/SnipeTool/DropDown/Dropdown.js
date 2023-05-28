import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Save, Print, Share } from "@material-ui/icons";
import { Box, TextField, Typography, styled, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const useStyles = makeStyles((theme = useTheme()) => ({
  // button: {
  //     backgroundColor: "transparent",
  //     color: "white",
  //     boxShadow: "none",
  //     fontSize: "10px",
  //     margin: theme.spacing(1),
  //     '&:hover': {
  //         backgroundColor: 'transparent',
  //         boxShadow: "none",
  //     },
  // },
  menu: {
    backgroundColor: "#151617",
    color: "white",
    top: `${{ lg: "480px", md: "480px", sm: "480px" }}!important`,
    // top: "480px !important",
    left: { lg: "750px", md: "750px", sm: "750px" },
    padding: "10px",
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
      top: "-20px",
    },
  },
});

const DropdownMenu = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { cake, menuOpen, setMenuOpen } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <Box
      // anchorEl={anchorEl}
      // keepMounted
      // open={Boolean(anchorEl)}
      // open={menuOpen}
      // onClose={handleClose}
      // classes={{
      //     paper: classes.menu,
      // }}
      sx={{
        display: `${cake}`,
        width: "auto",
        height: "auto",
        border: "1px solid red",
      }}
    >
      <Box
      // onClick={handleClose}
      >
        <CssTextField
          type="text"
          variant="outlined"
          placeholder="Paste address"
          fullWidth
          id="customID"
          // autoComplete={false}
          // onFocus={handleClick}
          // autoHighlight={false}
          //onChange={handleSearchValue}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <IconButton onClick={handleSearch}>
          //         <SearchIcon sx={{ color: "white" }} />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </Box>
      <Box onClick={handleClose}>
        <Typography>TOKEN NAME</Typography>
      </Box>
      <Box onClick={handleClose}>
        <Typography>SYMBOL</Typography>
      </Box>
      <Box onClick={handleClose}>
        <Typography>DECIMALS</Typography>
      </Box>
      <Box onClick={handleClose}>
        <Typography>LIQUIDITY</Typography>
      </Box>
      <Box onClick={handleClose}>
        <Typography>FEE ON TRANSFE-SELL-BUY</Typography>
      </Box>
    </Box>
  );
};

export default DropdownMenu;
