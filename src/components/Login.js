import React, { useState, useEffect } from "react";
import { LoginUser, reset } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section class="hero has-background-grey-light is-fullheight is-fullwidth">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2">Sign In</h1>
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
                <div class="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
