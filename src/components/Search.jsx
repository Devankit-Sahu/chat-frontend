const Search = ({ search = "", handleInputChange = () => {} }) => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Search here..."
        className="bg-[#e3e3e3] dark:bg-inherit dark:border-[1px] dark:border-solid dark:border-[#293145] w-full outline-none border-none placeholder:text-black/70 dark:placeholder:text-white/50 px-2 py-2"
      />
    </div>
  );
};

export default Search;
