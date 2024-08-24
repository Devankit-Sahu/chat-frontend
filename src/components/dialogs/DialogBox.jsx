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
import { useTheme } from "../../context/themeContext";

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
  const { mode } = useTheme();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: mode === "light" ? "white" : "#1a2236",
          color: mode === "light" ? "black" : "white",
        },
      }}
    >
      <div>
        {dialogtitle && (
          <DialogTitle sx={{ fontWeight: 600 }}>{dialogtitle}</DialogTitle>
        )}
        {dialogcontentText && (
          <DialogContent>
            <DialogContentText
              color={mode === "light" ? "black" : "white"}
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
      </div>
    </Dialog>
  );
};

export default DialogBox;
