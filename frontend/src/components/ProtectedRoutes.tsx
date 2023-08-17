import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user?: string
}

export default function ProtectedRoutes({user}: Props) {

    const isLoggedIn = user !== undefined && user !== "";

    return <>{isLoggedIn ? <Outlet/> : <Navigate to="/login"/>}</>;
}
