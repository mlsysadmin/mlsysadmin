import React from "react";
import UserCicrle from "../../assets/icons/UserCircle";
import "../../styles/SupportNavigation.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoMdArrowDropdown } from "react-icons/io";

const SupportNavigation = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#f4ff81",
      },
    },
  });
  return (
    <div className="support-navigation-bar">
      <div className="leftSideNavigationBar">
        <img
          className="image"
          alt="Image"
          src="https://c.animaapp.com/1RDRTvCv/img/image-87-1@2x.png"
        />
      </div>
      <div className="rightSideNavigationBar">
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" className="list-your-property-button">
            List your Property
            </Button>
          </Stack>
        </ThemeProvider>
        <UserCicrle className="user-cicrle" />
        <div className="div">Irene Joy Andales <IoMdArrowDropdown /></div>
      </div>
    </div>
  );
};
export default SupportNavigation;
