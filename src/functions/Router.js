import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRecipes from "../pages/AllRecipes";
import SignIn from "../pages/SignIn";
import AddRecipe from "../pages/AddRecipe";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute/>}>
          <Route path="/addRecipe" element={<AddRecipe/>}/>
      </Route>
      <Route path='/home' element={<AllRecipes/>}/>
      <Route path="/login" element={<SignIn/>}/>
      <Route path="/" element={<SignIn/>}/>
      {/* <Route path="/page/:pageId" component={App} /> */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default Router;
