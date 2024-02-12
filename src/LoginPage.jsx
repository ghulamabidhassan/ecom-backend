import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [signUp, setSignUp] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: 0,
    designation: "",
    assignTable: "",
  });

  const inputValues = (e) => {
    const type = e.currentTarget.dataset.type;
    const value = e.currentTarget.value;
    setUser({ ...user, [type]: value });
  };

  const Login = () => {
    setSignUp(false);

    if (!user.username || !user.password) {
      alert("Type Username & Password");
    }

    axios.post("/.netlify/functions/server/login", user);
  };

  const SignUp = () => {
    setSignUp(true);
  };

  return (
    <div className="login-page">
      {signUp ? (
        <div>
          <h2>Sign Up page</h2>
          <div>
            <label htmlFor="">Email ID</label>
            <input
              required
              data-type="username"
              onKeyUp={inputValues}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">Username</label>
            <input
              required
              data-type="username"
              onKeyUp={inputValues}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">Role</label>
            <select name="" id="">
              <option value="">User</option>
              <option value="">Supervisor</option>
              <option value="">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              required
              data-type="password"
              onKeyUp={inputValues}
              type="password"
            />
          </div>
        </div>
      ) : (
        <div>
          <h2>Login Page</h2>
          <div>
            <label htmlFor="">Username</label>
            <input
              required
              data-type="username"
              onKeyUp={inputValues}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              required
              data-type="password"
              onKeyUp={inputValues}
              type="password"
            />
          </div>
        </div>
      )}

      <div className="btns">
        <button onClick={Login}>Login</button>
        <button onClick={SignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
