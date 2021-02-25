import React from 'react';

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="flex justify-center">
      <img alt="" src={imageURL} />
    </div>
  );
};

export default FaceRecognition;
