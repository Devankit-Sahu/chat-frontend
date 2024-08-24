import React, { useState } from "react";
import { Avatar, Button, Checkbox, Dialog, Slide } from "@mui/material";
import {
  ExitToApp as ExitToAppIcon,
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
} from "@mui/icons-material";
import { useTheme } from "../../context/themeContext";
import {
  useAddMembersToGroupMutation,
  useLeaveGroupMutation,
  useMyFriendsQuery,
  useRemoveMembersFromGroupMutation,
} from "../../redux/api/api";
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
    navigate(`/chat/${chatId}`);
  };

  const leaveGroupHandler = async () => {
    const { data, error } = await leaveGroupMutation({ chatId });
    if (data) toast.success(data?.message);
    else toast.error(error?.data?.message);
    handleChatDetailClose();
  };

  const changeHandler = async (id, isGroupMember) => {
    if (isGroupMember) {
      const { data, error } = await removeMemberMutation({
        chatId,
        userId: id,
      });
      if (data) toast.success(data?.message);
      else toast.error(error?.data?.message);
      navigate(`/chat/${chatId}`);
    } else {
      setMembers((prevMembers) =>
        prevMembers.includes(id)
          ? prevMembers.filter((m) => m !== id)
          : [...prevMembers, id]
      );
    }
  };

  return (
    <Dialog
      open={isChatDetailDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleChatDetailClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: mode === "light" ? "white" : "#1a2236",
          color: mode === "light" ? "black" : "white",
        },
      }}
    >
      <div className="w-[300px] sm:w-[400px] p-6 gap-4">
        <div className="flex justify-center">
          <Avatar sx={{ width: 90, height: 90 }} />
        </div>
        <div className="flex justify-between my-3">
          <h2 className="font-medium text-xl capitalize">
            {chatDetails?.chat?.name}
          </h2>
          {chatDetails?.chat?.groupChat && <span>edit</span>}
        </div>
        <div className="flex justify-between my-3">
          <h2 className="font-medium text-xl capitalize">created at</h2>
          <h2 className="text-xs">
            {moment(chatDetails?.chat?.createdAt).format("DD-MM-YYYY")}
          </h2>
        </div>
        {chatDetails?.chat?.groupChat && (
          <h2 className="font-medium text-xl capitalize my-3">friends</h2>
        )}
        <div style={{ overflowY: "auto", maxHeight: "380px" }}>
          {chatDetails?.chat?.groupChat &&
            data?.myFriends.map((f, index) => {
              const isGroupMember =
                chatDetails?.chat?.members?.some(
                  (friend) => friend._id === f._id
                ) || false;

              return (
                <div className="flex items-center mb-4 gap-4" key={index}>
                  <Avatar src={f?.avatar?.url} />
                  <p className="flex-grow">{f.username}</p>
                  <Checkbox
                    className="cursor-pointer"
                    checked={isGroupMember || members.includes(f._id)}
                    icon={<AddBoxIcon />}
                    onChange={() => changeHandler(f._id, isGroupMember)}
                    checkedIcon={<IndeterminateCheckBoxIcon />}
                    sx={{
                      color: "#008394",
                      "&.Mui-checked": {
                        color: "#a31545",
                      },
                    }}
                  />
                </div>
              );
            })}
        </div>
        {chatDetails?.chat?.groupChat &&
          chatDetails?.chat?.creator === user._id &&
          members.length > 0 && (
            <div className="mb-2">
              <Button
                className="w-full"
                variant="contained"
                onClick={addMemberHandler}
              >
                Add members
              </Button>
            </div>
          )}
        {chatDetails?.chat?.groupChat && (
          <div className="mt-2">
            <Button
              className="w-full"
              color="error"
              variant="contained"
              onClick={leaveGroupHandler}
            >
              Leave Group
              <span className="ml-3">
                <ExitToAppIcon />
              </span>
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ChatDetails;
