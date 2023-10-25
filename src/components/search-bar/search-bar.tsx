"use client";
const SearchBar = ({ setProduct }: any) => {
  const searchProduct = (formData: FormData) => {
    const valueToSearch = formData.get("search");
    setProduct(valueToSearch);
  };
  return (
    <form action={searchProduct}>
      <search className="join p-2">
        <input
          type="text"
          placeholder="Coca Cola"
          name="search"
          className="input input-bordered w-full join-item"
        />
        <button type="submit" className="btn btn-primary join-item">
          Buscar
        </button>
      </search>
    </form>
  );
};

export default SearchBar;
