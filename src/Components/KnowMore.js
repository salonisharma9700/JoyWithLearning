import React, { useState } from 'react';
import '../cssfiles/KnowMore.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const KnowMore = () => {
  const videoUrls = [
    'https://www.youtube.com/embed/ciyvRFyt4as',
    'https://www.youtube.com/embed/pu_jOLuinNs',
    'https://www.youtube.com/embed/FgJr_L9ALm4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextVideo = () => {
    if (currentIndex < videoUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
     
      <div className="container py-3">
        <div className="nav-arrows">
          <div className="arrow arrow-left" onClick={prevVideo}>&larr;</div>
          <div className="arrow arrow-right" onClick={nextVideo}>&rarr;</div>
        </div>
        <div className="video-container">
          <iframe src={videoUrls[currentIndex]} frameborder="0" allowfullscreen></iframe>
        </div>
        
        <p>My child exhibits the symptom shown in the video </p><br/>
        <div className="Checkbox">
          <label><input type="checkbox" name="systomStatus" value="exhibitsSymptom" />Yes</label>
          <label><input type="checkbox" name="systomStatus" value="exhibitsSymptom" />No</label>
        </div>
      </div>

      <div className="note">
        Note: Kindly ensure that all videos are viewed until completion. Thank you for your attention to detail.
      </div>
    </div>
  );
};

export default KnowMore;
