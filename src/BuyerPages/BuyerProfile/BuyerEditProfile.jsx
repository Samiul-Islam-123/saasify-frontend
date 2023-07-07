import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
  Card,
  CardContent,
  Input,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Settings } from "@mui/icons-material";
import ImagePicker from "../../ImagePicker";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiURL from "../../ApiURL";
import { useEffect } from "react";
import Cookies from "js-cookie";
import LinearProgress from '@mui/material/LinearProgress';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BuyerEditProfile = () => {


  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyer, setBuyer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [FormData, setFormData] = useState(null)
  const [BuyerName, setBuyerName] = useState(null);
  const [BuyerEmail, setBuyerEmail] = useState(null)

  

  

  const navigate = useNavigate();
  const fetchProfile = async () => {
    setLoading(true);
    const token = await Cookies.get("access_token");
    const url = `${apiURL}/app/buyer/fetch-buyer/${token}`;
    const res = await axios.get(url);
    if (res.data.message == "OK") {
      setStatus(res.data.message);
      const Data = res.data.BuyerData;
      const updatedData = {
        BuyerName: Data.BuyerName,
        BuyerEmail: Data.BuyerEmail,
        BuyerProfilePicURL: Data.BuyerProfilePicURL,
      };
      setBuyer(updatedData);
    } else {
      setStatus(res.data.message);
    }
    setLoading(false);
  };

  const updateBuyerAccount = async () => {
    setLoading(true);
    const token = await Cookies.get("access_token");
    const res = await axios.post(`${apiURL}/app/buyer/create-buyer`, {
      token: token,
    });

    if (res.data.message == "OK") {
      //re-rendering this component
      alert("Buyer account updated");
      var i = 0;
      setTimeout(() => {
        i += 1;
        if (i == 3) {
          clearInterval();
        }
      }, 1000);
    } else {
      console.log(res.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
    {
      loading ? (<LinearProgress />) : null
    }
      {
        buyer && (<div className="profile-container">
        <div className="pic-container">
        <div>
      
      
      
      
    </div>
        </div>
        <div className="seller-name-container">
        <TextField
        onChange={(e)=>{
          setBuyer({
            BuyerName : e.target.value
          })
        }}
            id="outlined-basic"
            label="Buyer Name"
            value={buyer.BuyerName}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div className="seller-description-container">
          <TextField
          onChange={(e)=>{
            setBuyer({
              BuyerEmail : e.target.value
            })
          }}
            id="outlined-basic"
            label="Buyer Email"
            value={buyer.BuyerEmail}
            variant="outlined"
            fullWidth
            style={{ width: "100%" }}
          />
          <div style={{ marginTop: "40px" }}></div>
          <Button variant="contained" onClick={updateBuyerAccount}>Save</Button>
        </div>
      </div>)
      }
    </>
  );
};

export default BuyerEditProfile;
