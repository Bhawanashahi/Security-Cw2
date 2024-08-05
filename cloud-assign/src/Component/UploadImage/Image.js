import React from "react";
import { BsCamera } from "react-icons/bs";
import ImagePreview from "../ImagePreview";

const Image = ({ onChange, file }) => {
  return (
    <label className="cursor-pointer">
      <div className="border h-60 w-full p-0.5 border-gray-300 rounded-sm">
        <div className="border w-full h-full flex justify-center items-center border-gray-300 rounded-sm ">
          {!file && (
            <div className="rounded-full border h-32 w-32 flex justify-between items-center p-0.5 ">
              <div className="rounded-full border flex flex-col justify-center items-center h-full w-full">
                <BsCamera className="text-4xl text-gray-400 " />

                <h1 className="text-xs text-gray-400">Upload</h1>
              </div>
            </div>
          )}
          <input type="file" className="hidden h-60" onChange={onChange} />
          {file && <ImagePreview file={file} className="w-full h-full" />}
        </div>
      </div>
    </label>
  );
};

export default Image;
