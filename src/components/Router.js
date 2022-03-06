import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AddRecipe from "./AddRecipe";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/addRecipe" element={<AddRecipe/>}/>
      {/* <Route path="/page/:pageId" component={App} /> */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default Router;
