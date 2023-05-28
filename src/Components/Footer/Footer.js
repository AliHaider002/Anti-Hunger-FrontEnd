import { Box, Link, Typography, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  let theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
        alignItems: { lg: "center", md: "center", sm: "center", xs: "start" },
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          sx={{
            color: theme.palette.background.default,
          }}
        >
          Copyright{" "}
          <Link
            sx={{
              color: theme.palette.background.hoverColor,
              textDecoration: "none",
              cursor: "pointer",
            }}
            // href="javaScript:void(0)"
          >
            casa.com
          </Link>{" "}
          2023 ©.Powered by{" "}
          <Link
            sx={{
              color: theme.palette.background.hoverColor,
              textDecoration: "none",
              cursor: "pointer",
            }}
            // href="javaScript:void(0)"
          >
            casa token.
          </Link>
        </Typography>
      </Box>
      <Box>
        <IconButton sx={{ color: theme.palette.background.hoverColor }}>
          <a href="https://linkedin.com/company/altence">
            <LinkedInIcon
              sx={{
                fontSize: "40px",
                color: theme.palette.background.hoverColor,
              }}
            />
          </a>
        </IconButton>
        <IconButton sx={{ color: theme.palette.background.hoverColor }}>
          <a href="https://twitter.com/altence_team">
            <TwitterIcon
              sx={{
                fontSize: "40px",
                color: theme.palette.background.hoverColor,
              }}
            />
          </a>
        </IconButton>
        <IconButton sx={{ color: theme.palette.background.hoverColor }}>
          <a href="https://linkedin.com/company/altence">
            <TelegramIcon
              sx={{
                fontSize: "40px",
                color: theme.palette.background.hoverColor,
              }}
            />
          </a>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
