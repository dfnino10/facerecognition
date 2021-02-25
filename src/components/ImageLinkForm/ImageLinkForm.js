import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className="flex justify-center -ns">
        <div className="form shadow-5 pa4 br3 w-60-ns w-50-l">
          <input
            className="f4 pa2 w-70-ns w-60-m center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30-ns w-40-m grow f4 link ph3 pv2 dib white bg-light-purple pointer"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;
