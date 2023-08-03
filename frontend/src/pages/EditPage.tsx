import {useFetch} from "../hooks/useFetch.ts";
import {useNavigate, useParams} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type MeetingWithoutId = {
    title: string;
    date: string;
    location: string;
}

export default function EditPage() {
    const { id } = useParams();
    const { putMeeting, getMeetingById } = useFetch();
    const meeting = getMeetingById(id);
    const navigate = useNavigate();

    if (!meeting) {
        return <>No Meeting</>;
    }

    function handleSubmit(formData: MeetingWithoutId) {
        putMeeting({ ...formData, id: id as string });
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
        />
    );
}
