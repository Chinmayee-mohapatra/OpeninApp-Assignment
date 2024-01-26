import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import LOGO from "../assests/Ellipse 111.png";
import {
  FaApple,
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // According to Sign IN or Sign Up, we can validate the form data.

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    // Once its valid email an password, we can proceed for SignIn or SignUP

    if (message) return;

    if (!isSignInForm) {
      // SIGNUP logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          navigate("/browse/upload");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // SIGNIN logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
          console.log(localStorage);
          navigate("/browse/upload");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="flex w-screen h-screen ">
      <div className=" w-1/4 md:w-1/3 lg:w-1/2 h-full bg-[#F8FAFF]">
        <div
          className="w-full h-full flex flex-col justify-evenly sm:justify-around px-2 sm:px-6 md:px-10 py-2 md:py-4"
          style={{
            backgroundColor: "#605BFF",
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
          }}
        >
          <div className=" w-16 md:w-20">
            <img src={LOGO} alt="logo" />
          </div>
          <div className="font-bold text-3xl md:text-5xl lg:text-7xl text-white flex justify-center uppercase">
            BASE
          </div>
          <div className="flex justify-center gap-2 sm:gap-4">
            <FaGithub
              className=" w-2 h-2 sm:w-4 sm:h-4 md:w-8 md:h-8"
              fill="white"
            />
            <FaTwitter
              className=" w-2 h-2 sm:w-4 sm:h-4 md:w-8 md:h-8"
              fill="white"
            />
            <FaLinkedin
              className=" w-2 h-2 sm:w-4 sm:h-4 md:w-8 md:h-8"
              fill="white"
            />
            <FaDiscord
              className=" w-2 h-2 sm:w-4 sm:h-4 md:w-8 md:h-8"
              fill="white"
            />
          </div>
        </div>
      </div>
      <div className="w-3/4 md:w-2/3 lg:w-1/2 px-5 sm:px-10 md:px-20 py-2 md:py-4 flex flex-col gap-5 md:gap-10 justify-center bg-[#F8FAFF]">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          {isSignInForm ? (
            <p>
              Sign In <br />
              <span className="font-normal text-sm md:text-base">
                Sign in to your account
              </span>
            </p>
          ) : (
            <p>
              Sign Up <br />
              <span className="font-normal text-sm md:text-base">
                Register to have a new account
              </span>
            </p>
          )}
        </h1>
        <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-2 justify-around">
          <button className="flex items-center gap-2 bg-white px-2 md:px-4 py-1 md:py-2 rounded-md shadow-sm">
            <FcGoogle /> Sign in with Google
          </button>
          <button className="flex items-center gap-2 bg-white px-2 md:px-4 py-1 md:py-2 rounded-md shadow-sm">
            <FaApple /> Sign in with Apple
          </button>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-full md:w-2/3 flex flex-col gap-3 md:gap-6 items-start bg-white rounded-lg shadow-md p-4"
        >
          {!isSignInForm && (
            <div className="flex flex-col gap-2 w-full">
              <label>Username</label>
              <input
                ref={userName}
                type="text"
                placeholder="Username"
                className="w-full bg-[#EAEAEA] py-2 px-4 rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 w-full">
            <label>Email address</label>
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="bg-[#EAEAEA] py-2 px-4 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Password</label>
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="bg-[#EAEAEA] py-2 px-4 rounded-md"
            />
          </div>
          <p
            className={`${
              errorMessage && "text-red-500 font-semibold px-1 my-2"
            } `}
          >
            {errorMessage}
          </p>
          <p className="text-[#346BD4] font-medium cursor-pointer">
            Forgot password?
          </p>
          <button
            className=" w-full bg-[#605BFF] text-white py-2 px-4 font-semibold rounded-md hover:scale-105 duration-200 shadow-sm hover:shadow-md "
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div
          className=" text-[#858585] cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? (
            <div>
              Don't have an account?{" "}
              <span className="text-[#346BD4] font-medium">Register here.</span>
            </div>
          ) : (
            <div>
              Already Registered.{" "}
              <span className="text-[#346BD4] font-medium">Sign In now.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
