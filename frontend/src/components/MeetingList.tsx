import {useEffect, useState} from 'react';
import axios from 'axios';
import {Meeting} from "../models.ts";
import Grid from '@mui/material/Grid';
import MeetingCard from './MeetingCard';

export default function MeetingList() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        axios.get('/api/meetings')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setMeetings(data))
    }, []);


    return (
        <>
            <p>You have <b>{meetings.length}</b> meetings</p>
            <Grid container spacing={2}>
                {meetings.map(meeting => (
                    <Grid key={meeting.id} item xs={6} sm={6} md={6} lg={6}>
                        <MeetingCard meeting={meeting} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
