import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageUploaderModal = ({ recipeId, onClose }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Handler for file input change
    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    // Fetch the token from local storage
    const token = localStorage.getItem('token');

    // Handler for uploading the image
    const handleUpload = async () => {
        try {
            // Ensure an image is selected
            if (!image) {
                console.error('No image selected.');
                return;
            }

            // Create a FormData object to send the image
            const formData = new FormData();
            formData.append('image', image);

            // Send a POST request to the server to upload the image
            const response = await axios.post(`http://localhost:8000/api/uploadimage/${recipeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Log the server response
            console.log('Server Response:', response.data);

            // Extract the image data from the server response
            const imageData = response.data;

            // Log the image_path
            console.log('Upload successful. Image Path:', imageData.image_path);

            // Handle any additional logic you need after a successful image upload

            // Close the modal or navigate away
            onClose();
            navigate(`/`);
        } catch (error) {
            // Log and handle errors
            console.error('Error uploading image:', error.message);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-2xl font-bold mb-4">Upload Image for Recipe ID: {recipeId}</h2>
                        <input type="file" onChange={handleFileChange} className="mb-4" />
                        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploaderModal;
