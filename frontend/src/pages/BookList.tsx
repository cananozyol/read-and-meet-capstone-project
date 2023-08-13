import Grid from "@mui/material/Grid";
import BookCard from "../components/BookCard.tsx";
import {useEffect} from "react";
import {Book} from "../models/books.ts";
import {useStore} from "../hooks/useStore.ts";
import AddButton from "../components/AddButton.tsx";

type Props = {
    books: Book[];
};

export default function BookList(props: Props) {
    const { books, fetchBooks } = useStore();

    useEffect(fetchBooks, [fetchBooks]);

    return (
        <>
            <div className="div-bookList">
                <div className="book-summary-and-button">
                    <div>
                        You have <b>{books.length}</b> books
                    </div>
                    <div className="add-button-container">
                        <AddButton to="/addbook">Add Book</AddButton>
                    </div>
                </div>
            <Grid container spacing={2}>
                {props.books.map((book) => (
                    <Grid key={book.id} item xs={6} sm={6} md={6} lg={6}>
                        <BookCard book={book} key={book.id} />
                    </Grid>
                ))}
            </Grid>
            </div>
        </>
    );
}
