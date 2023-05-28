import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import "../custom.css";

const Step2 = (props) => {
  const {
    sendBNBandTokenConfirmData,
    successTransaction,
    successTransactionLink,
    errors,
    feesData,
  } = props;

  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "10px",
        color: theme.palette.background.default,
      }}
    >
      {sendBNBandTokenConfirmData ? (
        <>
          {sendBNBandTokenConfirmData.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box
                  key={index + 1}
                  sx={{
                    padding: "10px",
                  }}
                >
                  {item.name}
                </Box>
                <Box
                  key={index + 2}
                  sx={{
                    padding: "10px",
                  }}
                >
                  {item.value}
                </Box>
              </Box>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {(() => {
        if (feesData.length > 0) {
          return feesData.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box
                  key={index + 1}
                  sx={{
                    padding: "10px",
                  }}
                >
                  {item.name}
                </Box>
                <Box
                  key={index + 2}
                  sx={{
                    padding: "10px",
                  }}
                >
                  {item.value}
                </Box>
              </Box>
            );
          });
        }
      })()}
      <Typography sx={{ textAlign: "center", color: "red" }}>
        {errors?.error?.data ? errors?.error?.data?.message : ""}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "red" }}>
        {errors?.error ? errors?.error : ""}
      </Typography>

      <Typography sx={{ textAlign: "center", color: "white" }}>
        {successTransaction ? (
          <>
            SNIPE sent successfully your bulk transaction
            <br />
            <a href={successTransactionLink} target="_blank" class="my-link">
              {successTransaction.hash}
            </a>
          </>
        ) : (
          <></>
        )}
      </Typography>
    </Box>
  );
};

export default Step2;
