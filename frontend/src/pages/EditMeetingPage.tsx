import {useNavigate, useParams} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useMeetings} from "../hooks/useMeetings.ts";
import {useBooks} from "../hooks/useBooks.ts";
import {useEffect, useState} from "react";
import {MeetingWithoutId} from "../models/meeting.ts";


export default function EditMeetingPage() {
    const { id } = useParams();
    const { putMeeting, getMeetingById } = useMeetings();
    const meeting = getMeetingById(id);
    const navigate = useNavigate();
    const { books, fetchBooks } = useBooks();
    const [selectedBookId, setSelectedBookId] = useState<string | undefined>(meeting?.book?.id);

    useEffect(() => {fetchBooks();
    }, [fetchBooks]);

    if (!meeting) {
        return <>No Meeting</>;
    }

    function handleSubmit(formData: MeetingWithoutId) {
        const selectedBook = books.find((book) => book.id === selectedBookId);
        const meetingWithBook = { ...formData, book: selectedBook };

        putMeeting({ ...meetingWithBook, id: id as string });
        navigate(`/${id}`);
        toast.success("You have successfully edited your meeting!", {
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
        navigate(`/${id}`);
        toast.info("You successfully canceled editing the meeting!", {
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
