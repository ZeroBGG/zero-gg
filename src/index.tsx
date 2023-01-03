import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Header from "@/components/Common/Header/Header";
import Footer from "@/components/Common/Footer/Footer";
import Main from "@/pages/Main";
import Record from "@/pages/Record";
import Duo from "@/pages/Duo";
import LCK from "@/pages/LCK";
import NotFound from "@/pages/NotFound";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={"/"} element={<Main />} />
      <Route path={"/Record"} element={<Record />} />
      <Route path={"/Duo"} element={<Duo />} />
      <Route path={"/LCK"} element={<LCK />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
