import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Rating,
    TextField
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Check as CheckIcon, Close as CloseIcon} from "@mui/icons-material";
import {useBooks} from "../hooks/useBooks.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Genre, Status} from "../models/books.ts";
import {styled} from "styled-components";
import GenreSelect from "../components/GenreSelect.tsx";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AddBookPage() {

    const navigate = useNavigate();
    const { postBook } = useBooks();
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
        toast.success('You have successfully added your new book!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <button>x</button>,
            style: { background: '#b2dfdb', color: "black" },
        });
    };

    const handleCancel = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmCancel = () => {
        setOpen(false);
        navigate('/booklist')
        toast.info('You canceled adding a new book!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <button>x</button>,
            style: { background: '#bbdefb', color: "black" },
        });
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
            <FormControl component="fieldset" style={{ marginBottom: "10px", display: "flex"}}>
               <RadioGroup
                    aria-label="status"
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <FormControlLabel
                        value={Status.NOT_READ}
                        control={<Radio />}
                        label="Not Read"
                        style={{ marginRight: "20px" }}
                    />
                    <FormControlLabel
                        value={Status.READING}
                        control={<Radio />}
                        label="Reading"
                        style={{ marginRight: "20px" }}
                    />
                    <FormControlLabel
                        value={Status.READ}
                        control={<Radio />}
                        label="Read"
                    />
                </RadioGroup>
            </FormControl>
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
                >Save</Button>

                <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: "black" }}>
                            Are you sure you want to cancel adding a book?
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
            </StyledButton>
        </FormContainer>
    )
}

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
