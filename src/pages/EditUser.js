import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditUser from "../components/FormEditUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

const EditUser = () => {
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
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
