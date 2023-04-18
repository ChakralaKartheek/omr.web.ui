import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TocIcon from "@mui/icons-material/Toc";
import UploadIcon from "@mui/icons-material/Upload";
import { FunctionComponent } from "react";
import clsx from "clsx";

import EAbhyasLogo from "../../../images/eabhyas-logo.png";
import PoweredByLogo from "../../../images/powered-by-logo.jpg";

import { IconButton, ListItemButton, Menu, MenuItem } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import { TopNav } from "../../common/top-nav/top-nav";
const drawerWidth = 240;

export const InstitutionNavMenu: FunctionComponent = () => {
   /*const NaatLogo = require(`../../../../public/sat-logo.jpg`).default;*/

  return (
    <>
      <CssBaseline />
      <TopNav />
      <Drawer
        variant="permanent"
        sx={{
          background: "#535454",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar></Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button key={"home"}>
              <ListItemButton
                sx={{ p: 0 }}
                component="a"
                href="/#/institute/Home"
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem button key={"Institution BatchList"}>
              <ListItemButton
                sx={{ p: 0 }}
                component="a"
                href="/#/institute/BatchList"
              >
                <ListItemIcon>
                <TocIcon />
                </ListItemIcon>
                <ListItemText primary={"Batch List"} />
              </ListItemButton>
            </ListItem>
            <ListItem button key={"Institution OMRList"}>
              <ListItemButton
                sx={{ p: 0 }}
                component="a"
                href="/#/institute/OMRList"
              >
                <ListItemIcon>
                <TocIcon />
                </ListItemIcon>
                <ListItemText primary={"OMR List"} />
              </ListItemButton>
            </ListItem>
            <ListItem button key={"Upload OMR"}>
              <ListItemButton
                sx={{ p: 0 }}
                component="a"
                href="/#/institute/UploadOMR"
              >
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary={"Upload OMR"} />
              </ListItemButton>
            </ListItem>

            <ListItem button key={"ExamResults"}>
              <ListItemButton
                sx={{ p: 0 }}
                component="a"
                href="/#/institute/ExamResults"
              >
                <ListItemIcon>
                  <TocIcon />
                </ListItemIcon>
                <ListItemText primary={"OMR Results"} />
              </ListItemButton>
            </ListItem>
          </List>
          <br />
          <Divider />
          <br />
          <List
            style={{
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ListItem style={{ textAlign: "center" }}>
              <b>Need help ?</b>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>

                          <ListItemText primary={"+91 8143033430"} />
                      </ListItem>
                     
            {/*<ListItem>*/}
            {/*  <ListItemIcon>*/}
            {/*    <EmailIcon />*/}
            {/*  </ListItemIcon>*/}

            {/*              <ListItemText primary={"eabhyasacademy@gmail.com"} />*/}
            {/*</ListItem>*/}
          </List>
          <br />
          <Divider />
          <List
            style={{
              position: "absolute",
              bottom: 0,
              justifyContent: "center",
              width: "100%",
            }}
          >
            {/* <div style={{ textAlign: "center" }}>
              <b> Powered By</b>
            </div> */}
            <ListItem key={"eabhyaslogo"} style={{ justifyContent: "center" }}>
              <img
                src={PoweredByLogo}
                alt="E Abhyas"
                style={{ width: 230 }}
              ></img>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
