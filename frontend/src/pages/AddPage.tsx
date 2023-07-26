import {useFetch} from "../hooks/useFetch.ts";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import {styled} from "styled-components";

export default function AddPage() {

    const postMeeting = useFetch((state) => state.postMeeting);

    const [formData, setFormData] = useState<MeetingWithoutId>({
        title: "",
        date: "",
        location: "",
    });

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postMeeting(formData);
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ margin: "20px 0" }}>Add Meeting</h1>
            <TextField
                id="meeting-title"
                name="title"
                label="Meeting Title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            <TextField
                id="meeting-date"
                name="date"
                label="Date"
                variant="outlined"
                type="date"
                value={formData.date}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            <TextField
                id="meeting-location"
                name="location"
                label="Location"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            <StyledAdd>
                <button type={"submit"}>Add</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </StyledAdd>
        </form>
    );
}

const StyledAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;