export type Book = {
    id: string;
    title: string;
    author: string;
    genre: Genre;
    status: Status;
    rating: number;
}

export enum Genre {
    NOT_SELECTED = "NOT_SELECTED",
    CLASSIC = "CLASSIC",
    FANTASY = "FANTASY",
    MYSTERY = "MYSTERY",
    ROMANCE = "ROMANCE",
    SCIENCE_FICTION = "SCIENCE_FICTION",
    THRILLER = "THRILLER",
    HORROR = "HORROR",
    NON_FICTION = "NON_FICTION",
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
}

export type BookEditData = {
    genre?: Genre;
    status?: Status;
    rating?: number;
}
