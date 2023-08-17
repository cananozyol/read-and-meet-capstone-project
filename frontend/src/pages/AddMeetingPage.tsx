import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {useStore} from "../hooks/useStore.ts";
import {showInfoToast, showSuccessToast} from "../components/ToastHelpers.tsx";

export default function AddMeetingPage() {
    const postMeeting = useStore((state) => state.postMeeting);
    const navigate = useNavigate();
    const { books, fetchBooks, userId } = useStore();
    const [selectedBookId, setSelectedBookId] = useState<string | undefined>("");

    useEffect(() => {fetchBooks();
    }, [fetchBooks]);

    function handleSubmit(formData: MeetingWithoutId) {
        const selectedBook = books.find((book) => book.id === selectedBookId);
        const meetingWithBook = { ...formData, book: selectedBook };
        postMeeting(meetingWithBook);
        navigate("/meetinglist");
        showSuccessToast(`You added your new meeting!`);
    }

    function handleCancel() {
        navigate("/meetinglist");
        showInfoToast('You canceled adding a new meeting!');
    }

    return (
        <InputFormMeetings
            title="Add Meeting"
            initialFormData={{ title: "", date: "", location: "", userId: userId }}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            books={books}
            selectedBookId={selectedBookId}
            onBookSelect={(bookId) => setSelectedBookId(bookId)}
        />
    );
}
