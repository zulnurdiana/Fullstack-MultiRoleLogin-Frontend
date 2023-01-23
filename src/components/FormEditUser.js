import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEditUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const editUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div class="card is-shadowless">
        <div class="card-content">
          <div class="content">
            <form onSubmit={editUser}>
              <p className="has-has-text-centered">{msg}</p>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    type="password"
                    class="input"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                  <input
                    type="password"
                    class="input"
                    value={confPassword}
                    onChange={({ target }) => setConfPassword(target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Role</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select
                      value={role}
                      onChange={({ target }) => setRole(target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
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

export default FormEditUser;
