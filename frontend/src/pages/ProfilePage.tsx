import {useStore} from "../hooks/useStore.ts";
import {Link, useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";
import ButtonStyle from "../components/ButtonStyle.tsx";

export default function ProfilePage() {
    const user = useStore((state) => state.user);
    const books = useStore((state) => state.books);
    const meetings = useStore((state) => state.meetings);
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);


    const filteredBooks = books.filter((book) => book.userId === user.id);
    const filteredMeetings = meetings.filter(
        (meeting) => meeting.userId === user.id
    );

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <ProfileContainer>
            <WelcomeText>Hello, {user.username}!</WelcomeText>
            <Divider />
            <InfoContainer>
                <Info>
                    Number of <Link to="/booklist">Books:</Link>{" "}{filteredBooks.length}
                </Info>
                <Info>
                    Number of <Link to="/meetinglist">Meetings:</Link>{" "}{filteredMeetings.length}
                </Info>
            </InfoContainer>
            <Divider />
            <LogoutButtonContainer>
                <ButtonStyle onClick={handleLogout} startIcon={LogoutIcon}>
                    Logout
                </ButtonStyle>
            </LogoutButtonContainer>
        </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const WelcomeText = styled.h2`
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #411c5d;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Info = styled.p`
    margin: 5px;
`;

const LogoutButtonContainer = styled.div`
    margin-top: 20px;
`;