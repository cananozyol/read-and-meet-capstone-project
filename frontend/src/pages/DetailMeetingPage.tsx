import {Card, CardContent, Typography} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {styled} from "styled-components";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useStore} from "../hooks/useStore.ts";
import {showWarningToast} from "../components/ToastHelpers.tsx";
import ButtonStyle from "../components/ButtonStyle.tsx";
import ConfirmationDialog from "../components/ConfirmationDialog.tsx";

export default function DetailMeetingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const meeting = useStore((state) => state.getMeetingById(id ?? ""));
    const { deleteMeeting } = useStore();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    if (!meeting) {
        return <>No Meeting</>;
    }

    const handleDelete = () => {
        deleteMeeting(id ?? "");
        navigate("/meetinglist");
        showWarningToast('You have deleted your meeting!');
    };

    const handleEdit = () => {
        navigate(`/${id}/editmeeting`);
    }

    const handleClickOpen = () => {
        setIsDeleteDialogOpen(true);
    }

    const handleClose = () => {
        setIsDeleteDialogOpen(false);
    }

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
                <Typography variant="body2">
                    Book:{" "}
                    <StyledLink to={`/book/${meeting.book?.id}`}>
                        {meeting.book?.title} by {meeting.book?.author}
                    </StyledLink>
                </Typography>
            </CardContent>
            <CardContent style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <StyledButton>
                    <ButtonStyle onClick={handleEdit} startIcon={BorderColorIcon}>
                        EDIT
                    </ButtonStyle>
                    <ButtonStyle onClick={handleClickOpen} startIcon={DeleteForeverIcon}>
                        Delete
                    </ButtonStyle>
                </StyledButton>
                <ConfirmationDialog
                    open={isDeleteDialogOpen}
                    onClose={handleClose}
                    onConfirm={() => {
                        handleDelete();
                        handleClose();
                    }}
                    message="Are you sure you want to delete your meeting?"
                />
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rebeccapurple;
  &:hover {
    text-decoration: underline;
  }
`;
