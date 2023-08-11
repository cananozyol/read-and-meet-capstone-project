import {useNavigate, useParams} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useStore} from "../hooks/useStore.ts";


export default function EditMeetingPage() {
    const { id } = useParams();
    const { putMeeting, getMeetingById, getBooksForMeeting } = useStore();
    const meeting = getMeetingById(id!);
    const navigate = useNavigate();
    const { books } = useStore();
    const [selectedBookId, setSelectedBookId] = useState<string | undefined>(meeting?.book?.id ?? '');

    useEffect(() => {
        if (id) {
            getBooksForMeeting(id).then(() => books);}
    }, [getBooksForMeeting, id, books]);


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
        navigate(`/meeting/${meeting?.id}`);
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
