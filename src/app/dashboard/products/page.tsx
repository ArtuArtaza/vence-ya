"use client";
import BarcodeScanner from "@/components/barcodescanner/barcodescanner";
import { Result } from "@zxing/library";
import { useRef, useState } from "react";

const Products = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  const handleBarcodeScanned = (result: Result) => {
    setScannedBarcode(result.getText());
  };
  console.log(scannedBarcode);
  const openModal = () => {};
  return (
    <>
      <button
        className="btn"
        onClick={() => {
          modalRef.current?.showModal();
        }}
      >
        open modal
      </button>
      <dialog
        open={true}
        ref={modalRef}
        id="my_modal_3"
        className="modal text-white"
      >
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nombre del producto</span>
            </label>
            <input
              type="text"
              placeholder="Fideos"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Precio Lista</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                placeholder="10"
                className="input input-bordered"
              />
              <span>ARS</span>
            </label>
            <label className="label">
              <span className="label-text">Precio a venta</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                placeholder="10"
                className="input input-bordered"
              />
              <span>ARS</span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Marca</span>
            </label>
            <input
              type="text"
              placeholder="Coca Cola"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Fecha de vencimiento</span>
            </label>
            <input
              type="date"
              placeholder="Coca Cola"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button className="mt-3 btn btn-primary">Añadir producto</button>
          <BarcodeScanner onScan={handleBarcodeScanned} />
        </form>
      </dialog>
    </>
  );
};

export default Products;
