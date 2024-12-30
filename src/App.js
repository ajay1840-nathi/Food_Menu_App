import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import AddMeal from "./components/AddMeal";
import DetailsPage from "./components/DetailsPage";
import ListingPage from "./components/ListingPage";
import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer } from 'react-toastify';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { auth } from "./firebase"
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import SignInwithGoogle from './components/SignInWithGoogle';

function App() {
  const [user, setuser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setuser(user);
    })
  })

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={user ? <Navigate to={"/create"} /> : <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/listing' element={<ListingPage />} />
        <Route path='/signinwithgoogle' element={<SignInwithGoogle/>} />

        <Route path="/details/:id" element={<DetailsPage />} />


        <Route element={<ProtectedRoute />}>
          <Route path='/create' element={<AddMeal />} />
        </Route>
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
