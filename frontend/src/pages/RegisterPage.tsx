import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../hooks/useStore.ts";
import {styled} from "styled-components";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonStyle from "../components/ButtonStyle.tsx";


export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const navigate = useNavigate();
    const register = useStore((state) => state.register);

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);


    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value);
        if (event.target.value.includes(" ")) {
            setErrorUsername("Whitespace is not allowed!")
        } else if (event.target.value.length < 3) {
            setErrorUsername("Username must be at least 3 characters long!")
        } else if (event.target.value.length > 25) {
            setErrorUsername("Username must be under 25 characters long!")
        } else {
            setErrorUsername("")
        }
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value);
        if (!isPasswordValid) {
            setErrorPassword("Password must contain at least one lowercase letter, one uppercase letter, and one digit");
        } else {
            setErrorPassword("");
        }
    }

    function handleRepeatedPasswordInput(event: ChangeEvent<HTMLInputElement>) {
        setRepeatedPassword(event.currentTarget.value);
    }

    function handleRegistration(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (errorUsername || errorPassword) {
            return;
        }

        register(username, password, repeatedPassword, navigate);
    }


    return (
        <>
            <FormContainer onSubmit={handleRegistration} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>Sign Up</h1>
                <p></p>
                <h3>Username:</h3>
                <TextField
                    id="username"
                    name="username"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameInput}
                    required
                    placeholder="Minimum 3 characters"
                    style={{ marginBottom: "10px", width: "300px" }}
                    color="secondary"
                    error={!!errorUsername}
                    helperText={errorUsername}
                />
                <h3>Password:</h3>
                <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                    placeholder="Minimum 6 characters: numbers and letters"
                    style={{ marginBottom: "10px", width: "300px" }}
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    error={!!errorPassword}
                    helperText={errorPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    id="repeated-password"
                    name="repeated-password"
                    variant="outlined"
                    value={repeatedPassword}
                    onChange={handleRepeatedPasswordInput}
                    required
                    placeholder="Please repeat your password"
                    style={{ marginBottom: "10px", width: "300px" }}
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    error={!!errorPassword}
                    helperText={errorPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {password !== repeatedPassword && (
                    <p style={{ color: "red" }}>Passwords do not match</p>
                )}
            </FormContainer>

            <StyledButton>
            <ButtonStyle type="submit">Sign Up</ButtonStyle>
                <HorizontalLine />
                <p>
                    Already a member?{" "}
                    <Link to="/login" style={{ color: "#551A8B", textDecoration: "underline" }}>
                        LOGIN
                    </Link>
                </p>
            </StyledButton>
        </>
    )
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;
export const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
export const HorizontalLine = styled.div`
  width: 75%;
  height: 1px;
  background-color: #411c5d;
  margin-top: 30px;
  margin-bottom: 10px;
`;
