import Grid from '@mui/material/Grid';
import MeetingCard from '../components/MeetingCard.tsx';
import {useEffect} from "react";
import {Meeting} from "../models/meeting.ts";
import {useStore} from "../hooks/useStore.ts";
import AddButton from "../components/AddButton.tsx";

type Props = {
    meetings: Meeting[];
}
export default function MeetingList(props: Props) {

    const { meetings, fetchMeetings } = useStore();

    useEffect(() => {fetchMeetings();}, [fetchMeetings]);

    return (
        <>
            <div className="div-meetingList">
                <div className="meeting-summary-and-button">
                    <div>
                        You have <b>{meetings.length}</b> meetings
                    </div>
                    <div className="add-button-container">
                        <AddButton to="/addmeeting">Add Meeting</AddButton>
                    </div>
                </div>
                <Grid container spacing={2}>
                    {props.meetings.map(meeting => (
                        <Grid key={meeting.id} item xs={6} sm={6} md={6} lg={6}>
                            <MeetingCard meeting={meeting} key={meeting.id} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
}
