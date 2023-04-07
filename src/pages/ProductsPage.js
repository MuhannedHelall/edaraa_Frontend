import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminProductItem from "./Admin/AdminProductItem";
import SupervisorProductItem from "./Supervisor/SupervisorProductItem";
import warehouseTableData from "../data/warehouseTableData";
import userData from "../data/userData";

function ProductsPage() {
  const params = useParams();
  const [warehouses, setWarehouses] = useState(warehouseTableData);
  let superWarehouseData = {};
  warehouses.map((warehouse) => {
    if (params.id == warehouse.id) superWarehouseData = warehouse;
  });
  const [products, setProducts] = useState(superWarehouseData.products);

  const Admin = () => {
    let flag = 0;
    warehouses.map((warehouse) => {
      if (params.id == warehouse.id) flag = 1;
    });

    if (!flag) {
      window.location.replace("http://localhost:3000/*");
    }

    const getModal = (modalData) => {
      document.getElementById("editProductName").value = modalData.title;
      document.getElementById("editDescription").value = modalData.description;
      document.getElementById("editStock").value = modalData.stock;
    };

    return products.map((product) => {
      return (
        <AdminProductItem
          key={product.id}
          title={product.title}
          description={product.description}
          img={product.img}
          stock={product.stock}
          getModal={getModal}
        />
      );
    });
  };
  const Supervisor = () => {
    const getStockNum = (numOfStocks) => {
      document.getElementById("addStock").value = numOfStocks;
    };

    if (params.id != superWarehouseData.id) {
      window.location.replace("http://localhost:3000/Dashboard");
    }

    const [products, setProducts] = useState(superWarehouseData.products);
    return products.map((product) => {
      return (
        <SupervisorProductItem
          key={product.id}
          title={product.title}
          description={product.description}
          img={product.img}
          stock={product.stock}
          getStockNum={getStockNum}
        />
      );
    });
  };
  const AdminModals = () => {
    return (
      <>
        <div
          className="modal fade"
          id="addProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addProductName"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text-area"
                      className="form-control"
                      id="addDescription"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addStock"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                    />
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupFile02"
                    >
                      Upload
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark px-4">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="editProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editProductName"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text-area"
                      className="form-control"
                      id="editDescription"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="editStock"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="editFile" />
                    <label className="input-group-text" for="editFile">
                      Upload
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark px-4">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  const SupervisorModals = () => {
    return (
      <div
        className="modal fade"
        id="makeRequest"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="addStock" className="form-label">
                    Stock Quantity
                  </label>
                  <input type="number" className="form-control" id="addStock" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-dark px-4">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  const AddProductBtn = () => {
    return (
      <button
        className="btn btn-sm btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#addProduct"
      >
        <i className="bi bi-bag-plus-fill fs-4"></i>
      </button>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2 fs-1">
          <i className="bi bi-bag-heart mx-2"></i>
          Products
        </h1>
        {userData.type === "Admin" ? AddProductBtn() : null}
      </div>

      <section className="container-fluid">
        <div className="row">
          {userData.type === "Admin" ? Admin() : Supervisor()}
        </div>
      </section>

      {userData.type === "Admin" ? AdminModals() : SupervisorModals()}
    </>
  );
}

export default ProductsPage;