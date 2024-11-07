
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChangePassword } from "./Components/ChangePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TotalResponsesProvider } from "./TotalResponsesContext";
import Logoprac from "./Components/Logoprac";
import Signupp from "./Components/Signupp";
import IndividualTrack from "./Components/Table/livetrack/IndividualTrack";
ReactDOM.createRoot(document.getElementById("root")).render(
    <TotalResponsesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/salesman/:deviceId/:category/:name" element={<IndividualTrack />} />
          <Route path="/Login" element={<Logoprac/>} />
          <Route path="/signup" element={<Signupp/>} />
          <Route path="/ChangePassword" element={<ChangePassword />} />

        </Routes>
      </BrowserRouter>
    </TotalResponsesProvider>
);
