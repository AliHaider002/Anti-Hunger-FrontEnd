import React, { useState, useEffect, Component, useContext } from "react";

import {
  Box,
  OutlinedInput,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { motion } from 'framer-motion'
import SearchIcon from "@mui/icons-material/Search";
import Slider from "react-slick";
import { styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import css from './Hero.module.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
// import "./Audit.css";
import SliderCustom from "./SliderCustom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { rows } from "../../Config/Data";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";
import AppCtx from "../../Components/Context/MyContext";
import slider from "./Images/slider.png"
import slider1 from "./Images/slider2.png"

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
      borderColor: "white",
      height: "50px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      height: "50px",
    },
    "&  #customID": {
      color: "white",
      height: "50px",
      top: "-20px",
    },
  },
});

const Audits = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const onChange = (currentSlide) => {};

  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = useState("");
  const [newRow, setNewRow] = useState("");
  const [newRowMenu, setNewRowMenu] = useState(true);
  const [newRowShow, setNewRowShow] = useState(false);
  const [showData, setShowData] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [resultRow, setResultRow] = useState([]);

  let pageSize = Math.ceil(rows.length / 5);

  const handleSearch = (name) => {
    setSearch(name);
    rows &&
      rows.filter((item) => {
        let newSearch = search.toLowerCase();
        let newItemName = item.name.toLowerCase();
        let otherName = name.toLowerCase();
        if (newSearch === newItemName || otherName === newItemName) {
          setNewRow(item);
          setNewRowShow(true);
          setNewRowMenu(false);
        }
      });
  };

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
    if (search != "") {
      setShowData(true);
    }
  };

  // const [test, setTest] = useState("")
  // const tokenAddressTest = (e) => {
  //   setTest(e.target.value)
  // }

  React.useEffect(() => {
    if (search === "" && showData === true) {
      setNewRowShow(false);
      setShowData(false);
      setNewRowMenu(true);
    } else {
    }
  }, [search]);
  let resRow = [];

  const HandlePagination = (e, value) => {
    setPageCount(value);
    // resRow = paginate(rows, pageSize, pageCount);
    setResultRow(paginate(rows, pageSize, value));
  };

  function paginate(rows, pageSize, pageCount) {
    return rows.slice((pageCount - 1) * pageSize, pageCount * pageSize + 3);
  }

  //

  useEffect(() => {
    setResultRow(paginate(rows, pageSize, pageCount));
  }, []);

  const useContextAPI = useContext(AppCtx);

  useEffect(() => {
    var isUserAuthorized = async () => {
      useContextAPI?.setIsTimeToShowAuth(true);
      var result = await checkIfUserAuthorizedToUse();

      if (result.success) {
        useContextAPI?.setAuthorizedUser(result.isAuth);
      } else {
        useContextAPI?.setAuthorizedUser(result.isAuth);
      }
    };
    setTimeout(() => {
      isUserAuthorized();
    }, 2000);
  }, [useContextAPI?.isWalletConnected == true]);

  return (
    <>
      {/* <Box sx={{ width: "99%" }}> */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#151617",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: "20px",
          }}
        >
          <Box>
            <Box 
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
            >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                  lg: "column",
                  md: "column",
                  sm: "row",
                  xs: "column",
                },
                justifyContent: "space-between",
                // alignItems: "start",
              }}
            >
              {isSmallScreen ? (
                <>
                  <Box
                    sx={{
                      width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          lg: "30px",
                          md: "25px",
                          sm: "18",
                          xs: "18px",
                        },
                        fontWeight: "bold",
                      }}
                    >
                      Audits Firm 2.0
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          lg: "20px",
                          md: "12px",
                          sm: "12px",
                          xs: "10px",
                        },
                        lineHeight: "27px",
                        mt: "10px",
                      }}
                    >
                      Deploy Token Smart Contracts effortlessly,
                      <br /> no coding required.
                    </Typography>
                    {/* <Typography
                        sx={{
                          color: "white",
                          fontSize: {
                            lg: "20px",
                            md: "12px",
                            sm: "12px",
                            xs: "10px",
                          },
                          lineHeight: "27px",
                        }}
                      >
                        required.
                      </Typography> */}
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          lg: "30px",
                          md: "25px",
                          sm: "18",
                          xs: "18px",
                        },
                        fontWeight: "bold",
                      }}
                    >
                      Audits Firm 2.0
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          lg: "20px",
                          md: "12px",
                          sm: "12px",
                          xs: "10px",
                        },
                        lineHeight: "27px",
                        mt: "10px",
                      }}
                    >
                      Deploy Token Smart Contracts effortlessly, no coding{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          lg: "20px",
                          md: "12px",
                          sm: "12px",
                          xs: "10px",
                        },
                        lineHeight: "27px",
                      }}
                    >
                      required.
                    </Typography>
                  </Box>
                </>
              )}
            <Box
              sx={{
                width: { lg: "100%", md: "55%", sm: "50%", xs: "100%" },
                // height: '10px',
                paddingX: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                mt: "20px",
              }}
            >
              {/* <CssTextField
                  type="text"
                  variant="outlined"
                  value={test}
                  placeholder="Search project by name"
                  fullWidth
                  id="customID"
                  autoComplete={false}
                  onFocus={handleClick}
                  autoHighlight={false}
                  onChange={tokenAddressTest}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleSearch}>
                          <SearchIcon sx={{ color: "white" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /> */}
              <CssTextField
                type="text"
                variant="outlined"
                value={search}
                placeholder="Search project by name"
                fullWidth
                id="customID"
                // autoComplete={false}
                onFocus={handleClick}
                // autoHighlight={false}
                onChange={handleSearchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon sx={{ color: "white" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { fontSize: 13 },
                }}
              />
              {newRowMenu ? (
                <Box
                  sx={{
                    backgroundColor: "#2b2b2b",
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                >
                  {rows
                    .filter((item) => {
                      let newSearch = search.toLowerCase();
                      let newItemName = item.name.toLowerCase();
                      if (newItemName.includes(newSearch) && search != "") {
                        return rows;
                      }
                    })
                    .map((v, i) => {
                      return (
                        <MenuItem
                          value={v?.name}
                          sx={{ color: "white" }}
                          onClick={() => {
                            handleSearch(v.name);
                          }}
                        >
                          {v?.name}
                        </MenuItem>
                      );
                    })}
                </Box>
              ) : (
                ""
              )}
            </Box>
              
            </Box>
            <Box
              sx={
                {
                  width: { lg: "55%", md: "55%", sm: "50%", xs: "100%" },
                  display: { lg: "block", md: "block", sm: "none", xs: "none" },
                  backgroundColor: "gold",
                  boxShadow: "1px",
                  paddingBottom: "15px",
                  borderColor: `${theme.palette.background.hoverColor}`,
                  borderRadius: "20px"
                }
              }
            >
              <Box className={css.wrapper}>
                <Box className={css.Circlefloating}>
                  <img initial={{ bottom: "3rem" }} whileInView={{ bottom: "1rem" }} src={slider1} className={css.blueCircle} alt="slider2 behind the slider1" />

                </Box>
                <img initial={{ bottom: "-3rem" }} whileInView={{ bottom: "4rem" }} src={slider} alt="" width={400} />

                {/* <Box 
                initial={{right: "4%"}} whileInView={{right: "2%"}}
                className={css.cart2}>
                    <RiShoppingBagFill />
                    <Box className={css.signup}>
                        <span>Best SignUp Offers</span>
                        <Box>
                            <BsArrowRight />
                        </Box>
                    </Box>
                </Box> */}
              </Box>
              {/* <SliderCustom /> */}
            </Box>
            </Box>
            

            <Box sx={{ width: "100%", mt: "50px" }}>
              <Typography sx={{ fontSize: "22px", color: "white" }}>
                Audits
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  overflowX: {
                    lg: "auto",
                    md: "auto",
                    sm: "scroll",
                    xs: "scroll",
                  },
                  backgroundColor: "#2b2b2b",
                }}
                className="table-container"
              >
                <Table
                  sx={{
                    width: "100%",
                    backgroundColor: "#2b2b2b",
                    color: "white",
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        # ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        NAME
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        SCORE
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        BLOCKCHAIN
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        CODE
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        TESTS
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        AUDIT
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        KYC
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        DATE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {newRowShow ? (
                    <TableBody>
                      {/* { */}

                      <TableRow
                        key={newRow.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "white" }}
                        >
                          {newRow.id}
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box sx={{ color: "white" }}>{newRow.nameImg}</Box>
                            <Box sx={{ color: "white" }}>{newRow.name}</Box>
                          </Stack>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.score}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.blockchain}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.code}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.test}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.audit}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.kyc}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          {newRow.date}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {resultRow &&
                        resultRow.map((row) => {
                          return (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ color: "white" }}
                              >
                                {row.id}
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Box sx={{ color: "white" }}>
                                    {row.nameImg}
                                  </Box>
                                  <Box sx={{ color: "white" }}>{row.name}</Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.score}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.blockchain}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.code}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.test}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.audit}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.kyc}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                {row.date}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  )}
                </Table>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "20px",
                    mt: "10px",
                  }}
                >
                  <Pagination
                    count={pageSize}
                    page={pageCount}
                    onChange={HandlePagination}
                    shape="rounded"
                    sx={{ color: "white" }}
                  />
                </Box>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default Audits;
