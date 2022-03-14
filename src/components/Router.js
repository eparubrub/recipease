import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import AddRecipe from "./AddRecipe";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute/>}>
          <Route path="/addRecipe" element={<AddRecipe/>}/>
      </Route>
      <Route path='/home' element={<App/>}/>
      <Route path="/login" element={<SignIn/>}/>
      {/* <Route path="/page/:pageId" component={App} /> */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default Router;
