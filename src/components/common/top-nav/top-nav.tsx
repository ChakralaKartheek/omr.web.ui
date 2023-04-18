import { AccountCircle } from "@mui/icons-material";
import { AppBar, Button, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CommonConstants } from "../constants/common-constants";
import CookieHelper from "../services/cookieHelper";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { TokenUserHelper } from "../services/token-user-service";

const StyledLink = styled(Link)`
    text-decoration: none;
    color:#000;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color:#000;
    }
`;

export const TopNav: FunctionComponent = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const tokenUser = TokenUserHelper.Get();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
             <img
                         // src={}
              alt="OMR Scanner"
              style={{ paddingTop: 10, width: 142 }}
            /> 
            {/* <img*/}
            {/*  src={NaatLogo}*/}
            {/*  alt="NAAT Exam"*/}
            {/*  style={{ paddingTop: 10, width: 140 }}*/}
            {/*/> */}
          </Typography>
          <div>
            <Button
              size="large"
              onClick={handleMenu}
              color="inherit"
              sx={{ p: 0 }}
              startIcon={<AccountCircle />}
            >
              {tokenUser.UserName}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}><StyledLink href={CommonConstants.Routes.InstituteProfile}>Profile</StyledLink></MenuItem> */}
              <MenuItem onClick={handleClose}><StyledLink href={CommonConstants.Routes.Login}> Sign Out</StyledLink> </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>);
}