import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useNavigate} from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export default function Header() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };


    return (
        <header className="header-container">
            <div className="header-text">
                Read <span className="plus-sign">+</span> Meet
            </div>
            <div className="header-icon">
                <Tooltip title="Profil">
                    <div onClick={handleProfileClick} style={{ cursor: 'pointer', marginRight: '30px' }}>
                        <PersonOutlineIcon style={{ color: 'black', fontSize: '30px' }} />
                    </div>
                </Tooltip>
            </div>
        </header>
    );
}
