import type { JSX } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom"

const PrivateRoute=({children}:{children:JSX.Element})=>{
const email=useAppSelector(state=>state.otp.Useremail)

if(!email){
    return <Navigate to='/signup' replace/>
}

return children
}

export default PrivateRoute