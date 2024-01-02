import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SendIcon from "@mui/icons-material/Send";
import InputBox from "../input/InputBox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  open,
  handleClose,
  // handleCloseFileChange,
  title,
  contentText,
  actionText1,
  actionText2,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {title && <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>}
      {contentText && (
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-slide-description"
          >
            {contentText}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: "center", gap: "20px" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleCloseFileChange}
          // onClick={handleCloseFileChange}
        >
          {actionText1}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          {actionText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
