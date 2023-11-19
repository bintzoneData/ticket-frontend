import { Link, useNavigate } from "react-router-dom";
import "../CSS/pages/Register.css";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Kspinner from "../assets/Kspinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    phoneNo: "",
    phoneNo2: "",
    password: "",
    password2: "",
  });
  const { name, surname, email, phoneNo, password, password2, city, phoneNo2 } =
    formData;
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
    if (isSuccess || user) {
      // toast.success("User created seccessfully");
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, user, isSuccess, isError, message, navigate]);
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("password must mutch");
    } else {
      const userData = {
        name,
        surname,
        email,
        phoneNo,
        phoneNo2,
        password,
        city,
      };
      console.log(userData);
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    console.log("maoo");
  }
  return (
    <div className="main-Register">
      <div className="Register">
        <div className="Register-body">
          {isLoading && (
            <div className="Register-loading">
              <Kspinner />
            </div>
          )}
          <div className="Register-titles">
            <h1>register</h1>
            <button
              className="all-btn-submit  all-fz-18px  all-B-main "
              onClick={() => navigate("/")}
            >
              back
            </button>
          </div>

          <form onSubmit={onSubmit} className="Register-form">
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  name:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="name"
                  value={name}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  surname:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="surname"
                  value={surname}
                />
              </div>
            </div>
            {/* line two */}
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  email:
                </label>
                <input
                  type="email"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="email"
                  value={email}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  city:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="city"
                  value={city}
                />
              </div>
            </div>

            {/* line three */}
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  phone no:
                </label>
                <input
                  type="number"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="phoneNo"
                  value={phoneNo}
                />
              </div>
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  phone no 2:
                </label>
                <input
                  type="number"
                  className="all-form-input all-H-25px all-fz-18px Register-input "
                  onChange={onChange}
                  id="phoneNo2"
                  value={phoneNo2}
                />
              </div>
            </div>

            {/* pass */}
            <div className="all-boxes Register-column">
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  password:
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input"
                  onChange={onChange}
                  id="password"
                  value={password}
                  autoComplete="off"
                />
              </div>
              {/* comfirn */}
              <div className="all-box Register-box">
                <label htmlFor="" className="all-form-label">
                  comfirm password
                </label>
                <input
                  type="text"
                  className="all-form-input all-H-25px all-fz-18px Register-input"
                  onChange={onChange}
                  id="password2"
                  value={password2}
                  autoComplete="none"
                />
              </div>
            </div>
            <div className="Register-btn-box">
              <button
                type="submit"
                className="all-btn-submit all-H-40px all-W-98pc all-fz-25px all-B-navy"
              >
                create user
              </button>
            </div>
            <h1 className="register-login">
              or have an account{" "}
              <Link to={"/login"} className="register-login-a">
                sing in
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
