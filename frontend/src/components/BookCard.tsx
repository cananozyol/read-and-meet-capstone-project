import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Book} from "../models/books.ts";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RatingStars from "./RatingHearts.tsx";
import {getGenreDisplay} from "./GenreSelect.tsx";
import {getStatusDisplay} from "./StatusSelect.tsx";

type Props = {
    book: Book;
};

export default function BookCard({ book }: Props) {
    const navigate = useNavigate();
    const { title, author, genre, status, rating } = book;
    const theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ width: "100%", height: "100%" }}>
                <CardActionArea onClick={() => navigate(`/book/${book.id}`)}>
                    <CardContent>
                        <Typography variant="body1">
                            <LibraryBooksIcon fontSize="small" sx={{ marginRight: "4px" }} />
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            Author: {author}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            Genre: {getGenreDisplay(genre)}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            Status: {getStatusDisplay(status)}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            Rating: <RatingStars rating={rating} />
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    );
}
