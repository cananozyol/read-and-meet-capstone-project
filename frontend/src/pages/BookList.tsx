import Grid from "@mui/material/Grid";
import BookCard from "../components/BookCard.tsx";
import {useBooks} from "../hooks/useBooks.ts";
import {useEffect} from "react";
import {Book} from "../models/books.ts";

type Props = {
    books: Book[];
};

export default function BookList(props: Props) {
    const { books, fetchBooks } = useBooks();

    useEffect(fetchBooks, [fetchBooks]);

    return (
        <>
            <p>You have <b>{books.length}</b> books</p>
            <Grid container spacing={2}>
                {props.books.map((book) => (
                    <Grid key={book.id} item xs={6} sm={6} md={6} lg={6}>
                        <BookCard book={book} key={book.id} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
