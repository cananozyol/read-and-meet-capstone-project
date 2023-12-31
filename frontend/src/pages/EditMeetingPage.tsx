import {useNavigate, useParams} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useStore} from "../hooks/useStore.ts";
import {showInfoToast, showSuccessToast} from "../components/ToastHelpers.tsx";


export default function EditMeetingPage() {
    const { id } = useParams();
    const { putMeeting, getMeetingById, fetchBooks, user } = useStore();
    const meeting = getMeetingById(id ?? "");
    const previousSelectedBookId = meeting?.book?.id;
    const navigate = useNavigate();
    const { books } = useStore();
    const bookExists = books.some(book => book.id === previousSelectedBookId);

    const [selectedBookId, setSelectedBookId] = useState<string | undefined>(
        bookExists ? previousSelectedBookId : ''
    );


    useEffect(() => {
        fetchBooks()
    }, [fetchBooks]);


    if (!meeting) {
        return <>No Meeting</>;
    }

    function handleSubmit(formData: MeetingWithoutId) {
        const selectedBook = books.find((book) => book.id === selectedBookId);
        const meetingWithBook = { ...formData, book: selectedBook };

        putMeeting({ ...meetingWithBook, id: id as string, userId: user.id });
        navigate(`/${id}`);
        showSuccessToast('Changes have been saved successfully!');
    }

    function handleCancel() {
        navigate(`/meeting/${meeting?.id}`);
        showInfoToast('You canceled editing your meeting!');
    }

    return (
        <InputFormMeetings
            title="Edit Meeting"
            initialFormData={{
                title: meeting.title || "",
                date: meeting.date || "",
                location: meeting.location || "",
            }}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            books={books}
            selectedBookId={selectedBookId}
            onBookSelect={(bookId) => setSelectedBookId(bookId)}
        />
    );
}
