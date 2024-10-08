import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import RestoList from "./components/RestoList";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";

const Router = () => {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} index />
            <Route path="/create_account/" element={<SignUp />} />
            <Route path="/new_account/" element={<Welcome />} />
            <Route path="/restaurant_list/" element={<RestoList />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
};

export default Router;
