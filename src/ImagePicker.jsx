import React, { useState } from 'react';
import { IconButton, Input } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Input
        id="image-picker"
        type="file"
        inputProps={{ accept: 'image/*' }}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="image-picker">
        <IconButton component="span">
          <PhotoCameraIcon />
        </IconButton>
      </label>
      {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
      )}
    </div>
  );
};

export default ImagePicker;
