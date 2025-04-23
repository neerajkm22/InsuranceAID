import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let user = {};

    useEffect(() => {
        (async() => {
            try {        
                user = await getCurrentUser();
                if(user && user.userId) {
                    setIsAuthenticated(true);
                }   
            } catch (error) {
                navigate('/');
            }      
        })();
    });

    return (
        <>
        {isAuthenticated && <Outlet />}
        </>
    )
}

export default ProtectedRoutes