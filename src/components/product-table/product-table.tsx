import { PrismaClientSingleton } from "@/lib/api/db/prisma";
import { cookies } from "next/headers";
import SearchBar from "../search-bar/search-bar";

const prisma = PrismaClientSingleton.getInstance();
const ProductTable = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  const products = await prisma.products.findMany();

  return (
    <div className="overflow-x-auto w-full bg-base-100 max-w-5xl">
      <SearchBar />
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Producto</th>
            <th>Precio Lista</th>
            <th>Precio Venta</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img alt="product" src={product.imgSrc} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{product.name}</div>
                    {/*<div className="text-sm opacity-50"></div>*/}
                  </div>
                </div>
              </td>
              <td className="text-white">
                {`$${product.listPrice}`}
                <br />
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Precio Lista</th>
            <th>Precio Venta</th>
            <th>Marca</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
