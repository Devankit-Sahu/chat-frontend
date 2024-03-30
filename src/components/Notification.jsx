import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificatonQuery,
} from "../redux/api/api";
import { resetRequestNotification } from "../redux/features/notification/notificationSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

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
    >
      <Box className="bg-white dark:bg-[#1a2236] dark:text-white" width={500}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={"20px"}
        >
          <Typography fontWeight={"700"}>All Notifications</Typography>
          <Tooltip
            onClick={notificationDialogClose}
            title="Close notification"
            className="cursor-pointer"
          >
            <CloseIcon />
          </Tooltip>
        </Stack>
        <Divider />
        <Box sx={{ overflowY: "auto", maxHeight: "380px" }} paddingX={"10px"}>
          {!data?.requests?.length ? (
            <p className="p-2">No notifications</p>
          ) : (
            data?.requests?.map((req, index) => (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={3}
                className="bg-[ghostwhite] dark:bg-[#293145] cursor-pointer my-2 p-1"
                key={index}
              >
                <p>{req.sender_id.username} has sent you a frient request</p>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
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
                </Stack>
              </Stack>
            ))
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default Notification;
