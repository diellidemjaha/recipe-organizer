// ImageUploadContext.js
import { createContext, useContext, useState } from 'react';


const ImageUploadContext = createContext();

export const ImageUploadProvider = ({ children }) => {
  const [imagePath, setImagePath] = useState(null);

  return (
    <ImageUploadContext.Provider value={{ imagePath, setImagePath }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUploadContext = () => {
  return useContext(ImageUploadContext);
};