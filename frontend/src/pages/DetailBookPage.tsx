import {useParams} from 'react-router-dom';
import {useBooks} from '../hooks/useBooks';


export default function DetailBookPage()  {

    const { id } = useParams();
    const book = useBooks((state) => state.getBookById(id));

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Status: {book.status}</p>
            <p>Rating: {book.rating}</p>
        </div>
    );
}

