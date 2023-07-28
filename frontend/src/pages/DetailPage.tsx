import {useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import {useFetch} from "../hooks/useFetch.ts";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {styled} from "styled-components";

export default function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const meeting = useFetch((state) => state.getMeetingById(id));
    const { deleteMeeting } = useFetch();

    if (!meeting) {
        return <>No Meeting</>;
    }

    const handleDelete = () => {
        deleteMeeting(id);
        navigate("/");
    };

    return (
        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Typography variant="h5" align="center">
                    {meeting.title}
                </Typography>
                <Typography variant="body2" align="center" sx={{ display: "flex", alignItems: "center" }}>
                    <EventIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    Date: {new Date(meeting.date).toLocaleDateString("de-DE")}
                </Typography>
                <Typography variant="body2" align="center" sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    Location: {meeting.location}
                </Typography>
            </CardContent>
            <CardContent style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <StyledButton>
                    <button onClick={() => navigate(`/${id}/edit`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </StyledButton>
            </CardContent>
        </Card>
    );
}

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;
