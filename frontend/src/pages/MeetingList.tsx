import Grid from '@mui/material/Grid';
import MeetingCard from '../components/MeetingCard.tsx';
import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import AddButton from "../components/AddButton.tsx";


export default function MeetingList() {

    const { meetings, fetchMeetings, userId } = useStore();

    useEffect(() => {
        fetchMeetings();
    }, [fetchMeetings]);

    const userMeetings = meetings.filter((meeting) => meeting.userId === userId);

    return (
        <div className="div-meetingList">
            <div className="meeting-summary-and-button">
                <div>
                    You have <b>{userMeetings.length}</b> meetings
                </div>
                <div className="add-button-container">
                    <AddButton to="/addmeeting">Add Meeting</AddButton>
                </div>
            </div>
            <Grid container spacing={2}>
                {userMeetings.map((meeting) => (
                    <Grid key={meeting.id} item xs={6} sm={6} md={6} lg={6}>
                        <MeetingCard meeting={meeting} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
