import React, {useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom";
import {styled} from "styled-components";
import {Book} from "../models/books.ts";
import {MeetingWithoutId} from "../models/meeting.ts";
import DialogButtonStyles from "../components/DialogButtonStyles.tsx";
import ButtonStyle from "../components/ButtonStyle.tsx";
import AddButton from "../components/AddButton.tsx";
import Typography from "@mui/material/Typography";

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
                color="secondary"
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
                color="secondary"
            />
            <TextField
                id="meeting-location"
                name="location"
                label="Location"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
                style={{ marginBottom: "10px", width: "300px" }}
                color="secondary"
            />

            <FormControl style={{ marginBottom: "10px", width: "300px" }}>
                <Select
                    value={selectedBookId}
                    onChange={(event) => onBookSelect(event.target.value as string)}
                    displayEmpty
                    inputProps={{ "aria-label": "Select Book" }}
                    color="secondary"
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
            <p></p>
            <Typography>Your book is not in the List?</Typography>
            <p></p>
            <AddButton to="/addbook">Add Book</AddButton>
            <StyledButton>
                <ButtonStyle onClick={handleCancel} startIcon={CloseIcon} type="button">
                    Cancel
                </ButtonStyle>
                <ButtonStyle type="submit" startIcon={CheckIcon}>
                    Save
                </ButtonStyle>
            </StyledButton>

            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: "black" }}>
                        Are you sure you want to cancel adding/editing a meeting?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <DialogButtonStyles onClick={handleClose}>No</DialogButtonStyles>
                    <DialogButtonStyles onClick={handleConfirmCancel}>Yes</DialogButtonStyles>
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
