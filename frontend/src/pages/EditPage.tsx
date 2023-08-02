import {useFetch} from "../hooks/useFetch.ts";
import {useNavigate, useParams} from "react-router-dom";
import InputFormMeetings from "../components/InputFormMeetings.tsx";
import {toast} from "react-toastify";

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
        toast("You have successfully edited your meeting!", {
            position: "top-left",
            autoClose: 3000,
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
            onCancel={() => navigate(`/${id}`)}
            onSubmit={handleSubmit}
        />
    );
}

type MeetingWithoutId = {
    title: string;
    date: string;
    location: string;
};
