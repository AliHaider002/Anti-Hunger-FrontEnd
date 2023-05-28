import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';

const SnipeTool3 = (props) => {
    const {MultipleWallets} = props;

    function download(filename, text) {
        var element = document.createElement("a")
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        )
        element.setAttribute("download", filename)
      
        element.style.display = "none"
        document.body.appendChild(element)
      
        element.click()
      
        document.body.removeChild(element)
      }
      
    function handleClick() {
        // Generate download of hello.txt file with some content
        var text = document.getElementById("text-val")
        text = text?.innerHTML
        var filename = "WalletGenerated.txt"
      
        download(filename, text)
      }
      let theme = useTheme();
      
    return (
        <Box
        sx={{
            color: `${theme.palette.background.default}`
        }}
        >
            <Box
                sx={{
                    textTransform: 'uppercase',
                    mt: '20px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '10px',
                }}
            >
                <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
                    Don't refresh or leave this page without saving your generated wallets "Id, Address, Private Key", we don't
                    save this information, If you don't save them they will be lost forever
                </Typography>
            </Box>
            <Box sx={{ mt: '20px' }}>
                <Box sx={{ mb: '10px' }}>
                    <Typography>A1. Generate wallets with Private keys</Typography>
                </Box>
            </Box>

            {
                MultipleWallets ? (
                    <Box
                        sx={{
                            width: "100%",
                            height: "300px",
                            overflowX: "scroll",
                            overflowY: "scroll",
                            border: "1px solid white",
                            borderRadius: "9px"
                        }}
                    >
                        <Box>
                            <p id="text-val" style={{ display: "none" }}>
                                {MultipleWallets &&
                                    MultipleWallets.publickeys.map((v, i) => {
                                        return (
                                            <span key={i}>
                                                Id:{i} , Address:{v} , PrivateKeys:
                                                {MultipleWallets.privateKeys[i]} <br />
                                            </span>
                                        )
                                    })}
                            </p>
                        </Box>
                        <Box
                            sx={{
                                width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    width: { lg: "10%", md: "10%", sm: "20%", xs: "30%" },
                                    height: "auto"
                                }}
                            >
                                <Box sx={{ pl: "10px", mb: "20px" }}>
                                    <Typography
                                        sx={{
                                            fontSize: { lg: "15px", md: "auto", sm: "auto", xs: "12px" },
                                            fontWeight: "bold"
                                        }}
                                    >
                                        ID
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        // borderRight: '1px solid white',
                                        // borderRadius: '9px',
                                        pl: "10px"
                                        // overflowY: 'scroll',
                                    }}
                                >
                                    {MultipleWallets &&
                                        MultipleWallets.publickeys.map((v, i) => {
                                            return (
                                                <>
                                                    <Typography key={i} sx={{ fontSize: "auto" }}>
                                                        {i}
                                                    </Typography>
                                                </>
                                            )
                                        })}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "auto",
                                    height: "auto"
                                }}
                            >
                                <Box sx={{ pl: "10px", mb: "20px" }}>
                                    <Typography
                                        sx={{
                                            fontSize: { lg: "15px", md: "auto", sm: "auto", xs: "12px" },
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Address
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "auto",
                                        height: "auto",
                                        borderLeft: "1px solid white",
                                        // borderRadius: '9px',
                                        pl: "10px",
                                        pr: "10px"
                                        // overflowY: 'scroll',
                                    }}
                                >
                                    {MultipleWallets &&
                                        MultipleWallets.publickeys.map((v, i) => {
                                            return (
                                                <Typography key={i} sx={{ fontSize: "auto" }}>
                                                    {v}
                                                </Typography>
                                            )
                                        })}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "auto",
                                    height: "auto"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        pl: "10px",
                                        mb: "16px",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { lg: "15px", md: "auto", sm: "auto", xs: "12px" },
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Private Keys
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Button
                                            onClick={handleClick}
                                            sx={{ p: "0px", m: "0px", textTransform: "capitalize" }}
                                            endIcon={<DownloadIcon />}
                                        >
                                            Download all
                                        </Button>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        width: "auto",
                                        height: "auto",
                                        borderLeft: "1px solid white",
                                        // borderRadius: '9px',
                                        pl: "10px",
                                        pr: "10px"
                                        // overflowY: 'scroll',
                                    }}
                                >
                                    {MultipleWallets &&
                                        MultipleWallets.privateKeys.map((v, i) => {
                                            return (
                                                <Typography key={i} sx={{ fontSize: "auto" }}>
                                                    {v}
                                                </Typography>
                                            )
                                        })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    ""
                )
            }

        </Box>
    )
}

export default SnipeTool3