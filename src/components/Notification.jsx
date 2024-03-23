import React from "react";
import {
  Box,
  Dialog,
  Divider,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Notification = ({ open, notificationHandler, notification }) => {
  const navigate = useNavigate();
  const navigateHandler = (to) => {
    navigate(to);
    notificationHandler();
  };
  return (
    <Dialog
      open={open}
      onClose={notificationHandler}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box className="bg-white dark:bg-[#1a2236] dark:text-white" width={500}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={"20px"}
        >
          <Typography fontWeight={"700"}>All Notifications</Typography>
          <Tooltip
            onClick={notificationHandler}
            title="Close notification"
            className="cursor-pointer"
          >
            <CloseIcon />
          </Tooltip>
        </Stack>
        <Divider />
        <Box sx={{ overflowY: "auto", maxHeight: "380px" }} paddingX={"10px"}>
          {!notification.length ? (
            <p className="p-2">No notifications</p>
          ) : (
            notification.map((n, index) => (
              <Stack
                onClick={() => navigateHandler(n.chatId)}
                direction={"row"}
                justifyContent={"space-between"}
                gap={3}
                className="bg-[ghostwhite] dark:bg-[#293145] cursor-pointer my-2 p-1"
                key={index}
              >
                <p>
                  {n.count} new message recieved from {n.name}
                </p>
                <span>
                  {new Date(n.date).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </Stack>
            ))
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default Notification;
