import {useStore} from "../hooks/useStore.ts";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}



