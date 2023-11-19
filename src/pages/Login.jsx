import React, { useEffect, useState } from "react";
// import back from "../assets/background.jpg";
import "../CSS/pages/Login.css";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Kspinner from "../assets/Kspinner";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

function LogIn() {
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
      // toast.success("User created seccessfully");
    }
    dispatch(reset());
  }, [dispatch, navigate, user, isLoading, isSuccess, isError, message]);
  const onForm = (e) => {
    setFormData((perv) => ({
      ...perv,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    dispatch(login(formData));
    e.preventDefault();
  };
  return (
    <div className="Main-login">
      <div className="login">
        {isLoading && (
          <>
            <div className="login-spinner-box">
              <Kspinner />
            </div>
          </>
        )}
        <header className="login-header">
          <div className="login-header-logo"></div>
        </header>
        <p> welcome back please login to your account</p>
        <form onSubmit={onSubmit} className="login-form">
          <div className="login-name">
            <input
              placeholder="Enter  email"
              className="Login-input-style"
              type="email"
              id="email"
              value={email}
              onChange={onForm}
              required
            />
          </div>
          <div className="login-name">
            <input
              value={password}
              placeholder="Enter  password"
              className="Login-input-style  "
              id="password"
              onChange={onForm}
              name="password"
              type={show ? "text" : "password"}
              autoComplete="off"
              required
            />
            <div className="login-eye-box">
              {!show ? (
                <FaEyeSlash
                  onClick={() => setShow(true)}
                  className="login-eye"
                />
              ) : (
                <FaEye className="login-eye" onClick={() => setShow(false)} />
              )}
              {""}
            </div>
          </div>

          <div className="login-btn">
            <button type="submit">sing in</button>
          </div>

          <h1 className="register-login">
            or create an account <Link to={"/register"}>sing up</Link>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
