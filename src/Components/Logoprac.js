import React, { useContext, useState } from "react";
import "./Logoprac.css";
import logoimg from "./images/new_logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { Signupp } from "./Signupp.jsx";
import { useNavigate } from "react-router-dom";
import { TotalResponsesContext } from "../TotalResponsesContext.jsx";
const Logoprac = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useContext(TotalResponsesContext);
  const navigate = useNavigate(); // Initialize the navigate function
  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleLoginClick = async () => {
  //   try {
  //     // First API call for superadmin
  //     let response = await axios.post(
  //       "https://schoolmanagement-3-6kj4.onrender.com/superadmin/login",
  //       { username, password }
  //     );
  //     if (response.data && response.data.token) {
  //       localStorage.setItem("token", response.data.token);
  //       setRole(1);
  //       navigate("/");
  //       alert("Super Admin login successful");
  //       return;
  //     }

  //     // Second API call for school
  //     response = await axios.post(
  //       "https://schoolmanagement-3-6kj4.onrender.com/school/login",
  //       { username, password }
  //     );
  //     if (response.data && response.data.token) {
  //       localStorage.setItem("token", response.data.token);
  //       setRole(2);
  //       navigate("/");
  //       alert("School login successful");
  //       return;
  //     }

  //     // Third API call for branch
  //     response = await axios.post(
  //       "https://schoolmanagement-1-1ns9.onrender.com/branch/login",
  //       { username, password }
  //     );
  //     if (response.data && response.data.token) {
  //       localStorage.setItem("token", response.data.token);
  //       setRole(3);
  //       navigate("/");
  //       alert("Branch login successful");
  //       return;
  //     }

  //     // If none of the roles matched, show an error
  //     alert("Incorrect username or password!");
  //   } catch (error) {
  //     console.error("There was an error logging in!", error);
  //     alert("Incorrect username or password!");
  //   }
  // };

  const handleLoginClick = async () => {
    const login = async (url, roleValue, successMessage) => {
      try {
        const response = await axios.post(url, { username, password });
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          setRole(roleValue);
          navigate("/");
          alert(successMessage);
          return true;
        }
      } catch (error) {
        // This catches errors specific to this login attempt
        console.error(`Login attempt to ${url} failed:`, error);
      }
      return false;
    };
  
    try {
      // Sequentially try to log in as superadmin, school, or branch
      if (
        await login(
          `${process.env.REACT_APP_SUPER_ADMIN_API}/login`,
          1,
          "Super Admin login successful"
        )
      )
        return;
      if (
        await login(
          "https://schoolmanagement-6-ts84.onrender.com/school/login",
          2,
          "School login successful"
        )
      )
        return;
      if (
        await login(
          "https://schoolmanagement-6-ts84.onrender.com/branch/login",
          3,
          "Branch login successful"
        )
      )
        return;
  
      // If no role matched, show an error
      alert("Incorrect username or password!");
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // const handleLoginClick = () => {
  //   console.log('button of login has been clicked');
  //   console.log(username, password);

  //   // Define all API requests
  //   const superAdminLogin = axios.post("https://schoolmanagement-2-56zr.onrender.com/superadmin/login", { username, password });
  //   const schoolLogin = axios.post("https://schoolmanagement-2-56zr.onrender.com/school/login", { username, password });
  //   const branchLogin = axios.post("https://schoolmanagement-1-1ns9.onrender.com/branch/login", { username, password });

  //   // Run all requests concurrently
  //   Promise.all([superAdminLogin, schoolLogin, branchLogin])
  //     .then(responses => {
  //       // Check which response has a valid role
  //       for (let response of responses) {
  //         if (response && response.data && response.data.token) {
  //           console.log(response.data);
  //           localStorage.setItem("token", response.data.token);

  //           if (response.data.role === "superadmin") {
  //             setRole(1);
  //             navigate('/');
  //             alert('Super Admin login successful');
  //             return;
  //           } else if (response.data.role === "school") {
  //             setRole(2);
  //             navigate('/');
  //             alert('School login successful');
  //             return;
  //           } else if (response.data.role === "branch") {
  //             setRole(3);
  //             navigate('/');
  //             alert('Branch login successful');
  //             return;
  //           }
  //         }
  //       }

  //       // If no valid role is found, show an error
  //       alert('Incorrect username or password!');
  //     })
  //     .catch(error => {
  //       console.error("There was an error logging in!", error);
  //       alert('Incorrect username or password!');
  //     });
  // };

  // const handleLoginClick = () => {
  //   console.log("button of login has been clicked");
  //   console.log(username, password);
  //   axios
  //     .post("https://schoolmanagement-2-56zr.onrender.com/superadmin/login", {
  //       username,
  //       password,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       console.log(username, password);
  //       // Store the token in local storage or state
  //       localStorage.setItem("token", response.data.token);

  //       if (response.data.role == "superadmin") {
  //         setRole(1);
  //       } else if (response.data.role == "school") {
  //         setRole(2);
  //       } else if (response.data.role == "branch") {
  //         setRole(3);
  //       }
  //       // Redirect or update the UI as needed
  //       navigate("/");
  //       alert("login successful as admin");
  //     })
  //     .catch((error) => {
  //       axios
  //         .post("https://schoolmanagement-2-56zr.onrender.com/school/login", {
  //           username,
  //           password,
  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //           console.log(username, password);
  //           // Store the token in local storage or state
  //           localStorage.setItem("token", response.data.token);

  //           if (response.data.role == "superadmin") {
  //             setRole(1);
  //           } else if (response.data.role == "school") {
  //             setRole(2);
  //           } else if (response.data.role == "branch") {
  //             setRole(3);
  //           }
  //           // Redirect or update the UI as needed
  //           navigate("/");
  //           alert("login successful");
  //         });
  //     });
  // };

  return (
    <div className="login-fix">
      <div className="yellow-back">
        <div className="logo-login">
          <img src={logoimg} alt="" />
        </div>
      </div>
      <div className="white-back">
        <div className="login-form">
          <form>
            <div className="login-heading">
              <h2>Login With username ID</h2>
            </div>

            <div data-mdb-input-init className="form-outline mb-4 setinput">
              <input
                type="username"
                id="form2Example1"
                className="form-control"
                placeholder="Enter Your username"
                value={username}
                autoComplete="username"
                onChange={handleusernameChange}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4 setinput">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                placeholder="password"
                value={password}
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="nedd-sign">
              <div>
                <a href="/">Need Help ?</a>
              </div>
              <div className="button-col">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-block mb-4"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Logoprac;
