// import React, { useState, useEffect } from 'react';
// import './UserTable.css';
// import axios from 'axios';
// import { PieChart } from 'react-minimal-pie-chart';
// // import ReactPieChart from "chartpiejs";
// import { Pie } from 'react-chartjs-2';
// const dataSets = [
//   {
//     data: [100, 200, 400],
//     backgroundColor: ['red', 'rgb(96, 237, 74)', 'blue']
//   }
// ];

// function UserTable() {
//   const [text, setText] = useState('');
//   const [status, setStatus] = useState('All Bills');
//   const [data, setData] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URL
//   const [sorted, setSorted] = useState(false);
//   let statusColor = '';
//   let pending = 0;
//   let accepted = 0;
//   let rejected = 0;
//   let pendingBill = 0;
//   let acceptedBill = 0;
//   let rejectedBill = 0;

//   function handleTextChange(e) {
//     setText(e.target.value);
//     console.log(text);
//   }

//   function calculateBills() {
//     data.forEach((data1) => {
//       if (data1.status == "pending") {
//         pending += 1;
//         pendingBill += data1.amount;
//       } else if (data1.status == "accepted") {
//         accepted += 1;
//         acceptedBill += data1.amount;
//       } else if (data1.status == "rejected") {
//         rejected += 1;
//         rejectedBill += data1.amount;
//       }
//     })
//   }
//   calculateBills();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken');
//         const response = await axios.post(
//           'https://bill-server-hiq9.onrender.com/user/fetchBills',
//           { username: localStorage.getItem('username') },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setData(response.data.userBills.reverse());
//       } catch (error) {
//         console.error('Error:', error);
//         // Handle error
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("data from table is:",data)

//   // Function to handle image click
//   const handleImageClick = (image) => {
//     console.log("Image clicked:", image);
//     setSelectedImage(image); // Set the selected image URL to show in the popup
//   };


//   return (
//     <div>
//       <div>
//         <h1 className='text-white ms-auto text-center flex-1'>Your Bills</h1>
//         <br /><hr />
//         <div className="d-flex container-sm">
//           <div class="w-50 ms-auto me-auto mb-4" role="search">
//             <input onChange={(e) => { handleTextChange(e);if(e.target.value!=''){setSorted(true)}else{setSorted(false)}}} className="p-2 fw-bold form-control me-2" type="search" placeholder="Search Bills" aria-label="Search" />
//           </div>
//           <select className='w-25 ms-auto me-auto mb-4 form-select flex-2' onChange={(e) => { setStatus(e.target.value); if(e.target.value!='All Bills'){setSorted(true)}else{setSorted(false)}}}>
//             <option value="All Bills">All Bills</option>
//             <option value="pending">pending</option>
//             <option value="accepted">accepted</option>
//             <option value="rejected">rejected</option>
//           </select>
//         </div>
//       </div>
//       {!sorted && <><div className="ms-auto me-auto container-md d-flex justify-content-evenly row">
//         <div className='flex-1 ms-auto me-auto upload-outer-div col-10 col-sm-10 mt-5 justify-content-center align-items-center'>
//           <p className="fs-4 fw-bold" style={{color: "blue"}}>Total Bills: <span className='text-white fs-2 fst-italic fw-bold'>{pending + accepted + rejected}</span></p>
//           <p className="fs-4 fw-bold" style={{color: "blue"}}>Total Amount: <span className='text-white fs-2 fst-italic fw-bold'>&#8377; {acceptedBill + pendingBill + rejectedBill}</span></p>
//         </div>
//         <div className='upload-outer-div col-10 col-md-4'>
//           <p className="fs-4 fw-bold" style={{ color: "rgb(237, 221, 74)" }}>Pending Bills: <span className='text-white fs-2 fst-italic fw-bold'>{pending}</span></p>
//           <p className="fs-4 fw-bold" style={{ color: "rgb(96, 237, 74)" }}>Accepted Bills: <span className='text-white fs-2 fst-italic fw-bold'>{accepted}</span></p>
//           <p className="fs-4 fw-bold" style={{ color: "red" }}>Rejected Bills: <span className='text-white fs-2 fst-italic fw-bold'>{rejected}</span></p>
//         </div>
//         <div className='upload-outer-div col-md-4 col-10'>
//           <div className='flex-1 ms-auto'>
//             <p className="fs-4 fw-bold" style={{ color: "rgb(237, 221, 74)" }}>Pending Amount: <span className='text-white fs-2 fst-italic fw-bold'> &#8377; {pendingBill}</span> </p>
//             <p className="fs-4 fw-bold" style={{ color: "rgb(96, 237, 74)" }}>Accepted Amount: <span className='text-white fs-2 fst-italic fw-bold'> &#8377; {acceptedBill}</span></p>
//             <p className="fs-4 fw-bold" style={{ color: "red" }}>Rejected Amount: <span className='text-white fs-2 fst-italic fw-bold'>&#8377; {rejectedBill}</span></p>
//           </div>
//         </div>
//       </div></>}
//       <table className='table-striped table-hover w-75 container mb-5'>
//         <tr className='row heading py-5 d-none d-sm-flex'>
//           <th data-cell='SNO' className='col-1 text-center heading d-none d-sm-inline fs-3'>SN0</th>
//           <th data-cell='Name' className='fs-3 col-2 text-center heading d-none d-sm-inline'>NAME</th>
//           <th data-cell='Amount' className='fs-3 col-3 text-center heading d-none d-sm-inline'>AMOUNT</th>
//           <th data-cell='Type' className='fs-3 col-3 text-center heading d-none d-sm-inline'>TYPE</th>
//           <th data-cell='status' className='fs-3 col-3 text-center heading d-none d-sm-inline'>STATUS</th>
//         </tr>
//         <hr id='hr1' />
//         <tbody>
//           {data.map((data1, index) => {
//             if (data1.status == 'pending') {
//               statusColor = 'rgb(237, 221, 74)';
//             } else if (data1.status == 'accepted') {
//               statusColor = 'rgb(96, 237, 74)';
//             } else if (data1.status == 'rejected') {
//               statusColor = 'rgb(255,0,0)';
//             }
//             return (
//               <>
//                 {((data1.status === status || status === 'All Bills') && (data1.name.toLowerCase().includes(text.toLowerCase()) || data1?.billType?.toLowerCase().includes(text.toLowerCase()))) ? (
//                   <>

//                     <tr className='row' key={index}>
//                       <td data-cell='SNo' className='col-1 text-center d-none d-md-inline d-sm-none'>{index + 1}</td>
//                       <td data-cell='Name' className='col-xs-8 col-sm-4 col-md-2 text-center'>{data1.name}</td>
//                       <td data-cell='Amount' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.amount}</td>
//                       <td data-cell='Type' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.type}</td>
//                       <td data-cell='Status' className={`col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline ${statusColor}`} style={{ color: statusColor }}>{data1.status}</td>
//                       <td data-cell='image' className='col-12 text-center d-sm-inline'>
//                         <img
//                           className='ms-auto me-auto'
//                           src={data1.image}
//                           alt=""
//                           width="300vw"
//                           onClick={() => handleImageClick(data1.image)} // Call handleImageClick on image click
//                         />
//                       </td>
//                     </tr>
//                     <hr id='hr' />
//                   </>
//                 ) : (
//                   <>

//                   </>
//                 )}
//               </>
//             );
//           })}
//         </tbody>
//       </table>
//       {/* Popup for displaying the selected image */}
//       {selectedImage && (
//         <div className="popup">
//           <div className="popup-content">
//             <img src={selectedImage} alt="Popup" />
//             <button onClick={() => setSelectedImage(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserTable;



// import React, { useState, useEffect } from 'react';
// import './UserTable.css';
// import axios from 'axios';

// function UserTable() {
//   const [text, setText] = useState('');
//   const [status, setStatus] = useState('All Bills');
//   const [data, setData] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [sorted, setSorted] = useState(false);

//   let pending = 0;
//   let accepted = 0;
//   let rejected = 0;
//   let pendingBill = 0;
//   let acceptedBill = 0;
//   let rejectedBill = 0;

//   function handleTextChange(e) {
//     setText(e.target.value);
//   }

//   function calculateBills() {
//     data.forEach((data1) => {
//       if (data1.status === "pending") {
//         pending += 1;
//         pendingBill += data1.amount;
//       } else if (data1.status === "accepted") {
//         accepted += 1;
//         acceptedBill += data1.amount;
//       } else if (data1.status === "rejected") {
//         rejected += 1;
//         rejectedBill += data1.amount;
//       }
//     });
//   }
//   calculateBills();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken');
//         const response = await axios.post(
//           'https://bill-server-hiq9.onrender.com/user/fetchBills',
//           { username: localStorage.getItem('username') },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setData(response.data.userBills.reverse());
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   return (
//     <div>
//       <div>
//         <h1 className='text-white ms-auto text-center flex-1'>Your Bills</h1>
//         <br /><hr />
//         <div className="d-flex container-sm row mb-5 mx-auto">
//           <div className="col-6" role="search">
//             <input
//               onChange={(e) => { handleTextChange(e); setSorted(e.target.value !== ''); }}
//               className="p-2 fw-bold form-control me-2"
//               type="search"
//               placeholder="Search Bills"
//               aria-label="Search"
//             />
//           </div>
//           <select
//             className='col-6 '
//             onChange={(e) => { setStatus(e.target.value); setSorted(e.target.value !== 'All Bills'); }}
//           >
//             <option value="All Bills">All Bills</option>
//             <option value="pending">pending</option>
//             <option value="accepted">accepted</option>
//             <option value="rejected">rejected</option>
//           </select>
//         </div>
//       </div>



// {!sorted && (
//   <div className="ms-auto me-auto container-md d-flex flex-wrap  row mt-4">
//     <div className='col-12'>
//     <div className='row'>
//       <div className='col-6  mb-2'>
//         <p className="fs-5 fw-bold" style={{color: "blue"}}>Total Bills: <span className='text-white fs-5 fst-italic fw-bold'>{pending + accepted + rejected}</span></p>
//       </div>

//       <div className='col-6 mb-2'>
//       <p className="fs-5 fw-bold" style={{color: "blue"}}>Total Amount: <span className='text-white fs-5 fst-italic fw-bold'>&#8377; {acceptedBill + pendingBill + rejectedBill}</span></p>
//       </div>
//     </div>
//     </div>

//     <div className='col-12'>
//     <div className='row'>
//       <div className='col-6  mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "rgb(237, 221, 74)" }}>Pending Bills: <span className='text-white fs-5 fst-italic fw-bold'>{pending}</span></p>
//       </div>

//       <div className='col-6 mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "rgb(237, 221, 74)" }}>Pending Amount: <span className='text-white fs-5 fst-italic fw-bold'> &#8377; {pendingBill}</span> </p>
//       </div>
//     </div>
//     </div>


// <div className='col-12'>
// <div className='row'>
//       <div className='col-6  mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "rgb(96, 237, 74)" }}>Accepted Bills: <span className='text-white fs-5 fst-italic fw-bold'>{accepted}</span></p>
//       </div>

//       <div className='col-6 mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "rgb(96, 237, 74)" }}>Accepted Amount: <span className='text-white fs-5 fst-italic fw-bold'> &#8377; {acceptedBill}</span></p>
//       </div>
//     </div>
// </div>

// <div className='col-12'>
// <div className='row'>
//       <div className='col-6  mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "red" }}>Rejected Bills: <span className='text-white fs-5 fst-italic fw-bold'>{rejected}</span></p>
//       </div>

//       <div className='col-6 mb-2'>
//       <p className="fs-5 fw-bold" style={{ color: "red" }}>Rejected Amount: <span className='text-white fs-5 fst-italic fw-bold'>&#8377; {rejectedBill}</span></p>
//       </div>
//     </div>
//   </div>
// </div>

// )}


//      <div className="table-responsive w-100 container mb-5 p-2">
//        <table className='table table-striped table-hover'>
//          <thead>
//            <tr>
//             <th className='text-center'>Sno</th>
//              <th className='text-center'>Name</th>
//              <th className='text-center'>Bill Type</th>
//              <th className='text-center'>Bill Number</th>
//              <th className='text-center'>Category</th>
//              <th className='text-center'>Firmname</th>
//              <th className='text-center'>Bill Date</th>
//               <th className='text-center'>Amount</th>
//               <th className='text-center'>Uploaded By</th>
//              <th className='text-center'>IMAGE</th>
//              <th className='text-center'>STATUS</th>
//            </tr>
//           </thead>
//            <tbody>
//              {data.map((data1, index) => {
//               const statusColor =
//                 data1.status === 'pending' ? 'rgb(237, 221, 74)' :
//                 data1.status === 'accepted' ? 'rgb(96, 237, 74)' : 'rgb(255,0,0)';

//               return (
//                 (data1.status === status || status === 'All Bills') &&
//                 (data1.name.toLowerCase().includes(text.toLowerCase()) || data1?.billType?.toLowerCase().includes(text.toLowerCase())) && (
//                   <tr key={index}>
//                     <td className='text-center'>{index + 1}</td>
//                     <td className='text-center'>{data1.name}</td>
//                     <td className='text-center'>{data1.billType || 'none'}</td>
//                     <td className='text-center'>{data1.billNumber || 'none'}</td>
//                     <td className='text-center'>{data1.category || 'none'}</td>
//                     <td className='text-center'>{data1.firmName || 'none'}</td>
//                     <td className='text-center'>{data1.date || 'none'}</td>
//                     <td className='text-center'>{data1.amount || 'none'}</td>
//                     <td className='text-center'>{data1.uploadedBy || 'none'}</td>

//                     <td className='text-center' style={{ color: statusColor }}>{data1.status}</td>
//                     <td className='text-center'>

//                         <div style={{width:'100px',height:'100px'}}>
//                               <img
//                           src={data1.image}
//                           alt=""
//                           style={{ cursor: 'pointer',borderRadius:'2px'}}
//                           onClick={() => handleImageClick(data1.image)}
//                         />
//                         </div>

//                         <div>
//                           <button style={{width:'100px',textAlign:'center'}}>Preview</button>
//                         </div>

//                     </td>
//                   </tr>
//                 )
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {selectedImage && (
//         <div className="popup">
//           <div className="popup-content">
//             <img src={selectedImage} alt="Popup" />
//             <button onClick={() => setSelectedImage(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserTable;




import React, { useState, useEffect } from 'react';
import styles from './UserTable.module.css'; // Modular CSS
import axios from 'axios';
import PreviewImage from '../PreviewImage';

function UserTable() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('All Bills');
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  let pending = 0;
  let accepted = 0;
  let rejected = 0;
  let pendingBill = 0;
  let acceptedBill = 0;
  let rejectedBill = 0;

  const openModal = (image) => {
    setSelectedImage(image);
    setOpenPreview(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setOpenPreview(false);
  };


  function handleTextChange(e) {
    setText(e.target.value);
  }

  const handlePreview = (image) => {
    setSelectedImage(image)
    setOpenPreview((prev) => !prev)
  }


  function calculateBills() {
    data.forEach((data1) => {
      if (data1.status === 'pending') {
        pending += 1;
        pendingBill += data1.amount;
      } else if (data1.status === 'accepted') {
        accepted += 1;
        acceptedBill += data1.amount;
      } else if (data1.status === 'rejected') {
        rejected += 1;
        rejectedBill += data1.amount;
      }
    });
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
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <div>
        <h1 className="text-white ms-auto text-center flex-1">Your Bills</h1>
        <br />
        <hr />
        <div className="d-flex container-sm row mb-5 mx-auto">
          <div className="col-6" role="search">
            <input
              onChange={(e) => {
                handleTextChange(e);
                setSorted(e.target.value !== '');
              }}
              className="p-2 fw-bold form-control me-2"
              type="search"
              placeholder="Search Bills"
              aria-label="Search"
            />
          </div>
          <select
            className="col-6"
            onChange={(e) => {
              setStatus(e.target.value);
              setSorted(e.target.value !== 'All Bills');
            }}
          >
            <option value="All Bills">All Bills</option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
      </div>

      {!sorted && (
        <div className="ms-auto me-auto container-md d-flex flex-wrap row mt-4">
          <div className="col-12">
            <div className="row">
              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'blue' }}>
                  Total Bills:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">
                    {pending + accepted + rejected}
                  </span>
                </p>
              </div>

              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'blue' }}>
                  Total Amount:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">
                    ₹ {acceptedBill + pendingBill + rejectedBill}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'rgb(237, 221, 74)' }}>
                  Pending Bills:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">{pending}</span>
                </p>
              </div>

              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'rgb(237, 221, 74)' }}>
                  Pending Amount:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">
                    ₹ {pendingBill}
                  </span>{' '}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'rgb(96, 237, 74)' }}>
                  Accepted Bills:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">{accepted}</span>
                </p>
              </div>

              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'rgb(96, 237, 74)' }}>
                  Accepted Amount:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">
                    ₹ {acceptedBill}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-6 mb-2">
                <p className="fs-5 fw-bold" style={{ color: 'red' }}>
                  Rejected Bills:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">{rejected}</span>
                </p>
              </div>

              <div className="col-6 mb-2">
                <p className="fs-6 fs-md-5 fw-bold" style={{ color: 'red' }}>
                  Rejected Amount:{' '}
                  <span className="text-white fs-5 fst-italic fw-bold">
                    ₹{rejectedBill}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${styles.tableContainer} w-100 container mb-5 p-2`}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Sno</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Name</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Bill Type</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Gst Number</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Bill Number</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Category</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Firmname</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Date of purchase</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Amount</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Uploaded By</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Image</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Status</th>
              <th class></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data1, index) => {
              const statusColor =
                data1.status === 'pending'
                  ? 'rgb(237, 221, 74)'
                  : data1.status === 'accepted'
                    ? 'rgb(96, 237, 74)'
                    : 'rgb(255,0,0)';

              return (
                (data1.status === status || status === 'All Bills') &&
                (data1.name.toLowerCase().includes(text.toLowerCase()) ||
                  data1?.billType?.toLowerCase().includes(text.toLowerCase())) && (
                  <tr key={index}>
                    <td className={styles.tableDataCell}>{index + 1}</td>
                    <td className={styles.tableDataCell}>{data1.name}</td>
                    <td className={styles.tableDataCell}>
                      {data1.billType || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>
                      {data1.GstNumber || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>
                      {data1.billNumber || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>
                      {data1.category || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>
                      {data1.firmName || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>{data1.date
                      ? new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }).format(new Date(data1.date))
                      : 'none'}</td>
                    <td className={styles.tableDataCell}>
                      {data1.amount || 'none'}
                    </td>
                    <td className={styles.tableDataCell}>
                      {data1.uploadedBy || 'none'}
                    </td>
                    <td
                      className={styles.tableDataCell}
                      style={{ color: statusColor }}
                    >
                      {data1.status}
                    </td>
                    <td className={styles.tableDataCell}>
                      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                        <img
                          src={data1.image}
                          alt=""
                          className={styles.image}
                          style={{ cursor: 'pointer', borderRadius: '2px' }}
                          onClick={() => handlePreview(data1.image)}
                        />

                        <button className={styles.buttonOverlay} style={{ width: '100px', height: '20px', fontSize: '9px' }} onClick={() => handlePreview(data1.image)}>Click For Preview</button>


                      </div>

                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
      {openPreview && <PreviewImage image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default UserTable;


