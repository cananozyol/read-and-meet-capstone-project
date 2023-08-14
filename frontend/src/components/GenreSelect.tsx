import {Genre} from '../models/books.ts';
import {FormControl, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";

type Props = {
    selectedGenre: Genre | undefined;
    onGenreChange: (event: SelectChangeEvent<Genre>) => void;
};


const genreOptions = [
    { value: '', label: 'No Genre Selected' },
    { value: Genre.CLASSIC, label: "Classic" },
    { value: Genre.DRAMA, label: "Drama" },
    { value: Genre.ROMANCE, label: "Romance" },
    { value: Genre.FANTASY, label: "Fantasy" },
    { value: Genre.SCIENCE_FICTION, label: "Science Fiction" },
    { value: Genre.THRILLER, label: "Thriller" },
    { value: Genre.BIOGRAPHY, label: "Biography" },
    { value: Genre.HORROR, label: "Horror" },
    { value: Genre.NON_FICTION, label: "Non-Fiction" },
    { value: Genre.MYSTERY, label: "Mystery" },
];

export function getGenreDisplay(genre: string | Genre): string {
    switch (genre) {
        case Genre.CLASSIC:
            return "Classic";
        case Genre.DRAMA:
            return "Drama";
        case Genre.ROMANCE:
            return "Romance";
        case Genre.FANTASY:
            return "Fantasy";
        case Genre.SCIENCE_FICTION:
            return "Science Fiction";
        case Genre.THRILLER:
            return "Thriller";
        case Genre.BIOGRAPHY:
            return "Biography";
        case Genre.HORROR:
            return "Horror";
        case Genre.NON_FICTION:
            return "Non-Fiction";
        case Genre.MYSTERY:
            return "Mystery";
        default:
            return "";
    }
}

export default function GenreSelect({ selectedGenre, onGenreChange }: Props) {
    return (
        <FormControl style={{ marginBottom: "10px", width: "300" }}>
            <Select
                value={selectedGenre ?? Genre.NOT_SELECTED}
                onChange={onGenreChange}
                displayEmpty
                inputProps={{ "aria-label": "Select Genre" }}
                color="secondary"
            >
                <MenuItem value="" disabled>
                    <Typography variant="body1" style={{ fontSize: "13px" }}>
                        Select Genre
                    </Typography>
                </MenuItem>
                {genreOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}
                              style={{ paddingTop: '5px', paddingBottom: '5px' }}
                    >
                        <Typography variant="body1" style={{ fontSize: "13px" }}>
                            {getGenreDisplay(option.value)}
                        </Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}