import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useNavigate} from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };


    return (
        <>
            <header className="header-container">
                <header className="header-text">
                    Read <span className="plus-sign">+</span> Meet
                </header>
                <div className="header-icon" onClick={handleProfileClick}>
                    <PersonOutlineIcon style={{ color: 'black', cursor: 'pointer' }} />
                </div>
            </header>
        </>
    );
}
