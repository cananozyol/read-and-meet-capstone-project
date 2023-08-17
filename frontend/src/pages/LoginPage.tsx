import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {useStore} from "../hooks/useStore.ts";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value);
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login(username, password, navigate);
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <input required id="username" name="username" value={username}
                                 onChange={handleUsernameInput}
                                 placeholder="Username"
                                 />
                <p></p>
                <input required id="password" name="password" value={password}
                                 onChange={handlePasswordInput}
                                 placeholder="Password"
                                 type="password"/>
                <p></p>
                <button type={"submit"} >Login</button>
                <p></p>
                <button type={"button"} onClick={() => navigate("/register")}>Register</button>
            </form>
        </>
    );
}


