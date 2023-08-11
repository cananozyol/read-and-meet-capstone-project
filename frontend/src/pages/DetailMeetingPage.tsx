import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Typography
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {styled} from "styled-components";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useStore} from "../hooks/useStore.ts";
import {showWarningToast} from "../components/ToastHelpers.tsx";
import ButtonStyle from "../components/ButtonStyle.tsx";

export default function DetailMeetingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const meeting = useStore((state) => state.getMeetingById(id || ""));
    const { deleteMeeting } = useStore();
    const [open, setOpen] = useState(false);

    if (!meeting) {
        return <>No Meeting</>;
    }

    const handleDelete = () => {
        deleteMeeting(id || "");
        navigate("/meetinglist");
        showWarningToast('You have deleted your meeting!');
    };

    const handleEdit = () => {
        navigate(`/${id}/editmeeting`);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
                    Book: {meeting.book?.title} by {meeting.book?.author}
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
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
                            Are you sure you want to delete your meeting?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleClose} variant="outlined" sx={{ color: 'black', backgroundColor: '#d1adee' }}>No</Button>
                        <Button onClick={() => { handleDelete(); }} variant="outlined" sx={{ color: 'black', backgroundColor: '#d1adee' }}>Yes</Button>
                    </DialogActions>
                </Dialog>
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