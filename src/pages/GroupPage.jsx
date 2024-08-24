import { useMediaQuery } from "@mui/material";

const GroupPage = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  return (
    <div
      className={`${
        isMobile ? "none" : "flex flex-col items-center justify-center"
      } h-full w-full`}
    >
      <p className="text-xl font-semibold">Manage Groups</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in!</p>
    </div>
  );
};

export default GroupPage;
