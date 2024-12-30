import React from "react";
import '../css/FormPage.css'
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from '../firebase'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.min.css';
import SignInwithGoogle from "./SignInWithGoogle";


const Register = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            name: values.name
          })
          toast.success("User Registered Successfully!!", { position: "top-center" })
          navigate('/listing');
          //
          // window.localStorage.setItem("loggedIn", true);
        }
        resetForm();
      } catch (error) {
        toast.error(error.message, { position: "bottom-center" })
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form-login login">
      <h3 className="title-container">Register</h3>
      <div>
        <div className="form-group-login">
          <label className="login-name"><i id="icon" className="bi bi-person-fill"></i><span class="hidden">Name</span></label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-input"
            placeholder="Name"
            required
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
        <div className="form-group-login">
          <label className="login-email"><i id="icon" className="bi bi-envelope-fill"></i><span class="hidden">Email</span></label>
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
          <label className="login-password"><i id="icon" className="bi bi-lock-fill"></i><span class="hidden">Password</span></label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-input"
            placeholder="Password"
            required
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit" className="login-submit">Sign Up</button>
      <p className="text-center">Have an Account?
        <Link to={'/login'} className="navigate-register"> Login Here
          <i class="bi bi-arrow-right"></i>
        </Link></p>
      <SignInwithGoogle />
    </form>
  );
}

export default Register