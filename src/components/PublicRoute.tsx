import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute=({children}:{children:JSX.Element})=>{
 const token = useSelector((state: any) => state.auth.accessToken)

    if(token){
        return <Navigate to='/' replace />
    }

    return children
}

export default PublicRoute