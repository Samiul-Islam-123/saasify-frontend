import React, { useEffect } from "react";
import {
  Avatar,
  Typography,
  Button,
  Divider,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";
import apiURL from "../../ApiURL";
import Cookies from "js-cookie";
import LinearProgress from '@mui/material/LinearProgress';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BuyerProfile = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyer, setBuyer] = useState(null)

  const navigate = useNavigate();
  const fetchProfile = async () => {
    setLoading(true)
    const token = await Cookies.get("access_token");
    const url = `${apiURL}/app/buyer/fetch-buyer/${token}`;
    const res = await axios.get(url);
    console.log(res.data);
    if (res.data.message == "OK") {
      setStatus(res.data.message)
      const Data = res.data.BuyerData;
      const updatedData = {
        BuyerName : Data.BuyerName,
        BuyerEmail : Data.BuyerEmail,
        BuyerProfilePicURL : Data.BuyerProfilePicURL
      }
      setBuyer(updatedData)
    } else {
      setStatus(res.data.message);
      
    }
    console.log(status);
    setLoading(false)
  };

  const createBuyerAccount = async()=>{
    setLoading(true)
    const token = await Cookies.get('access_token');
    const res = await axios.post(`${apiURL}/app/buyer/create-buyer`,{
      token : token
    })

    if(res.data.message == "OK")
    {//re-rendering this component
      alert('Buyer account created')
      var i=0;
      setTimeout(()=>{
        i+=1;
        if(i==3)
        {
          clearInterval()
        }
      },1000)
    }

    else{
      console.log(res.data.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
{
  loading ? (<LinearProgress />) :null
}
      {status!="OK" ? (
        <>
          <Typography
            style={{ textAlign: "center", marginTop: "20px" }}
            variant="h4"
          >
            {status}
          </Typography>
          <div
            style={{ display: "grid", placeItems: "center", marginTop: "10px" }}
          >
            <Button onClick={createBuyerAccount} variant="contained">Create Buyer Account</Button>
          </div>
        </>
      ) : buyer && (
        <>
          <div className="profile-container">
            <div className="icon-button-container">
              <IconButton
                color="inherit"
                className="settings-button"
                size="small"
                onClick={() => {
                  navigate("/buyer/edit-profile");
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="inherit"
                className="settings-button"
                size="small"
                onClick={() => {
                  alert("deleting in progress...");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
           
            <div className="seller-name-container">
              <Typography variant="h4">{buyer.BuyerName}</Typography>
            </div>
            <div className="seller-description-container">
            {buyer.BuyerEmail}
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default BuyerProfile;
