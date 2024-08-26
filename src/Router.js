import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import RestoList from "./components/RestoList";
import SignUp from "./components/SignUp";
import PrivateRoutes from "./components/PrivateRoutes";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} index />
          <Route path="/create_account/" element={<SignUp />} />
          <Route path="/restaurant_list/" element={<RestoList />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/restaurant_list/" element={<RestoList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
