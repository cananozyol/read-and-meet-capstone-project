import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

type ConfirmationDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};

export default function ConfirmationDialog({
                                               open,
                                               onClose,
                                               onConfirm,
                                               message,
                                           }: ConfirmationDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ color: "black" }}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button onClick={onClose} variant="outlined" sx={{ color: "black", backgroundColor: "#d1adee" }}>
                    No
                </Button>
                <Button onClick={onConfirm} variant="outlined" sx={{ color: "black", backgroundColor: "#d1adee" }}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
