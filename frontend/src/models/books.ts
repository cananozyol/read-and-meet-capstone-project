export type Book = {
    id: string;
    title: string;
    author: string;
    genre: Genre;
    status: Status;
    rating: number;
    userId: string;
}

export enum Genre {
    NOT_SELECTED = "NOT_SELECTED",
    CLASSIC = "CLASSIC",
    DRAMA = "DRAMA",
    ROMANCE = "ROMANCE",
    FANTASY = "FANTASY",
    SCIENCE_FICTION = "SCIENCE_FICTION",
    THRILLER = "THRILLER",
    BIOGRAPHY = "BIOGRAPHY",
    HORROR = "HORROR",
    NON_FICTION = "NON_FICTION",
    MYSTERY = "MYSTERY"
}

export enum Status {
    NOT_READ = "NOT_READ",
    READING = "READING",
    READ = "READ"
}

export type BookWithoutId = {
    title: string;
    author: string;
    genre: Genre;
    status: Status;
    rating: number;
    userId: string;
}

export type BookEditData = {
    status?: Status;
    rating?: number;
}
