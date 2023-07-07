import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SellerDrawer from "./SellerDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import LinearProgress from '@mui/material/LinearProgress';
import BuyerDrawer from "./BuyerDrawer";



export default function NavBar() {
  const navigate = useNavigate();
  const [Seller, setSeller] = useState(false);
  const [processing, setProcessing] = useState(false)

  return (
    
    <Box sx={{ flexGrow: 1 }}>
            {
              processing ? (<LinearProgress />) : null
            }

      <AppBar position="static">
        <Toolbar>
          {
            !Seller ? (<><SellerDrawer>
              <IconButton
                size="large"
                edge="start"
                color="white"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </SellerDrawer></>) : (<>
            
              <BuyerDrawer>
            <IconButton
              size="large"
              edge="start"
              color="white"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </BuyerDrawer></>)
          }
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SaaSify
          </Typography>
          <Button
            color="inherit"
            onClick={async() => {
              if (Seller) {
                setProcessing(true)
                setSeller(false);
                await Cookies.set('Seller', Seller)
                setProcessing(false)
                navigate("/my-profile");
              } else {
                setProcessing(true)
                setSeller(true);
                await Cookies.set('Seller', Seller)
                setProcessing(false)
                navigate("/buyer/feed");
              }
            }}
          >
            {Seller ? "Seller" : "Buyer"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
