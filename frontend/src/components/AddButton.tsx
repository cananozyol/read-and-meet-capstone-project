import {Button} from '@mui/material';
import {Link} from "react-router-dom";
import {Add} from "@mui/icons-material";
import React from "react";

type Props = {
    to: string,
    children: React.ReactNode;
};

export default function AddButton({ to, children }: Props) {

    return (
        <Button
            component={Link}
            to={to}
            variant="contained"
            color="secondary"
            sx={{
                backgroundColor: '#d1adee',
                color: 'black',
                borderRadius: '5px',
                width: '139px',
                textTransform: 'none',
            }}
            startIcon={<Add style={{ color: 'white' }} />}
        >
            {children}
        </Button>
    );
}
