import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const UserNav = () => {
    const navigate = useNavigate();
    const [text,setText] = useState([]);
    // function handleTextChange(e) {
    //     setText(e.target.value);
    // }
    function handleLogOut(){
        const logout = window.confirm('Confirm Log Out');
        console.log(logout);
        if(logout){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username');
            navigate('/login');
        }
    }
    return (
        <div className='mb-5 navbar-light text-dark'>
            <nav class="navbar navbar-expand-lg navbar-dark fs-4">
                <div class="container-fluid">
                    <h2 class="display-6 fs-2 fw-bold text-white m-2" href="#">{localStorage.getItem('username')}</h2>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0 text-end">
                            <li class="nav-item">
                                <NavLink className='text-decoration-none' to='/contact'><a class="nav-link active" aria-current="page">Web Team &nbsp;</a></NavLink>
                            </li>
                            <li class="nav-item">
                                {/* <NavLink to='/login' className='text-decoration-none'> */}
                                <a onClick={handleLogOut} class="nav-link active">LogOut</a>
                                {/* </NavLink> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default UserNav