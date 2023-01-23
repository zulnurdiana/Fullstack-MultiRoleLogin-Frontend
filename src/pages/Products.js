import React, { useEffect } from "react";
import Layout from "./Layout";
import ProductList from "../components/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default Products;
