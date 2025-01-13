import React, {useEffect} from 'react';
import Upload from './components/upload-component/Upload';
import UserTable from './components/table/UserTable';
import UserNav from './components/navbar/UserNav';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const jwtToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate(); 

  useEffect(()=>{
    if (!jwtToken) {
      navigate('/login');
      return;
    }
  },[])

  return (
    <>
      <UserNav />
      {/* <br /> */}
      <Upload />
      <UserTable />
    </>
  );
}

export default UserPage;
