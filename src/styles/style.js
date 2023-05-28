import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2b2b2b" },
    background: {
      default: "#ffffff",
      mainBg: "#151617",
      hoverColor: "#00f902",
    },
    typography: {
      primary: "#ffffff"
    
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});
export default theme;
