import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {useStore} from "../hooks/useStore.ts";

export default function AddMeetingPage() {
    const postMeeting = useStore((state) => state.postMeeting);
    const navigate = useNavigate();
    const { books, fetchBooks } = useStore();
    const [selectedBookId, setSelectedBookId] = useState<string | undefined>("");

    useEffect(() => {fetchBooks();
    }, [fetchBooks]);

    function handleSubmit(formData: MeetingWithoutId) {
        const selectedBook = books.find((book) => book.id === selectedBookId);
        const meetingWithBook = { ...formData, book: selectedBook };
        postMeeting(meetingWithBook);
        navigate("/meetinglist");
        toast.success('You have successfully added your new meeting!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <button>x</button>,
            style: { background: '#b2dfdb', color: "black" },
        });
    }

    function handleCancel() {
        navigate("/meetinglist");
        toast.info('You canceled adding a new meeting!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <button>x</button>,
            style: { background: '#bbdefb', color: "black" },
        });
    }

    return (
        <InputFormMeetings
            title="Add Meeting"
            initialFormData={{ title: "", date: "", location: "" }}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            books={books}
            selectedBookId={selectedBookId}
            onBookSelect={(bookId) => setSelectedBookId(bookId)}
        />
    );
}
