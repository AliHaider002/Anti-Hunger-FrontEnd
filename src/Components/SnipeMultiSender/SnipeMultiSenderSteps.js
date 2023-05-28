import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./custom.css";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled, useTheme } from "@mui/material/styles";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-90% + 16px)",
    right: "calc(10% + 16px)",
    [theme.breakpoints.down("lg")]: {
      left: "calc(-87% + 16px)",
      right: "calc(13% + 16px)",
    },
    [theme.breakpoints.down("md")]: {
      left: "calc(-80% + 16px)",
      right: "calc(20% + 16px)",
    },
    [theme.breakpoints.down("sm")]: {
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export default function SnipeMultiSenderSteps() {
  let theme = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        // activeStep={1}
        alternativeLabel
        connector={<QontoConnector />}
        orientation="horizontal"
        sx={{
          width: "100%",
          p: "0px",
          margin: "0px",
          color: "white",
        }}

        // theme.palette.background.hoverColor
      >
        <Step key="Add Your Allocation" className="NewStep">
          <StepLabel>Add Your Allocation</StepLabel>
        </Step>
        <Step key="Confirmation" className="NewStep1">
          <StepLabel>Confirmation</StepLabel>
        </Step>
      </Stepper>
      {/* <Stepper activeStep={1} orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
    </Box>
  );
}
