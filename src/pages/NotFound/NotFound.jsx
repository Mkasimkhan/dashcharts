import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px auto",
        fontSize: "2rem",
    }

    const LinkStyle = {
        color: "Blue"
    }

    return(
        <>
            <div style = {style}>
                <h1>Al-Wahid Quranic Academy</h1>
                <h1>Page Not Found</h1>
                <Link to = "/dashboard" style = {LinkStyle}>Go to Dashboard</Link>
            </div>
        </>
    )
}

export default NotFound