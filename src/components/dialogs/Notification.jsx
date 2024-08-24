import React, { useEffect } from "react";
import { Button, Dialog, Slide, Tooltip, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificatonQuery,
} from "../../redux/api/api";
import { resetRequestNotification } from "../../redux/features/notification/notificationSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useTheme } from "../../context/themeContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Notification = ({
  isNotificationDialogOpen,
  notificationDialogClose,
  user,
}) => {
  const { data } = useGetNotificatonQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const dispatch = useDispatch();
  const { mode } = useTheme();

  const acceptRequestHandler = async (id) => {
    notificationDialogClose();
    const { data } = await acceptRequest({ requestId: id, accept: true });
    toast.success(data?.message || "Friend request accepted");
  };

  const deleteRequestHandler = async (id) => {
    notificationDialogClose();
    const { data } = await acceptRequest({ requestId: id, accept: false });
    toast.error(data?.message || "Friend request rejected");
  };

  useEffect(() => {
    dispatch(resetRequestNotification());
  }, [dispatch]);

  return (
    <Dialog
      open={isNotificationDialogOpen}
      onClose={notificationDialogClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: mode === "light" ? "white" : "#1a2236",
        },
      }}
    >
      <div className="notification-dialog w-[300px] sm:w-[400px] dark:text-white">
        <div className="flex justify-between p-4">
          <Typography fontWeight={"700"}>All Notifications</Typography>
          <Tooltip
            onClick={notificationDialogClose}
            title="Close notification"
            className="cursor-pointer"
          >
            <CloseIcon />
          </Tooltip>
        </div>
        <div
          style={{ overflowY: "auto", maxHeight: "380px" }}
          className="p-[10px]"
        >
          {!data?.requests?.length ? (
            <p className="p-2">No notifications</p>
          ) : (
            data?.requests?.map((req, index) => (
              <div
                className="bg-[ghostwhite] dark:bg-[#293145] cursor-pointer my-2 p-1 flex justify-between gap-6"
                key={index}
              >
                <p>{req.sender_id.username} has sent you a frient request</p>
                <div className="flex items-center gap-2">
                  <Button
                    color="error"
                    onClick={() => deleteRequestHandler(req._id)}
                  >
                    Reject
                  </Button>
                  <Button
                    color="success"
                    onClick={() => acceptRequestHandler(req._id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Notification;
