import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading} =useAuth()
    const location =useLocation()
    console.log('location',location)
    if(loading){
        return <div>
            <span className="loading loading-ball loading-xs"></span>
        </div>
    }
    {
        if(!user) {
            return <Navigate state={location.pathname} to='/login'></Navigate>
        }
    }

    return children

};

export default PrivetRoute;