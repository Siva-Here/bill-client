import React from 'react'
import Log from './Log'

const MainLog = () => {
    return (
        <div className='container'>
            <div className='d-flex vh-100 justify-content-center align-items-center'>
                <div className="col-lg-5 col-md-6 col-sm-12  mx-auto">
                    <Log/>
                </div>
            </div>
        </div>
    )
}

export default MainLog