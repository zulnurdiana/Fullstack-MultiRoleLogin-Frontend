import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEditProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
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
      <h2 className="subtitle">Edit Products</h2>
      <div class="card is-shadowless">
        <div class="card-content">
          <div class="content">
            <form onSubmit={editProduct}>
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
                    Update
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

export default FormEditProduct;
