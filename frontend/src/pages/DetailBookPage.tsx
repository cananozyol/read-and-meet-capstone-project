import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Rating,
    Typography
} from "@mui/material";
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooks} from '../hooks/useBooks';
import {BookEditData, Genre, Status} from "../models/books.ts";
import RatingHearts from "../components/RatingHearts.tsx";
import {styled} from "styled-components";
import GenreSelect from "../components/GenreSelect.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CardActionArea from "@mui/material/CardActionArea";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Check as CheckIcon, Close as CloseIcon} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function DetailBookPage() {
    const { id } = useParams();
    const book = useBooks((state) => state.getBookById(id));
    const navigate = useNavigate();
    const { deleteBook, putBook } = useBooks();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<BookEditData>({
        genre: book?.genre || Genre.NOT_SELECTED,
        status: book?.status || Status.NOT_READ,
        rating: book?.rating || 0,
    });

    if (!book) {
        return <div>Book not found.</div>;
    }

    const handleEdit = () => {
        setIsEditMode(true);
    };
    const handleSave = () => {
        if (id) {
            putBook(id, editedData);
            setIsEditMode(false);
        }
    };

    const handleDelete = () => {
        deleteBook(id);
        navigate('/booklist');
        toast.warning("You have deleted your book!", {
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

    const handleCancel = () => {
        setIsEditMode(false);
        setEditedData({
            genre: book.genre || Genre.NOT_SELECTED,
            status: book.status || Status.NOT_READ,
            rating: book.rating || 0,
        });
        toast.info("You successfully canceled editing the book!", {
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
    };

    const handleClickCancel = () => {
        setCancelDialogOpen(true);
    };

    const handleClickDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleCancelClose = () => {
        setCancelDialogOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };


    return (
        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="150"
                image="https://images.unsplash.com/photo-1534978184044-62700a717864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                alt="Book Cover"
                sx={{ maxWidth: "150px" }}
            /></CardActionArea>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {book.title}
                </Typography>
                <Typography variant="h6" component="h3">
                    by: {book.author}
                </Typography>


            {isEditMode ? (
                <>
                    <Typography variant="body1">Genre: </Typography>
                    <GenreSelect selectedGenre={editedData.genre}
                        onGenreChange={(e) => setEditedData({ ...editedData, genre: e.target.value as Genre })}
                    />
                    <Typography variant="body1">Status: </Typography>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup
                            name="status"
                            value={editedData.status}
                            onChange={(event) =>
                                setEditedData({ ...editedData, status: event.target.value as Status })
                            }
                        >
                            <FormControlLabel value={Status.NOT_READ} control={<Radio />} label="Not Read" />
                            <FormControlLabel value={Status.READING} control={<Radio />} label="Currently reading" />
                            <FormControlLabel value={Status.READ} control={<Radio />} label="Read" />
                        </RadioGroup>
                    </FormControl>
                        <Typography variant="body1">Rating: </Typography>
                        <Rating
                            name="model-rating"
                            value={editedData.rating}
                            onChange={(_, newValue) => setEditedData({ ...editedData, rating: newValue ?? undefined })}
                            icon={<FavoriteIcon style={{ color: "#d1adee" }} />}
                            emptyIcon={<FavoriteBorderIcon style={{ color: "#d1adee" }} />}
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
                            onClick={handleSave}
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
                    </StyledButton>
                    <Dialog
                        open={cancelDialogOpen}
                        keepMounted
                        onClose={handleClickCancel}
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
                                Are you sure you want to cancel editing your book?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button onClick={handleCancelClose} variant="outlined" sx={{ color: 'black', backgroundColor: '#d1adee' }}>No</Button>
                            <Button onClick={() => { handleCancel(); }} variant="outlined" sx={{ color: 'black', backgroundColor: '#d1adee' }}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                <>
                    <Typography variant="body1">Genre: {book.genre}</Typography>
                    <Typography variant="body1">Status: {book.status}</Typography>
                    <Typography variant="body1">Rating: <RatingHearts rating={book.rating} /></Typography>


                    <StyledButton>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<BorderColorIcon style={{ color: 'white' }} />}
                            onClick={handleEdit}
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
                            onClick={handleClickDelete}
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
                </>
            )}
                <Dialog
                    open={deleteDialogOpen}
                    keepMounted
                    onClose={handleDeleteClose}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
                            Are you sure you want to delete your book?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleDeleteClose} variant="outlined" sx={{ color: 'black', backgroundColor: '#d1adee' }}>No</Button>
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

