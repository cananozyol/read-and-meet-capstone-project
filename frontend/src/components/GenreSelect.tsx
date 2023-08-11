import {Genre} from '../models/books.ts';
import {FormControl, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";

type Props = {
    selectedGenre: Genre | undefined;
    onGenreChange: (event: SelectChangeEvent<Genre>) => void;
};


const genreOptions = [
    { value: Genre.NOT_SELECTED, label: "Not Selected" },
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

export default function GenreSelect({ selectedGenre, onGenreChange }: Props) {
    return (
        <FormControl style={{ marginBottom: "10px", width: "300" }}>
            <Select
                value={selectedGenre ?? Genre.NOT_SELECTED}
                onChange={onGenreChange}
                displayEmpty
                inputProps={{ "aria-label": "Select Genre" }}
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
                            {option.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}