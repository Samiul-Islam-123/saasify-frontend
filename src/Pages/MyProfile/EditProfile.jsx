import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
  Card,
  Input,
  CardContent,
  TextField,
} from "@mui/material";
import "./MyProfile.css";
import Paper from "@mui/material/Paper";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Settings } from "@mui/icons-material";
import ImagePicker from "../../ImagePicker";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import apiURL from "../../ApiURL";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUsername] = useState(null);
  const [Description, setDescription] = useState(null);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdate = () => {
    if (selectedImage) {
      const token = Cookies.get("access_token");
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append("file", reader.result);

        // Add any additional form data here
        formData.append("token", token);
        formData.append("SellerName", userName);
        formData.append("SellerDescription", Description);

        //performing api call
        axios
          .post(`${apiURL}/app/seller/update-seller`, formData)
          .then((res) => {
            console.log(res);
          });
      };
    }
  };

  return (
    <>
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
        <div className="seller-name-container">
          <TextField
            id="outlined-basic"
            onChange={changeUsername}
            label="Seller Name"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="seller-description-container">
          <TextField
            id="outlined-basic"
            onChange={changeDescription}
            label="Seller Description"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <div style={{ marginTop: "40px" }}></div>
          <Button onClick={handleUpdate} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
