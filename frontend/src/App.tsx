import "./App.css";
import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import MeetingList from "./pages/MeetingList.tsx";
import BookList from "./pages/BookList.tsx";
import HomePage from "./pages/HomePage.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBookPage from "./pages/AddBookPage.tsx";
import AddMeetingPage from "./pages/AddMeetingPage.tsx";
import EditMeetingPage from "./pages/EditMeetingPage.tsx";
import DetailMeetingPage from "./pages/DetailMeetingPage.tsx";
import DetailBookPage from "./pages/DetailBookPage.tsx";
import {useStore} from "./hooks/useStore.ts";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {Groups, Home, MenuBook} from "@mui/icons-material";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {useEffect} from "react";


export default function App() {
    const username = useStore((state) => state.username);
    const me = useStore((state) => state.me);

    useEffect(() => {
        me();
    }, []);


    return (
        <>
            <main>
                <Header />
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route element={<ProtectedRoutes user={username}/>}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/meetinglist" element={<MeetingList/>} />
                        <Route path="/addmeeting" element={<AddMeetingPage />} />
                        <Route path="/meeting/:id" element={<DetailMeetingPage />} />
                        <Route path="/:id/editmeeting" element={<EditMeetingPage />} />
                        <Route path="/booklist" element={<BookList/>} />
                        <Route path="/addbook" element={<AddBookPage />} />
                        <Route path="/book/:id" element={<DetailBookPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>

            </main>
            <Paper className="navigation-paper">
                <BottomNavigation sx={{ bgcolor: "#d1adee", height: "70px" }} showLabels>
                    <BottomNavigationAction label="Meetings" icon={<Groups />} style={{ color: 'black' }} component={Link} to="/meetinglist" />
                    <BottomNavigationAction label="Home" icon={<Home />} style={{ color: 'black' }} component={Link} to="/" />
                    <BottomNavigationAction label="Books" icon={<MenuBook />} style={{ color: 'black' }} component={Link} to="/booklist" />
                </BottomNavigation>
            </Paper>

        </>
    );
}
