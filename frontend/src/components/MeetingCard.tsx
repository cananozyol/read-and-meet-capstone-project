import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Meeting} from "../models/meeting.ts";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type Props = {
    meeting: Meeting;
};

export default function MeetingCard({ meeting }: Props) {
    const navigate = useNavigate();
    const { title, date, location, book } = meeting;
    const theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ width: "100%", height: "100%" }}>
                <CardActionArea onClick={() => navigate(`/${meeting.id}`)}>
                    <CardContent>
                        <Typography variant="body1">{title}</Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            <EventIcon fontSize="small" sx={{ marginRight: "4px" }} />
                            Date: {new Date(date).toLocaleDateString("de-DE")}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                            <LocationOnIcon fontSize="small" sx={{ marginRight: "4px" }} />
                            Location: {location}
                        </Typography>
                        {/* Display Book Title and Author */}
                        <Typography variant="body2">
                            Book: {book?.title} by {book?.author}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    );
}

