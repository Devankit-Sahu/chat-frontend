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
  handleClickOpen,
  handleClose,
  attachment,
  caption,
  setCaption,
  handleCloseFileChange,
}) => {
  return (
    <div
      className="absolute left-0 top-0 z-[1000] bottom-0 w-full "
      onClick={handleClickOpen}
    >
      <div
        className="w-[25vw] rounded-md absolute left-[30px] bottom-[10px] bg-[aliceblue]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[23vw] h-[320px] mx-auto ">
          <img src={attachment} className="w-full h-full object-cover" />
        </div>
        <InputBox
          type="text"
          className="w-full py-3 border-none outline-none px-3"
          placeholder="Write caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="flex items-center px-4 justify-between py-2">
          <span className="text-zinc-600 cursor-pointer">
            <SentimentSatisfiedAltOutlinedIcon />
          </span>
          <button
            type="submit"
            className=" bg-[rgb(114,105,239)] px-2 py-1 text-white rounded cursor-pointer"
          >
            <SendIcon />
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Discard unsent message?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-slide-description"
          >
            Your message, including attached media, will not be sent if you
            leave this screen.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseFileChange}
          >
            Discard changes
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Return to media
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
