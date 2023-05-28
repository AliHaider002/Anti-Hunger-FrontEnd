import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import "./Audit.css";
import img from "./Images/dapp2.jpg";
import img2 from "./Images/dApps.jpg";
import img3 from "./Images/etherum2.jpg";
import img4 from "./Images/Etherum.jpg";
import { Box, useMediaQuery } from "@mui/material";

const SliderCustom = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <>
      {
        isSmallScreen ? (
          <Box
          // sx={{ width: "100%" }}
          // sx={{ width: {lg: "500px", md: "400px", sm: "400px", xs: "100vw"}}}
          sx={{ width: {lg: "500px", md: "400px", sm: "400px", xs: "61vw"}, paddingX: "5px", paddingY: "10px"}}
          >
            <Slider {...settings}>
              <div>
                <img
                  src={img}
                  width="100%"
                  height="120px"
                // style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img2}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img3}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img4}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img2}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Slider>
          </Box>
        ) : (
          <>
             <Box
          // sx={{ width: "100%" }}
          sx={{ width: {lg: "500px", md: "400px", sm: "400px", xs: "100vw"}, paddingX: "5px", paddingY: "10px"}}
          >
            <Slider {...settings}>
              <div>
                <img
                  src={img}
                  width="100%"
                  height="180px"
                // style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img2}
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img3}
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img4}
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img}
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={img2}
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Slider>
          </Box>
          </>
        )
      }

    </>
  );
};

export default SliderCustom;
