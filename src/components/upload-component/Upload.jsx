// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import Webcam from 'react-webcam';
// import './upload.css';

// function Upload() {
//   const [billFile, setBillFile] = useState(null);
//   const [billName, setBillName] = useState('');
//   const [billCategory, setBillCategory] = useState('');
//   const [billAmount, setBillAmount] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [uploadMode, setUploadMode] = useState('file'); 
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);


  
//   const billCategories = ['hospitality', 'infra', 'food'];

//   const handleFileChange = (e) => {
//     setUploadMode('file');
//     setCapturedImage(null);
//     // Get the selected file from the input element
//     const file = e.target.files[0];
//     setBillFile(file); // Store the selected file in state
//   };
  

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     if (!billName || !billCategory || !billAmount) {
//       setErrorMessage('All fields are required');
//       return;
//     }

//     if (!billCategories.includes(billCategory)) {
//       setErrorMessage('Invalid bill category');
//       return;
//     }
    
//     if (uploadMode === 'webcam' && !capturedImage) {
//       setErrorMessage('Please capture an image');
//       return;
//     }

    
//     if (uploadMode === 'file') {
      
//       const formData = new FormData();
//       formData.append('name', billName.trim());
//       formData.append('category', billCategory);
//       formData.append('amount', parseFloat(billAmount));
//       formData.append('file', billFile);
//       formData.append('username', localStorage.getItem('username'));

      
//       await uploadFormData(formData);
//     } else if (uploadMode === 'webcam') {
      
//       const blob = await fetch(capturedImage).then((res) => res.blob());
      
//       const file = new File([blob], 'webcam_image.jpg', { type: 'image/jpeg' });

      
//       const formData = new FormData();
//       formData.append('name', billName.trim());
//       formData.append('category', billCategory);
//       formData.append('amount', parseFloat(billAmount));
//       formData.append('file', file);
//       formData.append('username', localStorage.getItem('username'));

//       await uploadFormData(formData);
//     }
//   };

//   const uploadFormData = async (formData) => {
//     try {
//       console.log(formData);
//       const token = localStorage.getItem('jwtToken'); 
//       const response = await axios.post('https://bill-server-hiq9.onrender.com/user/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log(response.data);
      
//       setBillName('');
//       setBillCategory('');
//       setBillAmount('');
//       setCapturedImage(null);
//       setErrorMessage('');
//       window.location.reload();
//     } catch (error) {
//       console.error('Error uploading file:', error.response ? error.response.data.error : error.message);
//       setErrorMessage('Failed to upload file. Please try again later.');
//     }
//   };

//   const switchMode = () => {
//     if (uploadMode === 'file') {
      
//       setCapturedImage(null);
//     }
//     setUploadMode(uploadMode === 'file' ? 'webcam' : 'file');
//   };

//   return (
//     <div className='container'>
//       <div className='upload-outer-div container-sm accordion w-auto'>
//         <h1 id='upload-heading' className='mt-2 mb-5 fw-bold'>Upload Bill</h1>
//         {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//         <form className='fs-4' onSubmit={handleSubmit}>
//           <div className='row mb-4 fs-4'>
//             <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Name:</label>
//             <input className='ms-3 d-inline col-11 col-sm-6 col-md-6' type="text" value={billName} onChange={(e) => setBillName(e.target.value)} />
//           </div>
//           <div className='row mb-4 fs-4'>
//             <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Category:</label>
//             <select className='ms-3 col-11 col-sm-6 col-md-6' value={billCategory} onChange={(e) => setBillCategory(e.target.value)}>
//               <option value="">Select Bill Category</option>
//               {billCategories.map((category) => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div className='row mb-4 fs-4'>
//             <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Amount:</label>
//             <input className='ms-3 col-11 col-sm-6 col-md-6' type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
//           </div>
//           <div className=''>
//             <label className='m-2'>Upload Bill:</label>
//             {uploadMode === 'file' && (
//               <input className='m-4 me-0 w-75' type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
//             )}
//             {uploadMode === 'webcam' && (
//               <div className="webcam-container">
//                 <Webcam
//                   audio={false}
//                   ref={webcamRef}
//                   screenshotFormat="image/jpeg"
//                   className='webcam'
//                 />
//                 <button className='buttn capture-button' type="button" onClick={capture}>Capture</button>
//               </div>
//             )}
//             <button className='buttn' type="button" onClick={switchMode}>Switch to {uploadMode === 'file' ? 'Webcam' : 'File'}</button>
//           </div>
//           {capturedImage && <img src={capturedImage} alt="Captured" />}
//           <button className='buttn' type="submit">Submit</button>
//         </form>
//       </div>
//     </div>

//   );
// }

// export default Upload;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import './upload.css';

function Upload() {
  const [billFile, setBillFile] = useState(null);
  const [billName, setBillName] = useState('');
  const [billCategory, setBillCategory] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); 
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [rearCameraAvailable, setRearCameraAvailable] = useState(true);

  const billCategories = ['hospitality', 'infra', 'food'];

  useEffect(() => {
    async function checkCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
        if (!rearCamera) {
          setRearCameraAvailable(false);
        }
      } catch (error) {
        console.error('Error checking camera:', error);
        setRearCameraAvailable(false);
      }
    }

    checkCamera();
  }, []);

  const handleFileChange = (e) => {
    setUploadMode('file');
    setCapturedImage(null);
    const file = e.target.files[0];
    setBillFile(file);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!billName || !billCategory || !billAmount) {
      setErrorMessage('All fields are required');
      return;
    }

    if (!billCategories.includes(billCategory)) {
      setErrorMessage('Invalid bill category');
      return;
    }

    if (uploadMode === 'webcam' && !capturedImage) {
      setErrorMessage('Please capture an image');
      return;
    }

    if (uploadMode === 'file') {
      const formData = new FormData();
      formData.append('name', billName.trim());
      formData.append('category', billCategory);
      formData.append('amount', parseFloat(billAmount));
      formData.append('file', billFile);
      formData.append('username', localStorage.getItem('username'));
      await uploadFormData(formData);
    } else if (uploadMode === 'webcam') {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const file = new File([blob], 'webcam_image.jpg', { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('name', billName.trim());
      formData.append('category', billCategory);
      formData.append('amount', parseFloat(billAmount));
      formData.append('file', file);
      formData.append('username', localStorage.getItem('username'));
      await uploadFormData(formData);
    }
  };

  const uploadFormData = async (formData) => {
    try {
      console.log(formData);
      const token = localStorage.getItem('jwtToken'); 
      const response = await axios.post('https://bill-server-hiq9.onrender.com/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      
      setBillName('');
      setBillCategory('');
      setBillAmount('');
      setCapturedImage(null);
      setErrorMessage('');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data.error : error.message);
      setErrorMessage('Failed to upload file. Please try again later.');
    }
  };

  const switchMode = () => {
    if (uploadMode === 'file') {
      setCapturedImage(null);
    }
    setUploadMode(uploadMode === 'file' ? 'webcam' : 'file');
  };

  return (
    <div className='container'>
      <div className='upload-outer-div container-sm accordion w-auto'>
        <h1 id='upload-heading' className='mt-2 mb-5 fw-bold'>Upload Bill</h1>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form className='fs-4' onSubmit={handleSubmit}>
          <div className='row mb-4 fs-4'>
            <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Name:</label>
            <input className='ms-3 d-inline col-11 col-sm-6 col-md-6' type="text" value={billName} onChange={(e) => setBillName(e.target.value)} />
          </div>
          <div className='row mb-4 fs-4'>
            <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Category:</label>
            <select className='ms-3 col-11 col-sm-6 col-md-6' value={billCategory} onChange={(e) => setBillCategory(e.target.value)}>
              <option value="">Select Bill Category</option>
              {billCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='row mb-4 fs-4'>
            <label className='m-2 col-11 col-sm-6 col-md-6'>Bill Amount:</label>
            <input className='ms-3 col-11 col-sm-6 col-md-6' type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
          </div>
          <div className=''>
            <label className='m-2'>Upload Bill:</label>
            {uploadMode === 'file' && (
              <input className='m-4 me-0 w-75' type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
            )}
            {uploadMode === 'webcam' && (
              <div className="webcam-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className='webcam'
                />
                <button className='buttn capture-button' type="button" onClick={capture}>Capture</button>
                {!rearCameraAvailable && <p>Rear camera not available. Switch to front camera or upload a file.</p>}
              </div>
            )}
            <button className='buttn' type="button" onClick={switchMode}>Switch to {uploadMode === 'file' ? 'Webcam' : 'File'}</button>
          </div>
          {capturedImage && <img src={capturedImage} alt="Captured" />}
          <button className='buttn' type="submit">Submit</button>
        </form>
      </div>
    </div>

  );
}

export default Upload;
