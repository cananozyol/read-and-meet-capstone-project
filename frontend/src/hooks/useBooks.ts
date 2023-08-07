import {Book, BookEditData, BookWithoutId} from "../models/books.ts";
import {create} from "zustand";
import axios from "axios";

type State = {
    books: Book[];
    fetchBooks: () => void;
    postBook: (requestBody: BookWithoutId) => void;
    getBookById: (id: string | undefined) => Book | undefined;
    deleteBook: (id: string | undefined) => void;
    putBook: (id: string, requestBody: BookEditData) => void;
};

export const useBooks = create<State>((set, get) => ({
    books: [],

    fetchBooks: () => {
        axios
            .get("api/books")
            .then((response) => response.data)
            .then((data) => {
                set({ books: data });
            })
            .catch(console.error);
    },

    postBook: (requestBody: BookWithoutId) => {
        const { fetchBooks } = get();
        axios
            .post("/api/books", requestBody)
            .then(fetchBooks)
            .catch(console.error);
    },

    getBookById: (id: string | undefined) => {
        if (!id) {
            throw new Error("No id provided");
        }

        const { books } = get();
        return books.find((book) => book.id === id);
    },

    deleteBook: (id: string | undefined) => {
        if (!id) {
            throw new Error("No id provided");
        }

        axios
            .delete(`/api/books/${id}`)
            .then(() => {
                set((state) => ({ books: state.books.filter((book) => book.id !== id) }));
            })
            .catch(console.error);
    },

    putBook: (id: string, requestBody: BookEditData) => {
        axios
            .put(`/api/books/${id}`, requestBody)
            .then((response) => response.data)
            .then((updatedBook) => {
                set((state) => ({
                    books: state.books.map((book) => (book.id === id ? { ...updatedBook, id } : book)),
                }));
            })
            .catch(console.error);
    },
}));
