import {useBooks} from "../hooks/useBooks.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Genre, Status} from "../models/books.ts";
import {styled} from "styled-components";


export default function AddBookPage() {

    const navigate = useNavigate();
    const { postBook } = useBooks();

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

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const genre = event.target.value as Genre;
        setFormData((prevData) => ({ ...prevData, genre }));
    };

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.target.value as Status;
        setFormData((prevData) => ({ ...prevData, status }));
    };

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rating = parseInt(event.target.value);
        setFormData((prevData) => ({ ...prevData, rating }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postBook(formData);
        navigate("/booklist");
    };


    return (
        <FormContainer onSubmit={handleSubmit}>
            <h1>Add Book</h1>

            <input
                type="text"
                id="book-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter the book title"
            />
            <p></p>

            <input
                type="text"
                id="book-author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter the author's name"
            />
            <p></p>
            <label htmlFor="book-genre">Genre: </label>
            <select
                id="book-genre"
                name="genre"
                value={formData.genre}
                onChange={handleGenreChange}
                required
            >
                <option value={Genre.NOT_SELECTED}>Select</option>
                <option value={Genre.CLASSIC}>Classic</option>
                <option value={Genre.FANTASY}>Fantasy</option>
                <option value={Genre.MYSTERY}>Mystery</option>
                <option value={Genre.ROMANCE}>Romance</option>
                <option value={Genre.SCIENCE_FICTION}>Science Fiction</option>
                <option value={Genre.THRILLER}>Thriller</option>
                <option value={Genre.HORROR}>Horror</option>
                <option value={Genre.NON_FICTION}>Non-Fiction</option>
            </select>
            <p></p>
            <label>Status: </label>
            <div>
                <label>
                    <input
                        type="radio"
                        name="status"
                        value={Status.NOT_READ}
                        checked={formData.status === Status.NOT_READ}
                        onChange={handleStatusChange}
                    />
                    Not Read
                </label>
                <label>
                    <input
                        type="radio"
                        name="status"
                        value={Status.READING}
                        checked={formData.status === Status.READING}
                        onChange={handleStatusChange}
                    />
                    Reading
                </label>
                <label>
                    <input
                        type="radio"
                        name="status"
                        value={Status.READ}
                        checked={formData.status === Status.READ}
                        onChange={handleStatusChange}
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
                            checked={formData.rating === rating}
                            onChange={handleRatingChange}
                        />
                        {rating}
                    </label>
                ))}
            </div>
            <p></p>
            <div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type={"submit"}>Add</button>
                <button onClick={() => navigate('/booklist')}>Cancel</button>
                </div>
            </div>
        </FormContainer>
    )
}


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
