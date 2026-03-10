import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import FetchPost from "./pages/FetchPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/feed" element={<FetchPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;