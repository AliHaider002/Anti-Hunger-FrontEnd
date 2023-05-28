import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  styled,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart/Chart";
import logo from "./bnb2.png";
import DropdownMenu from "./DropDown/Dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));

const SnipeTool = () => {
  let theme = useTheme();
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState("Select");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setSelectedItems(event.target.value);
  };
  const items = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
    { value: "item3", label: "Item 3" },
  ];
  const CustomFormControl = styled(FormControl)(({ theme }) => ({
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
    },
  }));
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
        borderColor: "#00f902",
        transition: "border-color 0.5s ease",
        height: "50px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00f902",
        height: "50px",
      },
      "&  #customID": {
        color: "white",
        height: "50px",
        top: "-20px",
      },
    },
  });
  const CssDiaLogTextarea = styled(TextField)({
    // marginTop: '10px',
    height: "200px",
    "& label.Mui-focused": {
      color: "white",
      height: "50px",
    },
    "& .MuiOutlinedInput-root": {
      height: "100px",
      "& fieldset": {
        borderColor: "white",
        color: "white",
        height: "200px",
      },
      "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
        color: "white",
        height: "50px",
        // background: "#414141",
      },
      "&:hover fieldset": {
        borderColor: "#00f902",
        transition: "border-color 0.5s ease",
        height: "200px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00f902",
        height: "200px",
      },
      "&  #customID": {
        color: "white",
        height: "50px",
        top: "-20px",
        "&:placeholder": {
          color: "red !important",
        },
      },
    },
  });
  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: "50%",
    padding: "20px",
  };

  const backdropStyle = {
    backgroundColor: "rgba(1, 1, 1, 0.7)",
  };
  return (
    <Box>
      <CustomFormControl
        sx={{ m: 1, width: "98%", paddingTop: "20px" }}
        //   className={classes.formControl}
        error
      >
        {/* <Select
          multiple
          value={selectedNames}
          onChange={handleChange}
          displayEmpty
          variant="outlined"
          inputProps={{
            name: 'names',
            id: 'names-select',
          }}
        // sx={{ background: "red" }}
        >
          <MenuItem value="" disabled>
            <em>Select</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select> */}
        <Select
          displayEmpty
          variant="outlined"
          // value={selectedItems === "" ? "Select" : selectedItems }
          value={selectedItems}
          // value={"abc"}
          onChange={handleChange}
          // renderValue={(selected) => (
          //   <Box display="flex" flexWrap="wrap">
          //     {selected?.map((value) => (
          //       <Box key={value} m={0.5}>
          //         {value}
          //       </Box>
          //     ))}
          //   </Box>
          // )}
        >
          {/* <MenuItem value="">
              <em>Select</em>
            </MenuItem> */}
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </CustomFormControl>
      {selectedItems === "item1" && (
        <Box>
          <Box>
            <CustomFormControl
              sx={{ m: 1, width: "98%", paddingTop: "20px" }}
              //   className={classes.formControl}
              error
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 550,
                  color: `${theme.palette.background.hoverColor}`,
                  paddingBottom: "10px",
                }}
              >
                Wallet
              </Typography>
              <CssTextField
                type="text"
                variant="outlined"
                placeholder="Input the number of wallet to generate max 1000 wallets at time"
                fullWidth
                id="customID"
                // autoComplete={false}
                // onFocus={handleClick}
                // autoHighlight={false}
                //onChange={handleSearchValue}
              />
            </CustomFormControl>
          </Box>

          <Box
            sx={{
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 550,
                color: `${theme.palette.background.hoverColor}`,
                paddingBottom: "10px",
              }}
            >
              Pay and Generate
            </Typography>
            <div>
              <RadioGroup
                value={value}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  color: `${theme.palette.background.default}`,
                }}
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="Pay per use"
                />
                <FormControlLabel
                  value="option2"
                  label="1 Month"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="option3"
                  control={<Radio />}
                  label="1 Year"
                />
              </RadioGroup>
            </div>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              paddingBottom: "10px",
              paddingTop: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                border: `1px solid ${theme.palette.background.hoverColor}`,
                borderRadius: "5px",
                height: "50px",
                color: "white",
                fontSize: "15px",
                fontWeight: "300px",
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: "10px 30px",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              APPROVE TO PAY AND GENERATE{" "}
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              BackdropProps={{ style: backdropStyle }}
              PaperProps={{ style: paperStyle }}
            >
              <DialogTitle></DialogTitle>
              <DialogContent>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 550,
                    color: `${theme.palette.background.default}`,
                    paddingBottom: "10px",
                  }}
                >
                  Oops Wallet not Connected.....
                </Typography>
                {/* <CssDiaLogTextarea
            type="text"
            variant="outlined"
            fullWidth
            placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
            id="customID"
            // autoComplete={false}
            // onFocus={handleClick}
            // autoHighlight={false}
            multiline
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
            }}} 
          // onChange={handleSearchValue}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <IconButton onClick={handleSearch}>
          //         <SearchIcon sx={{ color: "white" }} />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
          // />*/}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  sx={{
                    color: `${theme.palette.background.default}`,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    color: `${theme.palette.background.default}`,
                  }}
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      )}
      {selectedItems === "item2" && (
        <div>
          <Box>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    paddingRight: "30px",
                  }}
                >
                  1
                </Typography>
              </Box>
              <Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="Set Receiver Wallet"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="Bnb" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <Box></Box>
              </Box>
              <Box
                sx={{
                  paddingLeft: "5px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="cake" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  fullWidth
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  borderRadius: "5px",
                  height: "50px",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "300px",
                  backgroundColor: "transparent",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                Set Preferences
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropProps={{ style: backdropStyle }}
                PaperProps={{ style: paperStyle }}
              >
                <DialogTitle>Sample CSV File</DialogTitle>
                <DialogContent>
                  <CssDiaLogTextarea
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                    id="customID"
                    // autoComplete={false}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "100px",
                      },
                    }}
                    //onChange={handleSearchValue}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <IconButton onClick={handleSearch}>
                    //         <SearchIcon sx={{ color: "white" }} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    paddingRight: "30px",
                  }}
                >
                  2
                </Typography>
              </Box>
              <Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="Set Receiver Wallet"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="Bnb" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <Box></Box>
              </Box>
              <Box
                sx={{
                  paddingLeft: "5px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="cake" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  fullWidth
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  borderRadius: "5px",
                  height: "50px",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "300px",
                  backgroundColor: "transparent",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                Set Preferences
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropProps={{ style: backdropStyle }}
                PaperProps={{ style: paperStyle }}
              >
                <DialogTitle>Sample CSV File</DialogTitle>
                <DialogContent>
                  <CssDiaLogTextarea
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                    id="customID"
                    // autoComplete={false}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "100px",
                      },
                    }}
                    //onChange={handleSearchValue}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <IconButton onClick={handleSearch}>
                    //         <SearchIcon sx={{ color: "white" }} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    paddingRight: "30px",
                  }}
                >
                  3
                </Typography>
              </Box>
              <Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="Set Receiver Wallet"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="Bnb" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <Box></Box>
              </Box>
              <Box
                sx={{
                  paddingLeft: "5px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="cake" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  fullWidth
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  borderRadius: "5px",
                  height: "50px",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "300px",
                  backgroundColor: "transparent",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                Set Preferences
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropProps={{ style: backdropStyle }}
                PaperProps={{ style: paperStyle }}
              >
                <DialogTitle>Sample CSV File</DialogTitle>
                <DialogContent>
                  <CssDiaLogTextarea
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                    id="customID"
                    // autoComplete={false}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "100px",
                      },
                    }}
                    //onChange={handleSearchValue}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <IconButton onClick={handleSearch}>
                    //         <SearchIcon sx={{ color: "white" }} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    paddingRight: "30px",
                  }}
                >
                  4
                </Typography>
              </Box>
              <Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="Set Receiver Wallet"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="Bnb" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <Box></Box>
              </Box>
              <Box
                sx={{
                  paddingLeft: "5px",
                }}
              >
                <img src={logo} width="20px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <DropdownMenu cake="cake" />
                </Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="0.0"
                  fullWidth
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton onClick={handleSearch}>
                  //         <SearchIcon sx={{ color: "white" }} />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  borderRadius: "5px",
                  height: "50px",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "300px",
                  backgroundColor: "transparent",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                Set Preferences
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropProps={{ style: backdropStyle }}
                PaperProps={{ style: paperStyle }}
              >
                <DialogTitle>Sample CSV File</DialogTitle>
                <DialogContent>
                  <CssDiaLogTextarea
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                    id="customID"
                    // autoComplete={false}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "100px",
                      },
                    }}
                    //onChange={handleSearchValue}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <IconButton onClick={handleSearch}>
                    //         <SearchIcon sx={{ color: "white" }} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: `${theme.palette.background.default}`,
                    }}
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </div>
      )}
      {selectedItems === "item3" && (
        <div>
          <Box>
            <Box sx={{ mb: "10px" }}>
              <Typography
                sx={{
                  paddingTop: "10px",
                  color: "white",
                }}
              >
                B. Connect wallet and swap with limits orders and recurring
                periods
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box>
                    <Chart />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    padding: "10px 10px",
                    color: "white",
                  }}
                >
                  Swap From
                </Typography>
                <Typography
                  sx={{
                    padding: "10px 40px",
                    color: "white",
                    paddingleft: "10px",
                  }}
                >
                  Swap Away
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "5px",
                  margin: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <img src={logo} width="20px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box>
                      <DropdownMenu cake="Bnb" />
                    </Box>
                    <CssTextField
                      type="text"
                      variant="outlined"
                      placeholder="0.0"
                      fullWidth
                      id="customID"
                      // autoComplete={false}
                      // onFocus={handleClick}
                      // autoHighlight={false}
                      //onChange={handleSearchValue}
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <IconButton onClick={handleSearch}>
                      //         <SearchIcon sx={{ color: "white" }} />
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <Box></Box>
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: "5px",
                    }}
                  >
                    <img src={logo} width="20px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box>
                      <DropdownMenu cake="cake" />
                    </Box>
                    <CssTextField
                      type="text"
                      variant="outlined"
                      placeholder="0.0"
                      fullWidth
                      id="customID"
                      // autoComplete={false}
                      // onFocus={handleClick}
                      // autoHighlight={false}
                      //onChange={handleSearchValue}
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <IconButton onClick={handleSearch}>
                      //         <SearchIcon sx={{ color: "white" }} />
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                      borderRadius: "5px",
                      height: "50px",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "300px",
                      backgroundColor: "transparent",
                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Set Preferences
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{ style: backdropStyle }}
                    PaperProps={{ style: paperStyle }}
                  >
                    <DialogTitle>Sample CSV File</DialogTitle>
                    <DialogContent>
                      <CssDiaLogTextarea
                        type="text"
                        variant="outlined"
                        fullWidth
                        placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                        id="customID"
                        // autoComplete={false}
                        // onFocus={handleClick}
                        // autoHighlight={false}
                        multiline
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "100px",
                          },
                        }}
                        //onChange={handleSearchValue}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       <IconButton onClick={handleSearch}>
                        //         <SearchIcon sx={{ color: "white" }} />
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleClose}
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default SnipeTool;
