import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import MeetingCard from "../components/MeetingCard.tsx";
import BookCard from "../components/BookCard.tsx";
import {useNavigate} from "react-router-dom";
import {isAfter, parseISO} from "date-fns";
import {Status} from "../models/books.ts";

export default function HomePage() {
    const { meetings, fetchMeetings } = useStore();
    const { books, fetchBooks } = useStore();
    const { userId } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeetings();
        fetchBooks();
    }, [fetchMeetings, fetchBooks]);

    const upcomingUserMeetings = meetings
        .filter((meeting) => meeting.userId === userId)
        .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

    const readingBook = books.find((book) => book.userId === userId && book.status === Status.READING);

    const currentMeeting = upcomingUserMeetings.find((meeting) => isAfter(new Date(), parseISO(meeting.date)));


    return (
        <div>
            <h3>Things to Look Forward To 💜</h3>
            <p></p>
            {currentMeeting && (
                <div>
                    <p><u><strong><em>Your Upcoming Meeting</em></strong></u></p>
                    <MeetingCard meeting={currentMeeting} />
                </div>
            )}

            {readingBook && (
                <div>
                    <p><u><strong><em>A Book You're Currently Reading</em></strong></u></p>
                    <BookCard book={readingBook} />
                </div>
            )}
            <p></p>
            <button type={"button"} onClick={() => navigate("/register")}>Register</button>
            <p></p>
            <button type={"button"} onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}