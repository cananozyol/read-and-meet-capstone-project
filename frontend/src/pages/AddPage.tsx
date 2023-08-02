import {useFetch} from "../hooks/useFetch.ts";
import {MeetingWithoutId} from "../models/meeting.ts";
import {useNavigate} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";


export default function AddPage() {
    const postMeeting = useFetch((state) => state.postMeeting);
    const navigate = useNavigate();

    function handleSubmit(formData: MeetingWithoutId) {
        postMeeting(formData);
        navigate("/meetinglist");
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
