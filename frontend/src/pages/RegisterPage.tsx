import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStore} from "../hooks/useStore.ts";


export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const navigate = useNavigate();
    const register = useStore((state) => state.register);


    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value);
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value);
    }

    function handleRepeatedPasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setRepeatedPassword(event.currentTarget.value);
    }

    function handleRegistration(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        register(username, password, repeatedPassword, navigate);
    }

    return (
        <>
            <form onSubmit={handleRegistration}>
                <input required id="username" name="username" value={username}
                                 onChange={handleUsernameInput}
                                 placeholder="Username"
                                 />
                <p>Minimum 3 characters</p>
                <input required id="password" name="password" value={password}
                                 onChange={handlePasswordInput}
                                 placeholder="Password"
                                 type="password"
                                 />
                <p>Minimum 6 characters: numbers and letters</p>
                <input required id="repeated-password" name="repeatedPassword" value={repeatedPassword}
                                 onChange={handleRepeatedPasswordInput}
                                 placeholder="Repeat Password"
                                 type="password"
                                 />
                <p></p>
                <button type={"button"} onClick={() => navigate("/login")}>Login</button>
                <p></p>
                <button type={"submit"}>Register</button>
            </form>
        </>
    )
}
