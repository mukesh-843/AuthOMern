import React, { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import "./mix.css";


export default function Login() {
    const [passShow,setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email:"",
        password:"",
        
    });

    const history = useNavigate();

    const  setVal = (e)=>{
        //  console.log(e.target.value);
        const {name,value} = e.target;
      
        setInpval(()=>{
          return {
              ...inpval,
              [name]:value
          }
        })
      }


const loginuser = async (e) => {
    e.preventDefault();

    const {email,password} = inpval;



    if(email === ""){
        alert("please enter your mail");
    }

    else if(!email.includes("@")){
        alert("enter valid email");
    }

    else if(password === ""){
        alert("Enter your password");
    }
    else if(password.length < 6){
        alert("password must be 6 char long");
    }

    else {
      //  console.log("login successfully");

      const data = await fetch("/api/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          email, password
        })
      });
  
      const res = await data.json();
    //  console.log(res);
  
     //console.log(res.status);
  
      
  
      if(res.status === 201){
            
           localStorage.setItem("usersdatatoken",res.result.token)
           history("/dash")
          setInpval({
            ...inpval,email:"",password:""
          })
      }


    }
}



  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Login In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email" value={inpval.email} onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                    {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

        <button className="btn" onClick={loginuser}>Login</button>
        <p>
            Don't have an Account? <NavLink to ="/register">Signup</NavLink>
        </p>

          </form>
        </div>
      </section>
    </>
  );
}
