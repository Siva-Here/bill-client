import React, { useState, useEffect, useRef, DragEvent } from "react";
import { HelpCircle } from 'lucide-react'
import { AiOutlineUpload } from 'react-icons/ai';
import axios from "axios";
// import "./upload.css";
import styles from './Uploaded.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from "./UploadImage";
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { IoMdCloudUpload } from "react-icons/io";
import styles1 from '../table/UserTable.module.css'
import PreviewImage from "../PreviewImage";

function Upload() {
  const [billFile, setBillFile] = useState(null);
  const [name, setName] = useState("");
  const [billCategory, setBillCategory] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [GstNumber,setGstNumber] = useState("");
  const [firmName, setFirmName] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [imgLink, setImgLink] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [billType, setBillType] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New state to track upload status
  const [errors, setErrors] = useState({});

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const dateToday = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [openPreview, setOpenPreview] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const inputRefs = {
    name: useRef(null),
    billType: useRef(null),
    GstNumber: useRef(null),
    billNumber: useRef(null),
    billCategory: useRef(null),
    firmName: useRef(null),
    date: useRef(null),
    billAmount: useRef(null),
  };

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 576);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setOpenPreview(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setOpenPreview(false);
  };

  const handlePreview = (image) => {
    setSelectedImage(image)
    setOpenPreview((prev) => !prev)
  }


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  console.log("bill file is:",billFile)


  const uploadFile = async (file) => {
    setIsUploading(true); // Set uploading status to true
    const fileName = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
    const data = await UploadImage(file, fileName);
    console.log("data is:", data);
    setImgLink(data.url);
    setIsUploading(false); // Set uploading status to false after upload
  };

  useEffect(() => {
    billFile && uploadFile(billFile);
  }, [billFile]);

  const billTypes = ["GST", "Non GST"];
  const category = ["printing", "marketing", "travelling", "outside promotions", "stage photography","InfraStructure"];

  const handleFileChange = (e) => {
    // const file1 = e.target.files[0];
    setBillFile(file);
    setErrors((prevErrors) => ({ ...prevErrors, imgLink: "" }));
  };

  const handleFileCancel = (e) => {
    // const file1 = e.target.files[0];
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!name) newErrors.name = "Please enter Name";
    if (!billType) newErrors.billType = "Please select Bill Type";
    if (billType === "GST" && !GstNumber) newErrors.GstNumber = "Please enter GST Number";
    if (!billNumber) newErrors.billNumber = "Please enter Bill Number";
    if (!billCategory) newErrors.billCategory = "Please select Bill Category";
    if (!firmName) newErrors.firmName = "Please enter Firm Name";
    if (!date) newErrors.date = "Please enter Date of Purchase";
    if (!billAmount) newErrors.billAmount = "Please enter Bill Amount";
    if (!billFile) newErrors.imgLink = "Please upload a bill image";
  


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
  
      // Focus the first input field with an error
      const firstErrorKey = Object.keys(newErrors)[0];
      if (inputRefs[firstErrorKey] && inputRefs[firstErrorKey].current) {
        inputRefs[firstErrorKey].current.focus();
      }
      return;
    }

    const amountRegex = /^\d+(\.\d{1,2})?$/;
    if (!amountRegex.test(billAmount)) {
      setErrorMessage("Please enter a valid amount (numbers only)");
      return;
    }

    try {
      setShowSpinner(true);
      setIsSubmitting(true);
      let formData = new FormData();

      formData.append("file", billFile);
      formData.append("name", name);
      formData.append("GstNumber",GstNumber);
      formData.append("category", billCategory);
      formData.append("amount", parseFloat(billAmount));
      formData.append("billType", billType);
      formData.append("billNumber", billNumber);
      formData.append("firmName", firmName);
      formData.append("date", date);
      formData.append("username", localStorage.getItem("username"));
      formData.append("imgLink", imgLink);

      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://bill-server-hiq9.onrender.com/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setBillCategory("");
      setBillAmount("");
      setBillType("");
      setGstNumber("")
      setBillNumber("");
      setFirmName("");
      setDate("");
      setErrorMessage("");
      toast.success("Bill submitted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data.error : error.message
      );
      setErrorMessage("Failed to upload file. Please try again later.");
    } finally {
      setShowSpinner(false);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    
    switch (field) {
      case "name":
        setName(value);
        break;
      case "billType":
        setBillType(value);
        break;
      case "GstNumber":
        setGstNumber(value);
        break;
      case "billNumber":
        setBillNumber(value);
        break;
      case "billCategory":
        setBillCategory(value);
        break;
      case "firmName":
        setFirmName(value);
        break;
      case "date":
        setDate(value);
        break;
      case "billAmount":
        setBillAmount(value);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="container px-md-5">


<div className="row d-flex justify-content-center align-items-center" style={{ marginBottom:'40px'}}>
  <div className="col-6  col-lg-3 d-flex flex-column justify-content-center align-items-center" style={{position:'relative'}}>
  <h4 className="text-nowrap" style={{color:'white'}}>With Gst</h4>
    <img src="GSTImagedup.jpg" className={`img-fluid ${styles.imgCustom}`} alt="charan" onClick={() => handlePreview('GSTImagedup4.jpg')}/>
    <button className={`${styles1.buttonOverlay} text-nowrap`} style={{width:'auto'}} onClick={() => handlePreview('GSTImagedup4.jpg')}>Click For Preview</button>
  </div>

  {/* onClick={() => handlePreview(data1.image)} */}

  <div className="col-6 col-lg-3 d-flex flex-column justify-content-center align-items-center" style={{position:'relative'}}>
  <h4 className="text-nowrap" style={{color:'white'}}>Without Gst</h4>
    <img src="Notgst.jpg" className={`img-fluid ${styles.imgCustom}`} alt="siva" onClick={() => handlePreview('Notgst1.jpg')} />
     <button className={`${styles1.buttonOverlay} text-nowrap`} style={{width:'auto'}} onClick={() => handlePreview('Notgst1.jpg')}>Click For Preview</button>
  </div>
</div>

{openPreview && <PreviewImage image={selectedImage} onClose={closeModal} />}


        <div className={`conta ${styles.uploadOuterDiv}  ${isMobile ? "container-sm" : ""} accordion ms-auto me-auto`}>
          <h1 id="upload-heading" className="mt-2 mb-4 fw-bold">
            Upload Bill
          </h1>
          {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}

          

          <form className="fs-4" onSubmit={handleSubmit}>
            <div className="FormComp">
              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Name:</label>
                <input
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.name}
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  
                />
                 {errors.name && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.name}</p>}
              </div>

              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Bill Type:</label>
                <select
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.billType}
                  value={billType}
                  onChange={(e) => handleInputChange("billType", e.target.value)}
                >
                  <option value="" className="fs-6">Select Bill Type</option>
                  {billTypes.map((type) => (
                    <option key={type} value={type} className="fs-6">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.billType && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.billType}</p>}
              </div>

              {billType === "GST" && (
                <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                  <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Gst No:</label>
                  <input
                    className="ms-2 col-11 col-sm-6 col-md-7"
                    ref={inputRefs.GstNumber}
                    type="text"
                    value={GstNumber}
                    onChange={(e) => handleInputChange("GstNumber", e.target.value)}
                  />
                  {errors.GstNumber && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.GstNumber}</p>}
                </div>
              )
              }

                <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                  <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Bill Number:</label>
                  <input
                    className="ms-2 col-11 col-sm-6 col-md-7"
                    ref={inputRefs.billNumber}
                    type="text"
                    value={billNumber}
                    onChange={(e) => handleInputChange("billNumber", e.target.value)}
                  />
                  {errors.billNumber && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.billNumber}</p>}
                </div>


              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Bill Category:</label>
                <select
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.billCategory}
                  value={billCategory}
                  onChange={(e) => handleInputChange("billCategory", e.target.value)}
                >
                  <option value="" className="fs-5">Select Bill Category</option>
                  {category.map((category) => (
                    <option key={category} value={category} className="fs-5">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.billCategory && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.billCategory}</p>}
              </div>

              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Firm Name:</label>
                <input
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.firmName}
                  type="text"
                  value={firmName}
                  onChange={(e) => handleInputChange("firmName", e.target.value)}
                />
                 {errors.firmName && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.firmName}</p>}
              </div>

              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Date of purchase:</label>
                <input
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.date}
                  type="date"
                  value={date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
                {errors.date && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.date}</p>}
              </div>

              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">
                <label className="m-2 me-4  col-11 col-sm-6 col-md-7">Bill Amount:</label>
                <input
                  className="ms-2 col-11 col-sm-6 col-md-7"
                  ref={inputRefs.billAmount}
                  type="number"
                  value={billAmount}
                  onChange={(e) => handleInputChange("billAmount", e.target.value)}
                />
                {errors.billAmount && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.billAmount}</p>}
              </div>

             


              <div className="row mb-2 fs-4 d-flex justify-content-center align-items-center">

                <label className="m-2 me-4 col-11 col-sm-6 col-md-7">Upload Bill:</label>
                <p className="text-secondary ms-2 mb-3 me-4 col-11 col-sm-6 col-md-7 custom-small custom-md-medium custom-lg-large">Click to upload or drag and drop</p>
                <div
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`upload-area ${isDragging ? 'dragging' : ''} ms-2 col-11 col-sm-6 col-md-7`}
                >
                  <input
                    type="file"
                    
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    capture="environment"
                    className="d-none ms-2 col-11 col-sm-6 col-md-7 "
                    accept="image/*"
                  />
                  

                  <div className="upload-icon mb-3">
                    <IoMdCloudUpload />
                  </div>

                  <p className="text-white fs-5 mb-2">
                    {file ? file.name : 'No Files Selected'}
                  </p>


                </div>

                <div className="mt-3 d-flex justify-content-between align-items-center  col-11 col-sm-6 col-md-7">
                  <div className="d-flex gap-4">
                    <p className="text-secondary custom-small custom-md-medium custom-lg-large">
                      Supported formats: JPEG, JPG, PNG, ...
                    </p>
                    <p className="text-secondary custom-small custom-md-medium custom-lg-large">
                      Max file size: 25MB
                    </p>
                  </div>
                </div>

      {errors.imgLink && <p className="smallfont text-danger fs-md-4 col-md-7 col-11 mt-1">{errors.imgLink}</p>}

                <div className="mt-1 d-flex justify-content-between align-items-center col-11 col-sm-6 col-md-7">
                 

                  
                    <button type="button" className="btn btn-secondary" onClick={handleFileCancel}>
                      Reset image
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleFileChange}
                    >
                      {isUploading ? 'Saving...' : 'Save image'}
                    </button>
                  
                </div>
              </div>



              <button
                className={`${styles.buttn} px-3`}
                type="submit"
                disabled={isUploading || isSubmitting} // Disable button during upload
                style={{ opacity: isUploading || isSubmitting ? 0.2 : 1, cursor: isUploading || isSubmitting ? "not-allowed" : "pointer" }}
              >
                {showSpinner ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : isSubmitting ? (
                  "Submitting..."
                ) : (
                  "Submit"
                )}
              </button>
            </div>



          </form>
        </div>
        <ToastContainer />
      
    </div>
  );
}

export default Upload;

