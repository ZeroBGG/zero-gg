import { Routes, Route } from "react-router-dom";

import Main from "@/pages/Main";
import Record from "@/pages/Record";
import Duo from "@/pages/Duo";
import LCK from "@/pages/LCK";
import NotFound from "@/pages/NotFound";

export default function route() {
  return (
    <Routes>
      <Route path={"/"} element={<Main />} />
      <Route path={"/Record"} element={<Record />} />
      <Route path={"/Duo"} element={<Duo />} />
      <Route path={"/LCK"} element={<LCK />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
}
