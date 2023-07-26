import Header from "./components/Header.tsx";
import MeetingList from "./pages/MeetingList.tsx";
import {Link, Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import {useFetch} from "./hooks/useFetch.ts";
import {styled} from "styled-components";

export default function App() {

    const meetings = useFetch(state => state.meetings);

    return (
        <main>
            <Header/>
            <Routes>
                <Route path="/" element={<MeetingList meetings={meetings}/>}/>
                <Route path="/add" element={<AddPage/>}/>
            </Routes>

            <StyledApp>
                <Link to={"/"}>
                    <button>My Meetings</button>
                </Link>
                <Link to={"/add"}>
                    <button>New Meeting</button>
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