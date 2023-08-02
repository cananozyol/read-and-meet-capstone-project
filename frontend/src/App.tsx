import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import MeetingList from "./pages/MeetingList.tsx";
import AddPage from "./pages/AddPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import EditPage from "./pages/EditPage.tsx";
import {useFetch} from "./hooks/useFetch.ts";
import {styled} from "styled-components";
import HomePage from "./pages/HomePage.tsx";
import {Button} from "@mui/material";

export default function App() {
    const meetings = useFetch((state) => state.meetings);

    return (
        <main>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/meetinglist" element={<MeetingList meetings={meetings} />} />
                <Route path="/addmeeting" element={<AddPage />} />
                <Route path="/:id" element={<DetailPage />} />
                <Route path="/:id/editmeeting" element={<EditPage/>} />
            </Routes>

            <StyledApp>
                <Link to={"/meetinglist"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: '#d1adee',
                            color: 'black',
                            borderRadius: '5px',
                            width: '139px',
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
                            backgroundColor: '#d1adee',
                            color: 'black',
                            borderRadius: '5px',
                            width: '139px',
                        }}
                    >
                        NEW MEETING
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
