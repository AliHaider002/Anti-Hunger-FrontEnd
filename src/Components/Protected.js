import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component} = props;
    const navigate = useNavigate();
        // const token = localStorage.getItem('token');
        // if(!token){
        //     navigate('/');
        // }
    
  return (
        <div>
            <Component/>
        </div>
  )
}

export default Protected