import Grid from "@mui/material/Grid";
import BookCard from "../components/BookCard.tsx";
import {useEffect} from "react";
import {Book} from "../models/books.ts";
import {useStore} from "../hooks/useStore.ts";

type Props = {
    books: Book[];
};

export default function BookList(props: Props) {
    const { books, fetchBooks } = useStore();

    useEffect(fetchBooks, [fetchBooks]);

    return (
        <>
            <p>You have <b>{books.length}</b> books</p>
            <div className="div-bookList">
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
