import {create} from 'zustand';
import axios from 'axios';
import {Book, BookEditData, BookWithoutId} from '../models/books.ts';
import {Meeting, MeetingWithoutId} from '../models/meeting.ts';

type State = {
    books: Book[];
    meetings: Meeting[];
    fetchBooks: () => void;
    postBook: (requestBody: BookWithoutId) => void;
    getBookById: (id: string) => Book | undefined;
    deleteBook: (id: string) => void;
    putBook: (id: string, requestBody: BookEditData) => void;
    fetchMeetings: () => void;
    postMeeting: (requestBody: MeetingWithoutId) => void;
    getMeetingById: (id: string) => Meeting | undefined;
    deleteMeeting: (id: string) => void;
    putMeeting: (requestBody: Meeting) => void;
};

export const useStore = create<State>((set, get) => ({
    books: [],
    meetings: [],

    fetchBooks: () => {
        axios
            .get("/api/books")
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

    getBookById: (id: string) => {
        const { books } = get();
        return books.find((book) => book.id === id);
    },

    deleteBook: (id: string) => {
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

    fetchMeetings: () => {
        axios
            .get("/api/meetings")
            .then((response) => response.data)
            .then((data) => {
                set({ meetings: data });
            })
            .catch(console.error);
    },

    postMeeting: (requestBody: MeetingWithoutId) => {
        const { fetchMeetings } = get();
        axios
            .post("/api/meetings", requestBody)
            .then(fetchMeetings)
            .catch(console.error);
    },

    getMeetingById: (id: string) => {
        const { meetings } = get();
        return meetings.find((meeting) => meeting.id === id);
    },

    deleteMeeting: (id: string) => {
        axios
            .delete(`/api/meetings/${id}`)
            .then(() => {
                set((state) => ({ meetings: state.meetings.filter((meeting) => meeting.id !== id) }));
            })
            .catch(console.error);
    },

    putMeeting: (requestBody: Meeting) => {
        const { id, ...meetingWithoutId } = requestBody;
        axios
            .put(`/api/meetings/${id}`, meetingWithoutId)
            .then((response) => response.data)
            .then((updatedMeeting) => {
                set((state) => ({
                    meetings: state.meetings.map((meeting) =>
                        meeting.id === id ? { ...updatedMeeting, id } : meeting
                    ),
                }));
            })
            .catch(console.error);
    },

}));

