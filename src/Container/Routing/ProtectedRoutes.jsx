import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'universal-cookie';

const ProtectedRoutes = (props) => {
    const { Component } = props
    // const cookie = new Cookies()
    const navigate = useNavigate()

    useEffect(() => {
        let login = localStorage.getItem("authToken")
        // let login = cookie.get("authToken")
        if(!login){
            navigate("/")
        }
    }, [navigate])
  return (
    <>
        <Component />
    </>
  )
}

export default ProtectedRoutes