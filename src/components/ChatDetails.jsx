import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  Slide,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useTheme } from "../context/themeContext";
import {
  useAddMembersToGroupMutation,
  useLeaveGroupMutation,
  useMyFriendsQuery,
  useRemoveMembersFromGroupMutation,
} from "../redux/api/api";
import moment from "moment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ChatDetails = ({
  chatId,
  chatDetails,
  isChatDetailDialogOpen,
  handleChatDetailClose,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { mode } = useTheme();
  const [isAddMember, setIsAddMember] = useState(false);
  const [members, setMembers] = useState([]);
  const { data } = useMyFriendsQuery(chatId);
  const [addMemberMutation] = useAddMembersToGroupMutation("");
  const [removeMemberMutation] = useRemoveMembersFromGroupMutation("");
  const [leaveGroupMutation] = useLeaveGroupMutation("");
  const navigate = useNavigate();

  const handleMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.includes(id)
        ? prevMembers.filter((m) => m !== id)
        : [...prevMembers, id]
    );
  };

  const addMemberHandler = async () => {
    const { data, error } = await addMemberMutation({ chatId, members });
    if (data) toast.success(data?.message);
    else toast.error(error?.data?.message);
    handleChatDetailClose();
  };

  const removeMemberHandler = async (id) => {
    const { data, error } = await removeMemberMutation({ chatId, userId: id });
    if (data) toast.success(data?.message);
    else toast.error(error?.data?.message);
    handleChatDetailClose();
  };

  const leaveGroupHandler = async () => {
    const { data, error } = await leaveGroupMutation({ chatId });
    if (data) toast.success(data?.message);
    else toast.error(error?.data?.message);
    handleChatDetailClose();
  };

  return (
    <Dialog
      open={isChatDetailDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleChatDetailClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Stack
        width={400}
        padding={3}
        gap={2}
        bgcolor={mode === "light" ? "white" : "#1a2236"}
        color={mode === "light" ? "black" : "white"}
      >
        {!isAddMember ? (
          <>
            <Avatar sx={{ width: 90, height: 90 }} />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <p className="font-bold text-xl capitalize">
                {chatDetails?.chat?.name}
              </p>
              <span>edit</span>
            </Stack>
            <Box>
              <h2 className="font-bold text-xl capitalize mb-3">created</h2>
              <p className="text-xs">
                {moment(chatDetails?.chat?.createdAt).format("DD-MM-YYYY")}
              </p>
            </Box>
            <Box>
              <h2 className="font-bold text-xl capitalize mb-3">members</h2>
              <Box sx={{ overflowY: "auto", maxHeight: "380px" }}>
                {chatDetails?.chat?.members?.map((f, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    gap={2}
                    alignItems={"center"}
                    marginBottom={2}
                  >
                    <Avatar src={f?.avatar?.url} />
                    <p className="flex-grow">{f.username}</p>
                  </Stack>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ overflowY: "auto", maxHeight: "380px" }}>
            {data?.myFriends?.map((f, index) => (
              <Stack
                key={index}
                direction={"row"}
                gap={2}
                alignItems={"center"}
                marginBottom={2}
              >
                <Avatar src={f?.avatar?.url} />
                <p className="flex-grow">{f.username}</p>
                {f.isFriend ? (
                  <Checkbox
                    checked
                    onClick={() => removeMemberHandler(f._id)}
                  />
                ) : (
                  <Checkbox
                    onChange={() => handleMember(f._id)}
                    checked={members.includes(f._id)}
                  />
                )}
              </Stack>
            ))}
            <Stack gap={2}>
              {members.length > 0 && (
                <Button
                  className="w-full"
                  variant="contained"
                  onClick={addMemberHandler}
                >
                  Add
                </Button>
              )}
              <Button
                className="w-full"
                variant="contained"
                onClick={() => setIsAddMember(false)}
              >
                Back
              </Button>
            </Stack>
          </Box>
        )}
        {chatDetails?.chat?.groupChat &&
          chatDetails?.chat?.creator === user._id &&
          !isAddMember && (
            <Button variant="contained" onClick={() => setIsAddMember(true)}>
              Add members
              <span className="ml-3">
                <AddIcon />
              </span>
            </Button>
          )}
        {chatDetails?.chat?.groupChat && (
          <Button color="error" variant="contained" onClick={leaveGroupHandler}>
            Leave Group
            <span className="ml-3">
              <ExitToAppIcon />
            </span>
          </Button>
        )}
      </Stack>
    </Dialog>
  );
};

export default ChatDetails;
