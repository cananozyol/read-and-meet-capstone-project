import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import MeetingList from "./pages/MeetingList.tsx";
import AddPage from "./pages/AddPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import EditPage from "./pages/EditPage.tsx";
import BookList from "./pages/BookList.tsx"; // Import the BookList component
import {useMeetings} from "./hooks/useMeetings.ts";
import {styled} from "styled-components";
import HomePage from "./pages/HomePage.tsx";
import {Button} from "@mui/material";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useBooks} from "./hooks/useBooks.ts";

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
                <Route path="/addmeeting" element={<AddPage />} />
                <Route path="/:id" element={<DetailPage />} />
                <Route path="/:id/editmeeting" element={<EditPage />} />
                <Route path="/booklist" element={<BookList books={books}/>} />
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
