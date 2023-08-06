import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import MeetingList from "./pages/MeetingList.tsx";
import BookList from "./pages/BookList.tsx";
import {useMeetings} from "./hooks/useMeetings.ts";
import {styled} from "styled-components";
import HomePage from "./pages/HomePage.tsx";
import {Button} from "@mui/material";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useBooks} from "./hooks/useBooks.ts";
import AddBookPage from "./pages/AddBookPage.tsx";
import AddMeetingPage from "./pages/AddMeetingPage.tsx";
import EditMeetingPage from "./pages/EditMeetingPage.tsx";
import DetailMeetingPage from "./pages/DetailMeetingPage.tsx";
import DetailBookPage from "./pages/DetailBookPage.tsx";

export default function App() {
    const meetings = useMeetings((state) => state.meetings);
    const books = useBooks((state) => state.books);

    return (
        <main>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/meetinglist" element={<MeetingList meetings={meetings} />} />
                <Route path="/addmeeting" element={<AddMeetingPage />} />
                <Route path="/meeting/:id" element={<DetailMeetingPage />} />
                <Route path="/:id/editmeeting" element={<EditMeetingPage />} />
                <Route path="/booklist" element={<BookList books={books}/>} />
                <Route path="/addbook" element={<AddBookPage />} />
                <Route path="/book/:id" element={<DetailBookPage />} />
            </Routes>
            <StyledApp>
                <Link to={"/meetinglist"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: "#d1adee",
                            color: "black",
                            borderRadius: "5px",
                            width: "139px",
                        }}
                    >
                        MY MEETINGS
                    </Button>
                </Link>
                <Link to={"/addmeeting"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: "#d1adee",
                            color: "black",
                            borderRadius: "5px",
                            width: "139px",
                        }}
                    >
                        NEW MEETING
                    </Button>
                </Link>
            </StyledApp>
            <StyledApp>
                <Link to={"/booklist"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: "#d1adee",
                            color: "black",
                            borderRadius: "5px",
                            width: "139px",
                        }}
                    >
                        MY BOOKS
                    </Button>
                </Link>
                <Link to={"/addbook"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: "#d1adee",
                            color: "black",
                            borderRadius: "5px",
                            width: "139px",
                        }}
                    >
                        NEW BOOK
                    </Button>
                </Link>
            </StyledApp>
        </main>
    );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.1em;
  padding-top: 2em;
`;
