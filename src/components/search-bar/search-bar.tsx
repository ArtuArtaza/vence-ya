"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchProduct = (formData: FormData) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    const valueToSearch = formData.get("search");
    urlSearchParams.set("search", valueToSearch as string);
    router.push(pathname + "?" + urlSearchParams.toString());
    router.refresh();
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
