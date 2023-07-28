import {useState} from "react";
import {useFetch} from "../hooks/useFetch.ts";
import {TextField} from "@mui/material";
import {styled} from "styled-components";
import {useNavigate, useParams} from "react-router-dom";

export default function EditPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { putMeeting } = useFetch();
    const meeting = useFetch((state) => state.getMeetingById(id));

    const [formData, setFormData] = useState({
        title: meeting?.title || "",
        date: meeting?.date || "",
        location: meeting?.location || "",
    });

    const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (meeting) {
            putMeeting({
                ...meeting,
                ...formData,
            });
            navigate(`/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/${id}`);
    };

    return (
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSaveChanges}>
            <h1 style={{ margin: "20px 0" }}>Edit Meeting</h1>
            <TextField
                id="meeting-title"
                name="title"
                label="Meeting Title"
                variant="outlined"
                value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            <TextField
                id="meeting-location"
                name="location"
                label="Location"
                variant="outlined"
                value={formData.location}
                onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            <StyledButton>
                <button type="submit">Save Changes</button>
                <button onClick={handleCancel}>Cancel</button>
            </StyledButton>
        </form>
    );
}

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;
