import {Button, SvgIconProps} from '@mui/material';
import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
    startIcon?: React.ComponentType<SvgIconProps> | null;
};

export default function ButtonStyle ({children, onClick, type, startIcon}: Props) {

    const buttonStyles = {
        backgroundColor: "#d1adee",
        color: "black",
        borderRadius: "5px",
        width: "139px",
    };

    const iconStyles = {
        color: "white",
    };

    const StartIconComponent = startIcon ?? null;

    return (
        <Button
            onClick={onClick}
            variant="contained"
            color="secondary"
            startIcon={StartIconComponent && <StartIconComponent style={iconStyles} />}
            sx={buttonStyles}
            type={type}
        >
            {children}
        </Button>
    );
}


