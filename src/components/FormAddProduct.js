import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormAddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Products</h2>
      <div class="card is-shadowless">
        <div class="card-content">
          <div class="content">
            <form onSubmit={addProduct}>
              <p className="has-has-text-centered">{msg}</p>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
