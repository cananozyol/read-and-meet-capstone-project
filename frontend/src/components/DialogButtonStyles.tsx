import {Button} from '@mui/material';
import React from 'react';

type DialogButtonStylesProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function DialogButtonStyles({ children, onClick }: DialogButtonStylesProps) {
    const buttonStyle = {
        color: 'black',
        backgroundColor: '#d1adee',
    };

    return (
        <Button onClick={onClick} variant="outlined" sx={buttonStyle}>
            {children}
        </Button>
    );
}
