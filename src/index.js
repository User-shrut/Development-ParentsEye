// import React from "react";
// import ReactDOM from "react-dom/client";
// // import axios from "axios";
// import App from "./App";
// // import { AnalyticsDashboard } from "./Components/VariousTables/Home/Analytics";

// import { Login } from "./Components/Login";
// import { Signup } from "./Components/Signup";
// import { ChangePassword } from "./Components/ChangePassword";
// // import { SettingsComp } from "./Components/VariousTables/Maintenance/Settings";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { TotalResponsesProvider } from "./TotalResponsesContext";

// // window.axios = axios;
// // window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// // window.axios.defaults.baseURL = "http://localhost:5000/api";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/ChangePassword" element={<ChangePassword />} />
//         {/* <Route path="/Settings" element={<SettingsComp />} /> */}
//         {/* <Route path="/Analytics" element={<AnalyticsDashboard />} /> */}
          
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
// );


//changed code
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { Login } from "./Components/Login";
// import { Signup } from "./Components/Signup";
import { ChangePassword } from "./Components/ChangePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TotalResponsesProvider } from "./TotalResponsesContext";
import Logoprac from "./Components/Logoprac";
import Signupp from "./Components/Signupp";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TotalResponsesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ChangePassword" element={<ChangePassword />} /> */}
          <Route path="/Login" element={<Logoprac/>} />
          <Route path="/signup" element={<Signupp/>} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </TotalResponsesProvider>
  </React.StrictMode>
);
