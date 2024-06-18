// import React, { useState } from 'react';
// import YouTube from 'react-youtube';
// import { useNavigate } from 'react-router-dom';
// import '../cssfiles/play.css';


// const videoUrls = [
    
//     'ciyvRFyt4as',
//     'pu_jOLuinNs',
//     'FgJr_L9ALm4',
// ];

// const Ytvid = () => {
//     const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//     const [isCheckedYes, setIsCheckedYes] = useState(false);
//     const [isCheckedNo, setIsCheckedNo] = useState(false);
//     const navigate = useNavigate();

//     const onVideoEnd = () => {
//         console.log('Video ended');
//     };

//     const handleCheckYes = () => {
//         setIsCheckedYes(!isCheckedYes);
//         if (isCheckedNo) setIsCheckedNo(false); 
//     };

//     const handleCheckNo = () => {
//         setIsCheckedNo(!isCheckedNo);
//         if (isCheckedYes) setIsCheckedYes(false); 
//     };

//     const handleNextVideo = () => {
//         if (currentVideoIndex < videoUrls.length - 1) {
//             setCurrentVideoIndex(currentVideoIndex + 1);
//             setIsCheckedYes(false);
//             setIsCheckedNo(false);
//         } else {
//             navigate('/thankyou'); 
//         }
//     };

//     return (
//         <div className='video1'>
//             <YouTube
//                 videoId={videoUrls[currentVideoIndex]}
//                 opts={{
//                     width: '900',
//                     height: '450',
//                     playerVars: {
//                         autoplay: 1,
//                     },
//                 }}
//                 onEnd={onVideoEnd}
//             />

//             <div className='checkbox'>
//                 <h1>My child is exhibiting behaviour as shown in the video</h1>
//                 <div>
//                     <input
//                         type="checkbox"
//                         id="yes"
//                         checked={isCheckedYes}
//                         onChange={handleCheckYes}
//                     />
//                     <label htmlFor="yes">Yes</label>
//                 </div>
//                 <div>
//                     <input
//                         type="checkbox"
//                         id="no"
//                         checked={isCheckedNo}
//                         onChange={handleCheckNo}
//                     />
//                     <label htmlFor="no">No</label>
//                 </div>
//             </div>

//             {(isCheckedYes || isCheckedNo) && (
//                 <button onClick={handleNextVideo} className='next-button'>
//                     {currentVideoIndex < videoUrls.length - 1 ? 'Next Video' : 'Finish'}
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Ytvid;




import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';
import '../cssfiles/play.css'; 

const videoUrls = [
    'ciyvRFyt4as',
    'pu_jOLuinNs',
    'FgJr_L9ALm4',
];

const Ytvid = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isCheckedYes, setIsCheckedYes] = useState(false);
    const [isCheckedNo, setIsCheckedNo] = useState(false);
    const [videoResponses, setVideoResponses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const onVideoEnd = () => {
        const response = isCheckedYes ? 'Yes' : 'No';
        saveResponseToBackend(videoUrls[currentVideoIndex], response);
    };

    const handleCheckYes = () => {
        setIsCheckedYes(!isCheckedYes);
        if (isCheckedNo) setIsCheckedNo(false);
    };

    const handleCheckNo = () => {
        setIsCheckedNo(!isCheckedNo);
        if (isCheckedYes) setIsCheckedYes(false);
    };

    const handleNextVideo = () => {
        const response = { videoId: videoUrls[currentVideoIndex], response: isCheckedYes ? 'Yes' : 'No' };
        const updatedResponses = [...videoResponses, response];
        setVideoResponses(updatedResponses);
        console.log("Video Responses so far: ", updatedResponses);

        if (currentVideoIndex < videoUrls.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
            setIsCheckedYes(false);
            setIsCheckedNo(false);
        } else {
            setShowForm(true);
        }
    };

    const handleSubmit = async (formData) => {
        const combinedData = { ...formData, videoResponses };
        console.log("Submitting combined data: ", combinedData);

        try {
            const response = await axios.post('http://localhost:5000/api/submitFormData', combinedData);
            console.log('Form data submitted successfully:', response.data);
            
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const saveResponseToBackend = (videoId, response) => {
        const data = { videoId, response };
        console.log("Saving response to backend:", data);

        axios.post('http://localhost:5000/api/saveVideoResponse', data)
            .then(response => {
                console.log('Video response saved:', response.data);
            })
            .catch(error => {
                console.error('Error saving video response:', error);
            });
    };

    return (
        <div className='video1'>
            {!showForm ? (
                <>
                    <YouTube
                        videoId={videoUrls[currentVideoIndex]}
                        opts={{ width: '900', height: '450', playerVars: { autoplay: 1 } }}
                        onEnd={onVideoEnd}
                    />
                    <div className='checkbox'>
                        <h1>My child is exhibiting behaviour as shown in the video</h1>
                        <div>
                            <input
                                type="checkbox"
                                id="yes"
                                checked={isCheckedYes}
                                onChange={handleCheckYes}
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="no"
                                checked={isCheckedNo}
                                onChange={handleCheckNo}
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                    {(isCheckedYes || isCheckedNo) && (
                        <button onClick={handleNextVideo} className='next-button'>
                            {currentVideoIndex < videoUrls.length - 1 ? 'Next Video' : 'Submit'}
                        </button>
                    )}
                </>
            ) : (
                <Form onSubmit={handleSubmit} videoResponses={videoResponses} />
            )}
        </div>
    );
};

export default Ytvid;


