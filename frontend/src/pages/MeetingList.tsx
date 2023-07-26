import Grid from '@mui/material/Grid';
import MeetingCard from '../components/MeetingCard.tsx';
import {useFetch} from "../hooks/useFetch.ts";
import {useEffect} from "react";
import {Meeting} from "../models/meeting.ts";

type Props = {
    meetings: Meeting[];
}
export default function MeetingList(props: Props) {

    const { meetings, fetchMeetings } = useFetch();

    useEffect(() => {fetchMeetings();}, [fetchMeetings]);

    return (
        <>
            <p>You have <b>{meetings.length}</b> meetings</p>
            <Grid container spacing={2}>
                {props.meetings.map(meeting => (
                    <Grid key={meeting.id} item xs={6} sm={6} md={6} lg={6}>
                        <MeetingCard meeting={meeting} key={meeting.id}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}


