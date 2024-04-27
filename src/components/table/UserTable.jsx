import React, { useState, useEffect } from 'react';
import './UserTable.css';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
// import ReactPieChart from "chartpiejs";
import {Pie} from 'react-chartjs-2';
const dataSets = [
  {data:[100,200,400],
  backgroundColor: ['red','rgb(96, 237, 74)','blue']}
];

function UserTable() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('All Bills');
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URL
  let statusColor = '';
  let pending = 0;
  let accepted = 0;
  let rejected = 0;
  let pendingBill = 0;
  let acceptedBill = 0;
  let rejectedBill = 0;

  function handleTextChange(e) {
    setText(e.target.value);
    console.log(text);
  }

  function calculateBills(){
    data.forEach((data1)=>{
      if(data1.status=="pending"){
        pending+=1;
        pendingBill+=data1.amount; 
      }else if(data1.status=="accepted"){
        accepted+=1;
        acceptedBill+=data1.amount; 
      }else if(data1.status=="rejected"){
        rejected+=1;
        rejectedBill+=data1.amount; 
      }
    })
  }
  calculateBills();

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
<div class="w-50 ms-auto me-auto mb-4">
              <input onChange={(e)=>{handleTextChange(e)}} className="p-2 fw-bold form-control me-2" type="search" placeholder="Search Bills" aria-label="Search" />
          </div>          
          <select className='w-25 ms-auto me-auto mb-4 form-select flex-2' onChange={(e) => { setStatus(e.target.value); }}>
            <option value="All Bills">All Bills</option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
      </div>
      <div className="ms-auto me-auto container-md d-flex justify-content-evenly row">        
      {/* <PieChart
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
        ]}
      />; */}
        {/* <ReactPieChart dataSets={dataSets}/> */}
        {/* <Pie data={{datasets: dataSets}} height='50%'/> */}
        <div className='flex-1 ms-auto me-auto upload-outer-div col-10 col-sm-10 mt-5 justify-content-center align-items-center'>
          <p className="fs-4 fw-bold">Total Bills: {pending+accepted+rejected}</p>
          <p className="fs-4 fw-bold" style={{}}>Total Amount: &#8377; {acceptedBill+pendingBill+rejectedBill}</p>
        </div>
        <div className='upload-outer-div col-10 col-md-4'>
          <p className="fs-4 fw-bold" style={{color: "rgb(237, 221, 74)"}}>Pending Bills: {pending}</p>
          <p className="fs-4 fw-bold" style={{color: "rgb(96, 237, 74)"}}>Accepted Bills: {accepted}</p>
          <p className="fs-4 fw-bold" style={{color: "red"}}>Rejected Bills: {rejected}</p>
        </div>
        <div className='upload-outer-div col-md-4 col-10'>
          <div className='flex-1 ms-atuo'>
            <p className="fs-4 fw-bold" style={{color: "rgb(237, 221, 74)"}}>Pending Amount: &#8377; {pendingBill}</p>
            <p className="fs-4 fw-bold"style={{color: "rgb(96, 237, 74)"}}>Accepted Amount: &#8377; {acceptedBill}</p>
            <p className="fs-4 fw-bold" style={{color: "red"}}>Rejected Amount: &#8377; {rejectedBill}</p>
          </div>
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
            if(data1.status=='pending'){
              statusColor = 'rgb(237, 221, 74)';
            }else if(data1.status=='accepted'){
              statusColor = 'rgb(96, 237, 74)';
            }else if(data1.status=='rejected'){
              statusColor = 'rgb(255,0,0)';
            }
            return (
              <>
                {((data1.status === status || status==='All Bills') && (data1.name.toLowerCase().includes(text.toLowerCase()) || data1.type.toLowerCase().includes(text.toLowerCase()))) ? (
                  <>
                    
                    <tr className='row' key={index}>
                      <td data-cell='SNo' className='col-1 text-center d-none d-md-inline d-sm-none'>{index + 1}</td>
                      <td data-cell='Name' className='col-xs-8 col-sm-4 col-md-2 text-center'>{data1.name}</td>
                      <td data-cell='Amount' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.amount}</td>
                      <td data-cell='Type' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.type}</td>
                      <td data-cell='Status' className={`col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline ${statusColor}`} style={{color: statusColor}}>{data1.status}</td>
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
