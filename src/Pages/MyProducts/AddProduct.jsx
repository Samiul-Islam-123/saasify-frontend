import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {  Input } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Settings } from "@mui/icons-material";
import ImagePicker from "../../ImagePicker";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import apiURL from "../../ApiURL";
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddProduct = () => {
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [ProductDescription, setProductDescription] = useState(null);
  const [ProductPrice, setProductPrice] = useState(null);
  const [ProductQty, setProductQty] = useState(null);
  const [File, setFile] = useState(null)
  const [blob, setBlob] = useState(null)

  const handleImageChange = (e) => {
    setLoading(true)
    setFile(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
    setLoading(false)
  };

  const changeProductDescription = (e) =>{
    setProductDescription(e.target.value)
  }

  const changeProductName = (e) =>{
    setProductName(e.target.value)
  }

  const changeProductPrice = (e) =>{
    setProductPrice(e.target.value)
  }

  const changeProductQty = (e) =>{
    setProductQty(e.target.value)
  }

  const addProduct = async()=>{
    setLoading(true)
   
        const payload = File;
        const res = await axios.post(`${apiURL}/app/seller/add-product`,{
         token : Cookies.get('access_token'),
          ProductName : ProductName,
          ProductDescription :  ProductDescription,
          Price : ProductPrice,
          ProductQty : ProductQty
        })
        if(res.data.message == "OK")
        {
          navigate('/my-products')
        }

        else{
          alert('error occured please check the console');
          console.log(res)
        }
      
    setLoading(false)
    
  }



  return (
    <>{
      loading ? <LinearProgress />  : null
    }
      <div className="profile-container">
        <div className="pic-container">
          <div>
            <Input
              id="image-picker"
              type="file"
              inputProps={{ accept: "image/*" }}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-picker">
              <IconButton component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
        <TextField
        onChange={changeProductName}
          id="outlined-basic"
          label="Product Name"
          variant="outlined"
          fullWidth
        />
        <div style={{ marginTop: "20px" }}></div>

        <TextField
        onChange={changeProductDescription}
          id="outlined-basic"
          label="Product Description"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <div style={{ marginTop: "20px" }}></div>
        <TextField
        onChange={changeProductPrice}
          type="tel"
          id="outlined-basic"
          label="Product Price"
          variant="outlined"
          fullWidth
        />
        <div style={{ marginTop: "20px" }}></div>

        <TextField
        onChange={changeProductQty}
          type="tel"
          id="outlined-basic"
          label="Product Qty"
          variant="outlined"
          fullWidth
        />
        <div style={{ marginTop: "20px" }}></div>

        <Button variant="contained" onClick={addProduct}>Add Product</Button>
      </div>
    </>
  );
};

export default AddProduct;
