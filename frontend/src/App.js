import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/layouts/Index";
import Home from "./views/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
