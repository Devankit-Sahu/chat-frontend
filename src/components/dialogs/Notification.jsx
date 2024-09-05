import { forwardRef } from "react";
import { Button, Dialog, Slide, Tooltip, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAcceptFriendRequestMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/themeContext";
import moment from "moment";
import { useDispatch } from "react-redux";
import { decrementNotification } from "../../redux/features/notification/notificationSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Notification = ({
  isNotificationDialogOpen,
  notificationDialogClose,
  allNotifications,
}) => {
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const { mode } = useTheme();
  const dispatch = useDispatch();

  const acceptRequestHandler = async (id) => {
    notificationDialogClose();
    dispatch(decrementNotification());
    const { data } = await acceptRequest({ requestId: id, accept: true });
    toast.success(data?.message || "Friend request accepted");
  };

  const deleteRequestHandler = async (id) => {
    notificationDialogClose();
    dispatch(decrementNotification());
    const { data } = await acceptRequest({ requestId: id, accept: false });
    toast.success(data?.message || "Friend request rejected");
  };

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
      <div className="notification-dialog w-full dark:text-white">
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
          {!allNotifications?.requests?.length ? (
            <p className="p-2">No notifications</p>
          ) : (
            allNotifications?.requests?.map((req, index) => (
              <div
                className="bg-[ghostwhite] dark:bg-[#293145] cursor-pointer my-2 p-2 rounded flex justify-between gap-6"
                key={index}
              >
                <p className="text-sm">
                  {req.sender_id.username} has sent you a frient request
                </p>
                <div>
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
                  <p className="text-xs text-end text-white/50">
                    {moment(req.createdAt).fromNow()}
                  </p>
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
