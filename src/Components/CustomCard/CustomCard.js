import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomCard = ({ children }) => {
  let theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          borderRadius: "8px",
          backgroundColor: theme.palette.background.mainBg,
          minHeight: "50vh",
          maxHeight: "auto",
          width: "100%",
          padding: "0px"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CustomCard;
