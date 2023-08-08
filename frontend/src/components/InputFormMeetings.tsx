import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {styled} from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {Book} from "../models/books.ts";
import {MeetingWithoutId} from "../models/meeting.ts";

type Props = {
    title: string;
    initialFormData: MeetingWithoutId;
    onCancel: () => void;
    onSubmit: (formData: MeetingWithoutId) => void;
    books: Book[];
    selectedBookId: string | undefined;
    onBookSelect: (bookId: string | undefined) => void;
};

export default function InputFormMeetings({ title, initialFormData, onCancel, onSubmit, books, selectedBookId, onBookSelect  }: Props) {
    const [formData, setFormData] = useState<MeetingWithoutId>(initialFormData);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formData);
        navigate("/meetinglist");
    }

    const handleCancel = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmCancel = () => {
        setOpen(false);
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ margin: "20px 0" }}>{title}</h1>
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

            <FormControl style={{ marginBottom: "10px", width: "300px" }}>
                <Select
                    value={selectedBookId}
                    onChange={(event) => onBookSelect(event.target.value as string)}
                    displayEmpty
                    inputProps={{ "aria-label": "Select Book" }}
                >
                    <MenuItem value="" disabled>
                        Select a Book
                    </MenuItem>
                    {books.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                            {book.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <StyledButton>
                <Button
                    onClick={handleCancel}
                    variant="contained"
                    color="secondary"
                    startIcon={<CloseIcon style={{ color: "white" }} />}
                    sx={{
                        backgroundColor: "#d1adee",
                        color: "black",
                        borderRadius: "5px",
                        width: "139px",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    startIcon={<CheckIcon style={{ color: "white" }} />}
                    sx={{
                        backgroundColor: "#d1adee",
                        color: "black",
                        borderRadius: "5px",
                        width: "139px",
                    }}
                >
                    Save
                </Button>
            </StyledButton>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: "black" }}>
                        Are you sure you want to cancel adding/editing a meeting?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button onClick={handleClose} variant="outlined" sx={{ color: "black", backgroundColor: "#d1adee" }}>
                        No
                    </Button>
                    <Button onClick={handleConfirmCancel} variant="outlined" sx={{ color: "black", backgroundColor: "#d1adee" }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
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
