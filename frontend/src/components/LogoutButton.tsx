import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useStore} from "../hooks/useStore.ts";


export default function LogoutButton() {

    const navigate = useNavigate();
    const me = useStore((state) => state.me);

    function handleLogout() {
        axios.post("/api/users/logout")
            .catch(console.error)
            .then(() => me())
            .then(() => navigate("/login"))
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
