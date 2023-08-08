import {Genre} from '../models/books.ts';
import {ChangeEvent} from "react";

type Props = {
    selectedGenre: Genre | undefined;
    onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function GenreSelect({ selectedGenre, onGenreChange }: Props) {
    return (
        <select name="genre" value={selectedGenre || Genre.NOT_SELECTED} onChange={onGenreChange} required>
            <option value={Genre.NOT_SELECTED}>Not Selected</option>
            <option value={Genre.CLASSIC}>Classic</option>
            <option value={Genre.DRAMA}>Drama</option>
            <option value={Genre.ROMANCE}>Romance</option>
            <option value={Genre.FANTASY}>Fantasy</option>
            <option value={Genre.SCIENCE_FICTION}>Science Fiction</option>
            <option value={Genre.THRILLER}>Thriller</option>
            <option value={Genre.BIOGRAPHY}>Biography</option>
            <option value={Genre.HORROR}>Horror</option>
            <option value={Genre.NON_FICTION}>Non-Fiction</option>
            <option value={Genre.MYSTERY}>Mystery</option>
        </select>
    );
}
