import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Meeting} from "../models/meeting.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';

type Props = {
    meeting: Meeting;
}

export default function MeetingCard(props: Props) {

    const { title, date, location } = props.meeting;
    const theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ width: '100%', height: '100%' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="body1">
                            {title}
                        </Typography>
                        <p></p>
                        <Typography variant="body2">
                            🗓️ Date: {new Date(date).toLocaleDateString("de-DE")}
                        </Typography>
                        <p></p>
                        <Typography variant="body2">
                            📍Location: {location}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    );
}
