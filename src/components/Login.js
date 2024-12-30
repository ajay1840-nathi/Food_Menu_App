import React from "react";
import '../css/FormPage.css'
import { Link, useNavigate } from "react-router-dom"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import "bootstrap-icons/font/bootstrap-icons.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { auth } from '../firebase'
import SignInwithGoogle from "./SignInWithGoogle";


const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

    }),
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast.success("User logged in Successfully", { position: "top-center" });
        window.localStorage.setItem("loggedIn", true);
        navigate('/listing')
      } catch (error) {
        toast.error("Invalid Credentials", { position: "bottom-center" })
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form-login login">
      <h3 className="title-container">Login</h3>
      <div>
        <div className="form-group-login">
          <label className="login-email"><i id="icon" className="bi bi-envelope-fill"></i><span className="hidden">Email</span></label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-input"
            placeholder="Email"
            required
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        <div className="form-group-login">
          <label className="login-password"><i id="icon" className="bi bi-lock-fill"></i><span className="hidden">Password</span></label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-input"
            placeholder="password"
            required
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
      </div>
      <button type="submit" className="login-submit">Login</button>
      <p className="text-center">Not a member?
        <Link to={'/register'} className="navigate-register"> Sign up now
          <i className="bi bi-arrow-right"></i>
        </Link></p>
        <SignInwithGoogle />
    </form>
  );
}

export default Login