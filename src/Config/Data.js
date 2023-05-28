import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import kycIcon from "../Screen/Audits/Images/kycicon.png";
import pdfIcon from "../Screen/Audits/Images/pdficon.png";
import binanceLogo from "../Screen/Audits/Images/binance.png";
import bnb from "../Screen/Audits/Images/bnb.jpg";
import USDT from "../Screen/Audits/Images/usdt.jpg";
import polyGon from "../Screen/Audits/Images/polygon.png";

export const rows = [
  {
    id: "A01",
    name: `Snipe Finance`,
    score: (
      <Box
        sx={{
          backgroundColor: "red !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Minko Finance`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Snipe NFT`,
    score: (
      <Box
        sx={{
          backgroundColor: "orange !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Cyrupto Marketplace`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `NFT Marketplace`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Snipe Finance new`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Minko Finance new`,
    score: (
      <Box
        sx={{
          backgroundColor: "red !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Snipe NFT new`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `Cyrupto Marketplace new`,
    score: (
      <Box
        sx={{
          backgroundColor: "yewllow !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
  {
    id: "A01",
    name: `NFT Marketplace new`,
    score: (
      <Box
        sx={{
          backgroundColor: "green !important",
          width: "10px",
          height: "10px",
          borderRadius: "50px !important",
          margin: "auto",
        }}
      ></Box>
    ),
    blockchain: "Ethereum",
    code: (
      <Avatar
        alt="not found"
        src={polyGon}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://twitter.com/", "_blank")}
      />
    ),
    test: (
      <Avatar
        alt="not found"
        src={USDT}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.linkedin.com/", "_blank")}
      />
    ),
    audit: (
      <img
        src={pdfIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      />
    ),
    kyc: (
      <img
        src={kycIcon}
        alt="not found"
        style={{ cursor: "pointer" }}
        onClick={() => window.open("https://medium.com/", "_blank")}
      />
    ),
    date: "23/03/2023",
    nameImg: (
      <Avatar
        alt="not found"
        src={binanceLogo}
        sx={{ width: "25px", height: "25px", cursor: "pointer" }}
        onClick={() => window.open("https://www.reddit.com/", "_blank")}
      />
    ),
  },
];
