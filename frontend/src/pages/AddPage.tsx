import {useFetch} from "../hooks/useFetch.ts";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";

export default function AddPage() {
    const postMeeting = useFetch((state) => state.postMeeting);
    const navigate = useNavigate();

    function handleSubmit(formData: MeetingWithoutId) {
        postMeeting(formData);
        navigate("/meetinglist");
        toast("You have successfully added your new meeting!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <InputFormMeetings
            title="Add Meeting"
            initialFormData={{ title: "", date: "", location: "" }}
            onCancel={() => navigate("/meetinglist")}
            onSubmit={handleSubmit}
        />
    );
}
