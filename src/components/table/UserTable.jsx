import React, { useState, useEffect } from 'react';
import styles from './UserTable.module.css'; // Modular CSS
import axios from 'axios';
import PreviewImage from '../PreviewImage';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

function UserTable() {
  const [text, setText] = useState('');
  const[loading,setLoading] = useState(false);
  const [status, setStatus] = useState('All Bills');
  const [data, setData] = useState([]);
  const [data1,setData1] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to show per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        setLoading(true);
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
        setLoading(false);
        setData1(response.data.userBills);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  console.log("data is:",data1)

  useEffect(() => {
    if (text === '' && status === 'All Bills') {
      console.log("dfsd")
      setData([...data1.reverse()]); // If all filters are empty, show full reversed list
      return;
    }

    let filteredData = data1;

    // Apply filters dynamically
    if (text !== "") {
      console.log("text is changed")
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.uploadedBy.toLowerCase().includes(text.toLowerCase())
      );
      console.log("filterdata from text:",filteredData)
    }

  
    if (status !== "All Bills") {
      console.log("status is changed")
      filteredData = filteredData.filter((item) => item.status === status);
      console.log("filterdata from status:",filteredData)
    }

    setData([...filteredData]); // Reverse the final filtered list
}, [text, status]);

  const handlePreview = (image) => {
    setSelectedImage(image);
    setOpenPreview((prev) => !prev);
  };

  const calculateBills = () => {
    let pending = 0;
    let accepted = 0;
    let rejected = 0;
    let pendingBill = 0;
    let acceptedBill = 0;
    let rejectedBill = 0;

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

    return { pending, accepted, rejected, pendingBill, acceptedBill, rejectedBill };
  };

  const { pending, accepted, rejected, pendingBill, acceptedBill, rejectedBill } = calculateBills();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  console.log("DATA is:",data);

  const nextPage = () => {
    if (indexOfLastItem < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstItem > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-white ms-auto text-center flex-1">Your Bills</h1>

        <div className="d-flex container-sm row mb-5 mx-auto mt-4">
          <div className="col-6" role="search">
            <input
              onChange={(e) => {
                setText(e.target.value);
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
  <div className="ms-auto me-auto container-md d-flex flex-wrap row mt-4 text-nowrap mb-5">
    {[
      { title: 'Total Bills', value: pending + accepted + rejected, color: 'blue' },
      { title: 'Total Amount', value: `₹${acceptedBill + pendingBill + rejectedBill}`, color: 'blue' },
      { title: 'Pending Bills', value: pending, color: 'rgb(237, 221, 74)' },
      { title: 'Pending Amount', value: `₹${pendingBill}`, color: 'rgb(237, 221, 74)' },
      { title: 'Accepted Bills', value: accepted, color: 'rgb(96, 237, 74)' },
      { title: 'Accepted Amount', value: `₹${acceptedBill}`, color: 'rgb(96, 237, 74)' },
      { title: 'Rejected Bills', value: rejected, color: 'red' },
      { title: 'Rejected Amount', value: `₹${rejectedBill}`, color: 'red' },
    ].map((card, index) => (
      <div
        key={index}
        className="col-6 col-md-6 mb-3 "
      >
        <div
          className="px-1 py-3 w-full text-center"
          style={{
            borderRadius: '4px',
            boxShadow: '0 4px 8px black',
            backgroundColor: 'white',
            color: card.color,
          }}
        >
          <div className={`fw-bold ${styles.cardTitle}`}>{card.title}</div>
          <div className={`text-black ${styles.cardValue}`} >{loading ? "Loading..." : card.value}</div>
        </div>
      </div>
    ))}
  </div>
)}


      <h1 className="text-white ms-auto text-center flex-1 mb-4">Bills & Details</h1>

      <div className={`${styles.tableContainer} w-100 container mb-5 p-2`}>
        {loading ? <p className='fs-3 d-flex justify-content-center align-items-center'  style={{color:'white'}}>Loading...</p> :
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
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Status</th>
              <th className={`${styles.tableHeaderCell} text-nowrap`}>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data1, index) => {
              const statusColor =
                data1.status === 'pending'
                  ? 'rgb(237, 221, 74)'
                  : data1.status === 'accepted'
                  ? 'rgb(96, 237, 74)'
                  : 'rgb(255,0,0)';

              return (
                // (data1.status === status || status === 'All Bills') &&
                // (data1.name.toLowerCase().includes(text.toLowerCase()) ||
                //   data1?.billType?.toLowerCase().includes(text.toLowerCase())) && 
                  <tr key={index}>
                    <td className={styles.tableDataCell}>{indexOfFirstItem + index + 1}</td>
                    <td className={styles.tableDataCell}>{data1.name}</td>
                    <td className={styles.tableDataCell}>{data1.billType || 'none'}</td>
                    <td className={styles.tableDataCell}>{data1.GstNumber || 'none'}</td>
                    <td className={styles.tableDataCell}>{data1.billNumber || 'none'}</td>
                    <td className={styles.tableDataCell}>{data1.category || 'none'}</td>
                    <td className={styles.tableDataCell}>{data1.firmName || 'none'}</td>
                    <td className={styles.tableDataCell}>{
                      data1.date
                        ? new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          }).format(new Date(data1.date))
                        : 'none'
                    }</td>
                    <td className={styles.tableDataCell}>{data1.amount || 'none'}</td>
                    <td className={styles.tableDataCell}>{data1.uploadedBy || 'none'}</td>
                    <td className={styles.tableDataCell} style={{ color: statusColor }}>
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
                
              );
            })}
          </tbody>
        </table>
}
      </div>

      <div className="ms-auto me-auto container-md d-flex flex-wrap row mb-3">
        <div className='col-6'>
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
         <span  style={{fontSize:'15px',fontWeight:'bolder'}}><GrLinkPrevious/></span> Previous
        </button>
        </div>

       <div className='col-6 d-flex justify-content-end'>
         
       <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={data.length <= 15 || currentItems.length < 15}
        >
           Next <span  style={{fontSize:'15px',fontWeight:'bolder'}}><GrLinkNext/></span>
        </button>
       </div>

      </div>
    

      {openPreview && <PreviewImage image={selectedImage} onClose={() => setOpenPreview(false)} />}
    </div>
  );
}

export default UserTable;
