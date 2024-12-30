import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleimg from '../assets/images/googleimg1.png'
import '../css/FormPage.css'
import {  useNavigate } from "react-router-dom"


function SignInwithGoogle() {
    const navigate = useNavigate();

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName,
        });
        window.localStorage.setItem("loggedIn", true);
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        navigate('/listing')
      }
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleimg} alt="googleimage" className="signinwith-container" />

      </div>
    </div>
  );
}
export default SignInwithGoogle;