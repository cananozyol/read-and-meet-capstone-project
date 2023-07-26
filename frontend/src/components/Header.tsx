export default function Header() {
    return (
        <>
            <style>{headerStyles}</style>
            <header className="header-container">
                <div className="header-text">
                    Read <span className="plus-sign">+</span> Meet
                </div>
            </header>
        </>
    );
}

const headerStyles = `
    .header-container {
        background-color: #d1adee;
        display: flex;
        align-items: center;
        padding: 10px;
        margin-bottom: 20px;
        width: 100%;
    }

    .header-text {
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        color: black;
        font-weight: bold;
    }

    .header-text .plus-sign {
        color: #7a33dd;
    }
`;
