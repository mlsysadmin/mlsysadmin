import React from "react";
import { NavLink } from "react-router-dom";
import UserCircle from "../../assets/icons/UserCircle";
import "../../styles/SupportNavigation.css";
import "../../styles/navlinkCustom.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoMdArrowDropdown } from "react-icons/io";

const SupportNavigation = ({ navLinkProps, activeTab }) => {
  const defaultNavLinkProps = [{ text: "", to: "" }];
  const linksToRender = navLinkProps || defaultNavLinkProps;

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
            <Button
              variant="contained"
              color="primary"
              className="list-your-property-button"
            >
              List your Property
            </Button>
          </Stack>
        </ThemeProvider>
        <UserCircle className="user-circle" />
        <div className="div">
          Irene Joy Andales <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default SupportNavigation;
