import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooks} from '../hooks/useBooks';
import {BookEditData, Genre, Status} from "../models/books.ts";
import RatingStars from "../components/RatingStars.tsx";
import {styled} from "styled-components";
import GenreSelect from "../components/GenreSelect.tsx";

export default function DetailBookPage() {
    const { id } = useParams();
    const book = useBooks((state) => state.getBookById(id));
    const navigate = useNavigate();
    const { deleteBook, putBook } = useBooks();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<BookEditData>({
        genre: book?.genre || Genre.NOT_SELECTED,
        status: book?.status || Status.NOT_READ,
        rating: book?.rating || 0,
    });

    if (!book) {
        return <div>Book not found.</div>;
    }

    const handleDelete = () => {
        deleteBook(id);
        navigate('/booklist');
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        if (id) {
            putBook(id, editedData);
            setIsEditMode(false);
        }
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setEditedData({
            genre: book.genre || Genre.NOT_SELECTED,
            status: book.status || Status.NOT_READ,
            rating: book.rating || 0,
        });
    };

    return (
        <Container>
            <h1>{book.title}</h1>
            <h3>by: {book.author}</h3>

            {isEditMode ? (
                <>
                    <label>Genre: </label>
                    <GenreSelect selectedGenre={editedData.genre}
                        onGenreChange={(e) => setEditedData({ ...editedData, genre: e.target.value as Genre })}
                    />
                    <p></p>

                    <label>Status: </label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value={Status.NOT_READ}
                                checked={editedData.status === Status.NOT_READ}
                                onChange={() => setEditedData({ ...editedData, status: Status.NOT_READ })}
                            />
                            Not Read
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value={Status.READING}
                                checked={editedData.status === Status.READING}
                                onChange={() => setEditedData({ ...editedData, status: Status.READING })}
                            />
                            Currently reading
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value={Status.READ}
                                checked={editedData.status === Status.READ}
                                onChange={() => setEditedData({ ...editedData, status: Status.READ })}
                            />
                            Read
                        </label>
                    </div>
                    <p></p>
                    <label>Rating: </label>
                    <div>
                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    checked={editedData.rating === rating}
                                    onChange={() => setEditedData({ ...editedData, rating })}
                                />
                                {rating}
                            </label>
                        ))}
                    </div>
                    <p></p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>Genre: {book.genre}</p>
                    <p>Status: {book.status}</p>
                    <p>Rating: <RatingStars rating={book.rating} /></p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </Container>
    );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
