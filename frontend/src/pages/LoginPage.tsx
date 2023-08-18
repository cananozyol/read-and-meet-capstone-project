import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {useStore} from "../hooks/useStore.ts";
import {styled} from "styled-components";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonStyle from "../components/ButtonStyle.tsx";


export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setUsername(value);
    }

    function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setPassword(value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
            login(username, password, navigate);
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p></p>
            <TextFieldContainer>
                <TextField
                    id="username"
                    name="username"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameInput}
                    required
                    placeholder="Username"
                    style={{ marginBottom: "10px", width: "300px" }}
                    color="secondary"
                />
            </TextFieldContainer>
            <p></p>
            <TextFieldContainer>
                <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                    placeholder="Password"
                    style={{ marginBottom: "10px", width: "300px" }}
                    color="secondary"
                    type={showPassword ? "text" : "password"}
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
            </TextFieldContainer>
            <StyledButton>
                <ButtonStyle type="submit">Login</ButtonStyle>
                <HorizontalLine />
                <p>
                    Not a member?{" "}
                    <Link to="/register" style={{ color: "#551A8B", textDecoration: "underline" }}>
                        SIGN UP
                    </Link>
                </p>
            </StyledButton>
        </FormContainer>
    );
}


const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const HorizontalLine = styled.div`
  width: 75%;
  height: 1px;
  background-color: #411c5d;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const TextFieldContainer = styled.div`
  margin-bottom: 10px;
`;

