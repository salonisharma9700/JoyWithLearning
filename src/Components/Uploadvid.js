import React, { useState } from 'react';
import '../cssfiles/Footer.css';


const UploadVideoPage = () => {
  const [showNextContainer, setShowNextContainer] = useState(false);

  const handleNextClick = () => {
    setShowNextContainer(true);
  };

  const handleBackClick = () => {
    setShowNextContainer(false);
  };

  return (
    <div className="upload-page">
      {!showNextContainer ? (
        <div id="uploadContainer" className="container">
          <h1>Upload Video Page</h1>
          <p>Please upload a video of your child brushing his/her teeth.</p>
          <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="video" accept="video/*" required />
          </form>
          <button id="submitBtn" className="submit-button" onClick={handleNextClick}>
            Next
          </button>
        </div>
      ) : (
        <div id="nextContainer" className="container">
          <h1>Upload Video Page</h1>
          <p>Please upload a video of your child while playing with toys.</p>
          <form id="nextUploadForm" action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="video" accept="video/*" required />
          </form>
          <button id="nextBtn" className="next-button" onClick={handleBackClick}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadVideoPage;
