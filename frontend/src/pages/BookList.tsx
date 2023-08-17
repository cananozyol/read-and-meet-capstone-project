import Grid from "@mui/material/Grid";
import BookCard from "../components/BookCard.tsx";
import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import AddButton from "../components/AddButton.tsx";


export default function BookList() {
    const { books, fetchBooks, userId } = useStore();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);


    const userBooks = books.filter((book) => book.userId === userId);

    return (
        <div className="div-bookList">
            <div className="book-summary-and-button">
                <div>
                    You have <b>{userBooks.length}</b> books {/* Anzahl der eigenen Bücher anzeigen */}
                </div>
                <div className="add-button-container">
                    <AddButton to="/addbook">Add Book</AddButton>
                </div>
            </div>
            <Grid container spacing={2}>
                {userBooks.map((book) => (
                    <Grid key={book.id} item xs={6} sm={6} md={6} lg={6}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
