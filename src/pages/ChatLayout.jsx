import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsersAction } from "../redux/features/user/alluserAction";
import { Avatar } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSocket } from "../context/socketContext";

const ChatLayout = () => {
  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const { users } = useSelector((state) => state.alluser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("online", function (data) {
        dispatch(allUsersAction());
      });

      socket.on("offline", function (data) {
        dispatch(allUsersAction());
      });
    }
  }, [socket, dispatch]);

  return (
    <>
      <div className="w-full h-full lg:w-[25%]  bg-[rgb(234,239,248)] border-r border-zinc-300">
        <div className="px-6 pt-6 border-b border-zinc-200">
          <h4 className="mb-0 text-zinc-800">Chats</h4>
          <div className="py-3 mt-5 mb-5 rounded bg-[rgb(228,230,232)] flex items-center">
            <SearchOutlinedIcon className="text-lg text-gray-400 ml-5" />
            <input
              type="text"
              className="border-none bg-transparent outline-none w-[80%] ml-3"
              placeholder="Search user"
            />
          </div>
        </div>
        <div className="w-full h-[80%]">
          <div className="h-full overflow-auto">
            <ul className="flex flex-col">
              {users?.map((user, index) => (
                <Link to={`${user._id}`} key={index}>
                  <li className="flex items-center cursor-pointer bg-[#eaeaf8] hover:bg-[#7269ef1a] px-4 py-3">
                    <div className="w-12 h-12 mr-3 flex items-center relative">
                      <Avatar className="w-full h-full" />
                      {user.isOnline && (
                        <div className="absolute z-50 w-2 h-2 bg-green-600 rounded-full bottom-0 right-[6px]"></div>
                      )}
                    </div>
                    <div className="flex w-[73%] flex-col">
                      <h4 className="text-black font-medium text-md tracking-[.2px]">
                        {user.username}
                      </h4>
                      <p className="text-gray-800 truncate w-full pr-3">
                        fdfdf
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-auto lg:ml-0">
                      <span className="text-gray-500">05:13</span>
                      <span className=" flex justify-center items-center text-right text-orange-400 font-bold">
                        10
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ChatLayout;
