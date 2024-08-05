import React, { useEffect } from "react";
const Message = ({ message, setMessage, className }) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  });

  return message ? (
    <div className={className}>
      <div className="flex gap-4 items-center">
        <h1>{message}</h1>
      </div>
      <h1
        className="cursor-pointer text-lg hover:bg-red-300 rounded-full px-2"
        onClick={() => setMessage(false)}
      >
        X
      </h1>
    </div>
  ) : null;
};

export default Message;
