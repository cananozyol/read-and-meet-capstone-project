import React, {useState} from "react";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom";
import {styled} from "styled-components";
import {Book} from "../models/books.ts";
import {MeetingWithoutId} from "../models/meeting.ts";
import ButtonStyle from "../components/ButtonStyle.tsx";
import AddButton from "../components/AddButton.tsx";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../components/ConfirmationDialog.tsx";
import {useStore} from "../hooks/useStore.ts";

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
    const {  user } = useStore();
    const [formData, setFormData] = useState<MeetingWithoutId>(initialFormData);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const navigate = useNavigate();
    const filteredBooks = books.filter((book) => book.userId === user.id);

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
        setIsCancelDialogOpen(true);
    };

    const handleCloseCancelDialog = () => {
        setIsCancelDialogOpen(false);
    };

    const handleConfirmCancel = () => {
        setIsCancelDialogOpen(false);
        onCancel();
    };

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
                    onChange={(event) => onBookSelect(event.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Select Book" }}
                    color="secondary"
                >
                    <MenuItem value="" disabled>
                        Select a Book
                    </MenuItem>
                    {filteredBooks.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                            {book.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <StyledButton>
                <ButtonStyle onClick={handleCancel} startIcon={CloseIcon} type="button">
                    Cancel
                </ButtonStyle>
                <ButtonStyle type="submit" startIcon={CheckIcon}>
                    Save
                </ButtonStyle>
            </StyledButton>
            <p></p>
            <Typography>Your book is not in the List?</Typography>
            <p></p>
            <AddButton to="/addbook">Add Book</AddButton>

            <ConfirmationDialog
                open={isCancelDialogOpen}
                onClose={handleCloseCancelDialog}
                onConfirm={handleConfirmCancel}
                message="Are you sure you want to cancel adding/editing a meeting?"
            />
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
