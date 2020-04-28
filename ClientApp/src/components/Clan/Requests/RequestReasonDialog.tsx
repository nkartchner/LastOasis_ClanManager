import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

interface Props {
    isOpen: boolean;
    submit: (reason: string) => any;
    close: () => any;
}

const RequestDialog: React.FC<Props> = ({ isOpen, submit, close }) => {
    const [reason, setReason] = React.useState<string>("");
    return (
        <Dialog
            open={isOpen}
            onClose={close}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent>
                <TextField
                    autoFocus
                    multiline
                    color="primary"
                    margin="dense"
                    id="name"
                    label="Reason You want to join us"
                    onChange={(e) => setReason(e.target.value)}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close} variant="contained">
                    Cancel
                </Button>
                <Button onClick={() => submit(reason)} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestDialog;
