import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Rating,
    Typography
} from "@mui/material";
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BookEditData, Status} from "../models/books.ts";
import RatingHearts from "../components/RatingHearts.tsx";
import {styled} from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import CardActionArea from "@mui/material/CardActionArea";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Check as CheckIcon, Close as CloseIcon} from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useStore} from "../hooks/useStore.ts";
import {showInfoToast, showSuccessToast, showWarningToast} from "../components/ToastHelpers.tsx";
import ButtonStyle from "../components/ButtonStyle.tsx";
import StatusSelect from "../components/StatusSelect.tsx";


export default function DetailBookPage() {
    const { id } = useParams();
    const book = useStore((state) => state.getBookById(id || ""));
    const navigate = useNavigate();
    const { deleteBook, putBook } = useStore();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<BookEditData>({
        status: book?.status ?? Status.NOT_READ,
        rating: book?.rating ?? 0,
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
            showSuccessToast('Changes have been saved successfully!');
        }
    };

    const handleDelete = () => {
        deleteBook(id || "");
        navigate('/booklist');
        showWarningToast('You have deleted your book!');
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setCancelDialogOpen(false);
        setEditedData({
            status: book.status || Status.NOT_READ,
            rating: book.rating || 0,
        });
        showInfoToast('You canceled editing your book!');
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
        <Card>
            <div style={{ display: "flex" }}>
                <CardActionArea
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CardMedia
                        component="img"
                        height={228}
                        width={170}
                        image="https://images.unsplash.com/photo-1534978184044-62700a717864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                        alt="Book Cover"
                        style={{ margin: "8px" }} // Set the desired margin
                    />
                </CardActionArea>
                <CardContent
                    style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        by: {book.author}
                    </Typography>
                    <Typography variant="body1">
                        Genre: {book.genre}
                    </Typography>
                </CardContent>
            </div>
            <CardContent>

            {isEditMode ? (
                <>
                    <Typography variant="body1">Status: </Typography>
                    <StatusSelect selectedStatus={editedData.status || Status.NOT_READ} onStatusChange={(event) => setEditedData({ ...editedData, status: event.target.value as Status })} />

                        <Typography variant="body1">Rating: </Typography>
                        <Rating
                            name="model-rating"
                            value={editedData.rating}
                            onChange={(_, newValue) => setEditedData({ ...editedData, rating: newValue ?? undefined })}
                            icon={<FavoriteIcon style={{ color: "#d1adee" }} />}
                            emptyIcon={<FavoriteBorderIcon style={{ color: "#d1adee" }} />}
                        />
                    <StyledButton>
                        <ButtonStyle onClick={handleClickCancel} startIcon={CloseIcon}>
                            Cancel
                        </ButtonStyle>
                        <ButtonStyle onClick={handleSave} startIcon={CheckIcon}>
                            Save
                        </ButtonStyle>
                    </StyledButton>
                    <Dialog
                        open={cancelDialogOpen}
                        keepMounted
                        onClose={handleCancelClose}
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

                    <Typography variant="body1">Status: {book.status}</Typography>
                    <Typography variant="body1">Rating: <RatingHearts rating={book.rating} /></Typography>


                    <StyledButton>
                        <ButtonStyle onClick={handleEdit} startIcon={BorderColorIcon}>
                            EDIT
                        </ButtonStyle>
                        <ButtonStyle onClick={handleClickDelete} startIcon={DeleteForeverIcon}>
                            Delete
                        </ButtonStyle>
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

