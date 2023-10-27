"use client";
import SearchBar from "../search-bar/search-bar";
import { AddProductModal } from "../add-product-modal/add-product-modal";
const ProductTable = ({
  products,
}: {
  products: {
    id: string;
    name: string;
    brand: string;
    sellPrice: number;
    listPrice: number;
    imgSrc: string;
    dueDate: Date;
    userId: string | null;
  }[];
}) => {
  return (
    <section className="overflow-x-auto w-full bg-base-100 max-w-5xl p-3">
      <div className="w-full flex items-center justify-end">
        <SearchBar />
        <AddProductModal />
      </div>
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
            <th>Vencimiento</th>
          </tr>
        </thead>
        {products.length > 0 ? (
          <>
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
                        <div className="font-bold text-white">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-white">
                    {`$${product.listPrice}`}
                    <br />
                  </td>
                  <td>{`$${product.sellPrice}`}</td>
                  <td>{product.brand}</td>
                  <td>{new Date(product.dueDate).toLocaleDateString()}</td>
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
                <th>Vencimiento</th>
              </tr>
            </tfoot>
          </>
        ) : (
          <h3 className="w-full text-center text-3xl flex items-center justify-center">
            No tienes productos
          </h3>
        )}
      </table>
    </section>
  );
};

export default ProductTable;
