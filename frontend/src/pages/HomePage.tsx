import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import MeetingCard from "../components/MeetingCard.tsx";
import BookCard from "../components/BookCard.tsx";
import LogoutButton from "../components/LogoutButton.tsx";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const { meetings, fetchMeetings } = useStore();
    const { books, fetchBooks } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeetings();
        fetchBooks();
    }, [fetchMeetings, fetchBooks]);

    const upcomingMeeting = meetings.length > 0 ? meetings[0] : null;
    const currentBook = books.length > 0 ? books[0] : null;

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

            {currentBook && (
                <div>
                    <p><u><strong><em>The Book You're Currently Reading</em></strong></u></p>
                    <BookCard book={currentBook} />
                </div>
            )}
            <p></p>
            <button type={"button"} onClick={() => navigate("/register")}>Register</button>
            <p></p>
            <button type={"button"} onClick={() => navigate("/login")}>Login</button>
            <p></p>
            <LogoutButton/>
        </div>
    );
}
