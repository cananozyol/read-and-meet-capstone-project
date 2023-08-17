import {create} from 'zustand';
import axios from 'axios';
import {Book, BookEditData, BookWithoutId} from '../models/books.ts';
import {Meeting, MeetingWithoutId} from '../models/meeting.ts';
import {NavigateFunction} from "react-router-dom";

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
    fetchBookCover: (title: string, author: string) => void;
    bookCoverUrl: string;
    username: string;
    me: () => void;
    login: (username: string, password: string, navigate: NavigateFunction) => void;
    register: (username: string, password: string, repeatedPassword: string, navigate: NavigateFunction) => void;
    logout: (navigate: NavigateFunction) => void;
    userId: string;
}

export const useStore = create<State>((set, get) => ({
    books: [],
    meetings: [],
    bookCoverUrl: "",
    username: "",
    userId: "",

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
        const { fetchBooks, userId } = get();
        const newBook = { ...requestBody, userId };
        axios
            .post("/api/books", newBook)
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
        const { fetchMeetings, userId } = get();
        const newMeeting = { ...requestBody, userId };
        axios
            .post("/api/meetings", newMeeting)
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

    fetchBookCover: (title: string, author: string): Promise<string> => {
        const formattedTitle = title.trim().replace(/ /g, '+');
        const formattedAuthor = author.trim().replace(/ /g, '+');
        const apiUrl = `/api/bookcover?title=${formattedTitle}&author=${formattedAuthor}`;

        return axios.get(apiUrl)
            .then((response) => {
                const coverUrl = response.data.coverUrl;
                set({ bookCoverUrl: coverUrl });
                return coverUrl;
            })
            .catch(error => {
                console.error('Error fetching book cover:', error);
                throw error;
            });
    },

    me: () => {
        axios.get("/api/users/me")
            .then(response => {
                set({ username: response.data.username, userId: response.data.id });
            });
    },

    login: (username: string, password: string, navigate: NavigateFunction) => {
        axios.post("/api/users/login", null, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(response => {
                set({ username: response.data, userId: response.data.id })
                navigate("/")
            })
            .catch((error) => {
                console.error(error);
                throw new Error("Login failed");
            });
    },

    register: (username: string, password: string, repeatedPassword: string, navigate: NavigateFunction) => {
        const newUserData = {
            "username": `${username}`,
            "password": `${password}`
        }

        if (password === repeatedPassword) {
            axios.post("/api/users/register", newUserData)
                .then(response => {
                    set({ username: response.data.username, userId: response.data.id });
                    navigate("/login");
                })
                .catch((error) => {
                    console.error(error);
                    throw new Error("Registration failed");
                });
        }
    },

    logout: (navigate: NavigateFunction) => {
        axios.post("/api/users/logout")
            .catch(console.error)
            .then(() => set({ username: "" }))
            .then(() => navigate("/login"))
    },

}));

