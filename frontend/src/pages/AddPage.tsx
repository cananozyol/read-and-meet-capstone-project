import {useFetch} from "../hooks/useFetch.ts";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddPage() {
    const postMeeting = useFetch((state) => state.postMeeting);
    const navigate = useNavigate();

    function handleSubmit(formData: MeetingWithoutId) {
        postMeeting(formData);
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
        />
    );
}
