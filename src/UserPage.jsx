import Upload from './components/upload-component/Upload';
import UserTable from './components/table/UserTable';
import UserNav from './components/navbar/UserNav';
function UserPage() {
  return(
    <>
        {localStorage.getItem('jwtToken') && (<>
        <UserNav />
        <br />
        <Upload />
        <UserTable />
        </>)}
    </>
  )
}

export default UserPage;