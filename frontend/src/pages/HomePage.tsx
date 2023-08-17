import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import MeetingCard from "../components/MeetingCard.tsx";
import BookCard from "../components/BookCard.tsx";
import {useNavigate} from "react-router-dom";
import {Status} from "../models/books.ts";
import {isAfter, parseISO} from "date-fns";

export default function HomePage() {
    const { meetings, fetchMeetings, books, fetchBooks, user } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeetings();
        fetchBooks();
    }, [fetchMeetings, fetchBooks]);

    const readingBook = books.find((book) => book.userId === user.id && book.status === Status.READING);
    const upcomingMeeting = meetings
        .filter((meeting) => isAfter(parseISO(meeting.date), Date.now()) && meeting.userId === user.id)
        .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())[0];


    return (
        <div>
            <h3>Here's what's happening for you:</h3>
            <p></p>
            {upcomingMeeting && (
                <div>
                    <p><u><strong><em>Your Upcoming Meeting</em></strong></u></p>
                    <MeetingCard meeting={upcomingMeeting} />
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
            <p></p>
        </div>
    );
}