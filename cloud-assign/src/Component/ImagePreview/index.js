import React, { useState } from "react";

const ImagePreview = ({ file, className }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <div className={className}>
      <img src={preview} alt="preview" className="w-full h-full object-cover" />
    </div>
  );
};

export default ImagePreview;
