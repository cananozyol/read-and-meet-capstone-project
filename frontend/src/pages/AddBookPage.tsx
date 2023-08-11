import {ChangeEvent, FormEvent, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, Rating, TextField, Typography} from "@mui/material";
import {useStore} from "../hooks/useStore.ts";
import {useNavigate} from "react-router-dom";
import {Genre, Status} from "../models/books.ts";
import {styled} from "styled-components";
import GenreSelect from "../components/GenreSelect.tsx";
import 'react-toastify/dist/ReactToastify.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {showInfoToast, showSuccessToast} from "../components/ToastHelpers.tsx";
import ButtonStyles from "../components/ButtonStyle.tsx";
import DialogButtonStyles from "../components/DialogButtonStyles.tsx";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import StatusSelect from "../components/StatusSelect.tsx";

export default function AddBookPage() {

    const navigate = useNavigate();
    const { postBook } = useStore();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: Genre.NOT_SELECTED,
        status: Status.NOT_READ,
        rating: 0,
    });
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.target.value as Status;
        setFormData((prevData) => ({ ...prevData, status }));
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postBook(formData);
        navigate("/booklist");
        showSuccessToast('You added your new book!');
    };
    const handleCancel = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirmCancel = () => {
        setOpen(false);
        navigate('/booklist');
        showInfoToast('You canceled adding a new book!');
    }
    return (
        <FormContainer onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" component="h1" style={{ margin: "20px 0", fontFamily: "Roboto", fontWeight: "bold" }}>
                Add Book
            </Typography>

            <TextField
                id="book-title"
                name="title"
                variant="outlined"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter the book title"
                style={{ marginBottom: "10px", width: "300px" }}
            />

            <TextField
                id="book-author"
                name="author"
                variant="outlined"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter the author's name"
                style={{ marginBottom: "10px", width: "300px" }}
            />

            <GenreSelect selectedGenre={formData.genre}
                onGenreChange={(e) => setFormData({ ...formData, genre: e.target.value as Genre })}
            />

            <Typography variant="body1">Status:</Typography>
            <StatusSelect selectedStatus={formData.status} onStatusChange={handleStatusChange} />

            <Typography variant="body1">Rating:</Typography>
            <Rating
                name="rating"
                value={formData.rating}
                onChange={(_, newValue) => {

                    if (newValue !== null) {

                        setFormData({ ...formData, rating: newValue });
                    }
                }}

                emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{ color: "#d1adee" }} />}
                icon={<FavoriteIcon fontSize="inherit" style={{ color: "#d1adee" }} />}
            />
            <StyledButton>
                <ButtonStyles onClick={handleCancel} startIcon={CloseIcon}>Cancel</ButtonStyles>
                <ButtonStyles type="submit" startIcon={CheckIcon}>Save</ButtonStyles>
            </StyledButton>
                <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: "black" }}>
                            Are you sure you want to cancel adding a book?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <DialogButtonStyles onClick={handleClose}>No</DialogButtonStyles>
                        <DialogButtonStyles onClick={handleConfirmCancel}>Yes</DialogButtonStyles>
                    </DialogActions>
                </Dialog>
        </FormContainer>
    )
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;
