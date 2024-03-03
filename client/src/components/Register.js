import "./mix.css";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";


const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    //  console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;
    if (fname === "") {
      alert("please enter your name");
    } else if (email === "") {
      alert("please enter your mail");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("Enter your password");
    } else if (password.length < 6) {
      alert("password must be 6 char long");
    } else if (cpassword === "") {
      alert("Enter your password");
    } else if (cpassword.length < 6) {
      alert("password must be 6 char long");
    } else if (password !== cpassword) {
      alert("password and confirm password are not matching");
    } else {
      //  console.log("user registration successfully done");

      const data = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();

      // console.log(res.status);

      //console.log(res);

      if (res.status === 201) {
        alert("user registration done");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>To use are platform. Please sign up.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                onChange={setVal}
                value={inpval.fname}
                id="fname"
                placeholder="Enter your name"
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setcPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign up
            </button>
            <p>
              Already have an account? <NavLink to="/">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register