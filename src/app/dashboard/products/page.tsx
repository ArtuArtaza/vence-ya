"use client";
import BarcodeScanner from "@/components/barcodescanner/barcodescanner";
import { Result } from "@zxing/library";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const Products = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  const handleBarcodeScanned = (result: Result) => {
    setScannedBarcode(result.getText());
  };
  console.log(scannedBarcode);
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (formData: any) => {
    console.log(formData);
  };

  console.log("xd");
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
        <form
          onClick={handleSubmit(onFormSubmit)}
          method="dialog"
          className="modal-box"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nombre del producto</span>
            </label>
            <input
              {...(register("name"), { required: true })}
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
                {...register("listPrice", { required: true })}
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
                {...register("sellPrice", { required: true })}
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
              {...register("brand", { required: true })}
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
              {...register("dueDate", { required: true })}
              type="date"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button className="mt-3 btn btn-primary">Añadir producto</button>
          {/* TODO:Is Disabled because i need to check if the webcam exists or no */}
          {/*false ? <BarcodeScanner onScan={handleBarcodeScanned} /> : null*/}
        </form>
      </dialog>
    </>
  );
};

export default Products;
