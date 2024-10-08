import React from 'react'
import { useNavigate,  Route, Routes } from 'react-router-dom'

const PrivateRoute = ({ component: Element, ...rest }) => {
    let navigate = useNavigate();
    return (
        <>
            <Routes>
                <Route
                    {...rest}
                    render={(props) =>
                        localStorage.getItem("authToken") ? (
                            <Element {...props} />
                        ) :
                            (
                                navigate("/login", { replace: true })
                            )
                    }

                />
            </Routes>
        </>
    )
}

export default PrivateRoute