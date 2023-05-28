import React from 'react'
import CustomCard from '../../Components/CustomCard/CustomCard'
import Signup from '../../Components/Signup/Signup'
import { Box, useTheme } from '@mui/material'
import './custom.css'
const SignUpScreen = () => {
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "800px",
          backgroundColor: theme.palette.background.mainBg,
        }}
      >
        <CustomCard>
          <Signup />
        </CustomCard>
      </Box>
    </>
  )
}

export default SignUpScreen