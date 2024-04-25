import React, { useState, useEffect } from 'react';
import './UserTable.css';
import axios from 'axios';

function UserTable() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('All Bills');
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URL
  let statusColor = '';

  function handleTextChange(e) {
    setText(e.target.value);
    console.log(text);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post(
          'https://bill-server-hiq9.onrender.com/user/fetchBills',
          { username: localStorage.getItem('username') },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.userBills.reverse());
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  // Function to handle image click
  const handleImageClick = (image) => {
    console.log("Image clicked:", image);
    setSelectedImage(image); // Set the selected image URL to show in the popup
  };
  

  return (
    <div>
      <div>
        <h1 className='text-white ms-auto text-center flex-1'>Your Bills</h1>
        <br /><hr />
        <div className="d-flex container-sm">
          <form class="w-50 ms-auto me-auto mb-4" role="search">
              <input onChange={(e)=>{handleTextChange(e)}} className="p-2 fw-bold form-control me-2" type="search" placeholder="Search Bills" aria-label="Search" />
          </form>
          <select className='w-25 ms-auto me-auto mb-4 form-select flex-2' onChange={(e) => { setStatus(e.target.value); }}>
            <option value="All Bills">All Bills</option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
      </div>
      <table className='table-striped table-hover w-75 container mb-5'>
        <tr className='row heading py-5 d-none d-sm-flex'>
          <th data-cell='SNO' className='col-1 text-center heading d-none d-sm-inline fs-3'>SN0</th>
          <th data-cell='Name' className='fs-3 col-2 text-center heading d-none d-sm-inline'>NAME</th>
          <th data-cell='Amount' className='fs-3 col-3 text-center heading d-none d-sm-inline'>AMOUNT</th>
          <th data-cell='Type' className='fs-3 col-3 text-center heading d-none d-sm-inline'>TYPE</th>
          <th data-cell='status' className='fs-3 col-3 text-center heading d-none d-sm-inline'>STATUS</th>
        </tr>
        <hr id='hr1' />
        <tbody>
          {data.map((data1, index) => {
            return (
              <>
                {((data1.status === status || status==='All Bills') && (data1.name.toLowerCase().includes(text.toLowerCase()) || data1.type.toLowerCase().includes(text.toLowerCase()))) ? (
                  <>
                    <tr className='row' key={index}>
                      <td data-cell='SNo' className='col-1 text-center d-none d-md-inline d-sm-none'>{index + 1}</td>
                      <td data-cell='Name' className='col-xs-8 col-sm-4 col-md-2 text-center'>{data1.name}</td>
                      <td data-cell='Amount' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.amount}</td>
                      <td data-cell='Type' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.type}</td>
                      <td data-cell='Status' className='col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline' style={{color: {statusColor}}}>{data1.status}</td>
                      <td data-cell='image' className='col-12 text-center d-sm-inline'>
                        <img 
                          className='ms-auto me-auto' 
                          src={data1.image} 
                          alt="" 
                          width="300vw" 
                          onClick={() => handleImageClick(data1.image)} // Call handleImageClick on image click
                        />
                      </td>
                    </tr>
                    <hr id='hr' />
                  </>
                ) : (
                  <>
                    
                  </>
                )}
              </>
            );
          })}
        </tbody>
      </table>
      {/* Popup for displaying the selected image */}
      {selectedImage && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedImage} alt="Popup" />
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;
