import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ setImagePath, recipeId }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post(
        `http://localhost:8000/api/uploadimage/${recipeId}`, // Include recipeId in the URL
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Server Response:', response.data);

      // Assuming the image_path is directly under data
      const imageData = response.data;

      console.log('Upload successful:', imageData.image_path);

      setImagePath(imageData.image_path);
      // Add any additional logic you need after a successful upload
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!image}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
