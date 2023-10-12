"use server";
export const AddProductModal = () => {
    const createProduct = () => {

    }
    return (
        <dialog
            open={true}
            id="my_modal_3"
            className="modal text-white"
        >
            <form
                method="dialog"
                className="modal-box flex flex-col items-center"
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nombre del producto</span>
                    </label>
                    <input
                        name="name"
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
                            name="listPrice"
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
                            name="sellPrice"
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
                        name="brand"
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
                        name="dueDate"
                        type="date"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <button className="mt-3 btn btn-primary">Añadir producto</button>
                {/* TODO:Is Disabled because i need to check if the webcam exists or no */}
                {/*false ? <BarcodeScanner onScan={handleBarcodeScanned} /> : null*/}
            </form>
        </dialog>
    )
}