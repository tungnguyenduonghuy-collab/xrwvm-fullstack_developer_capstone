import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Sign Up</span>
        <a href="/" onClick={() => { gohome(); }} style={{ textDecoration: "none" }}>X</a>
      </div>
      <hr />
      <form onSubmit={register}>
        <div className="inputs">
          <div>
            <label htmlFor="username">Username</label><br />
            <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="first_name">First Name</label><br />
            <input type="text" name="first_name" id="first_name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label><br />
            <input type="text" name="last_name" id="last_name" placeholder="Last Name" onChange={(e) => setlastName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email</label><br />
            <input type="email" name="email" id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="psw">Password</label><br />
            <input name="psw" type="password" id="psw" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="submit_panel" style={{ marginTop: "16px" }}>
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;