import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {

    const Element = props.component;
    const [authenticated, setAuthenticated] = useState(true);
    const token = useSelector(store => store.tokenSlice.user);

    useEffect(() => {
        setAuthenticated(true);
    }, [token])

    return (
        <>
            {
                authenticated 
                ? <Element {...props}/>
                : <Navigate to='/login' replace />
            }
        </>
    )
}

export default PrivateRoute;