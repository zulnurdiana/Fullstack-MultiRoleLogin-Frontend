import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddUser from "../components/FormAddUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default AddUser;
