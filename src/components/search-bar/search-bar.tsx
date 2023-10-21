const SearchBar = () => {
  return (
    <search className="w-full">
      <input
        type="text"
        placeholder="Search..."
        name="search"
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </search>
  );
};

export default SearchBar;
