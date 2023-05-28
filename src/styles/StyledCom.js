import React from "react"
import FormControl from "@mui/material/FormControl";

import { useTheme, styled } from "@mui/material/styles";
import "./custom.css"

// const StyledCom = () => {
    
//   return (
//     <div>StyledCom</div>
//   )
// }

// export default StyledCom


export const CustomFormControl = styled(FormControl)(({ theme = useTheme() }) => ({
  "& 	.Mui-error": {
    border: `1px solid ${theme.palette.background.hoverColor}`,
    backgroundColor: "transparent",
    borderColor: theme.palette.background.hoverColor,
    color: theme.palette.background.default,
    "&:focus": {
      border: `1px solid ${theme.palette.background.hoverColor}`,
      backgroundColor: "transparent",
      borderColor: theme.palette.background.hoverColor,
    },
    fieldset: {
      border: `1px solid ${theme.palette.background.hoverColor} !important`,
      backgroundColor: "transparent",
      borderColor: `${theme.palette.background.hoverColor} !important`,
      color: theme.palette.background.default,
    }
  },
  "& .css-puxybu.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.background.hoverColor} !important`,
      backgroundColor: "transparent",
      borderColor: `${theme.palette.background.hoverColor} !important`,
      color: theme.palette.background.default,
  },
  

}));