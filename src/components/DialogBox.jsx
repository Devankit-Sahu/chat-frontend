import React from "react";
import {
  Slide,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  open,
  handleClose,
  dialogtitle,
  dialogcontentText,
  dialogactionText1,
  dialogactionText2,
  dialogactionOnSuccess,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogtitle && (
        <DialogTitle sx={{ fontWeight: 600 }}>{dialogtitle}</DialogTitle>
      )}
      {dialogcontentText && (
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-slide-description"
          >
            {dialogcontentText}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          {dialogactionText1}
        </Button>
        <Button color="success" onClick={dialogactionOnSuccess}>
          {dialogactionText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
