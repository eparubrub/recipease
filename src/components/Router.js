import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      {/* <Route path="/page/:pageId" component={App} /> */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
