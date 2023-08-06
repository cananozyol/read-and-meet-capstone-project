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
import {useMeetings} from "../hooks/useMeetings.ts";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {styled} from "styled-components";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DetailMeetingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const meeting = useMeetings((state) => state.getMeetingById(id));
    const { deleteMeeting } = useMeetings();
    const [open, setOpen] = useState(false);

    if (!meeting) {
        return <>No Meeting</>;
    }

    const handleDelete = () => {
        deleteMeeting(id);
        navigate("/meetinglist");
        toast.warning("You have deleted your meeting!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <button>x</button>,
            style: { background: '#fff9c4', color: "black" },
        });
    };

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
                {meeting.book && (
                    <Typography variant="body2" align="center">
                        Book: {meeting.book.title} by {meeting.book.author}
                    </Typography>
                )}
            </CardContent>
            <CardContent style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <StyledButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<BorderColorIcon style={{ color: 'white' }} />}
                        onClick={() => navigate(`/${id}/editmeeting`)}
                        sx={{
                            backgroundColor: '#d1adee',
                            color: 'black',
                            borderRadius: '5px',
                            width: '139px',
                        }}
                    >
                        EDIT
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteForeverIcon style={{ color: 'white' }} />}
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: '#d1adee',
                            color: 'black',
                            borderRadius: '5px',
                            width: '139px',
                        }}
                    >
                        Delete
                    </Button>
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
