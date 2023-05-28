import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTheme, styled } from "@mui/material/styles";
const SwapWithLimitSelect = () => {
    const theme = useTheme();
    return (
    <>
    <Box>
        <Box sx={{ mb: '10px' }}>
          <Typography
            sx={{
              color: `${theme.palette.background.hoverColor}`
            }}
          >B. Swap with limits orders and recuring periods</Typography>
        </Box>
      </Box>
    </>
  )
}

export default SwapWithLimitSelect