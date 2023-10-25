"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AddProductModal = () => {
  const { register, handleSubmit } = useForm();
  const createProduct = async (formData: any) => {
    await toast.promise(
      axios.post("/api/dashboard/create-product", {
        ...formData,
        dueDate: new Date(formData.dueDate),
      }),
      {
        pending: "Creando producto...",
        success: "Producto creado!",
        error: "No se pudo crear el producto",
      }
    );
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-secondary">
        Añadir Producto
      </button>
      <dialog open={isOpen} id="my_modal_3" className="modal text-white">
        <form
          onSubmit={handleSubmit(createProduct)}
          method="dialog"
          className="modal-box flex flex-col items-center"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nombre del producto</span>
            </label>
            <input
              {...register("name")}
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
                {...register("listPrice", {
                  valueAsNumber: true,
                })}
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
                {...register("sellPrice", {
                  valueAsNumber: true,
                })}
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
              {...register("brand")}
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
              {...register("dueDate", {
                valueAsDate: true,
              })}
              type="date"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button type="submit" className="mt-3 btn btn-primary">
            Añadir producto
          </button>
          {/* TODO:Is Disabled because i need to check if the webcam exists or no */}
          {/*false ? <BarcodeScanner onScan={handleBarcodeScanned} /> : null*/}
        </form>
      </dialog>
    </>
  );
};
