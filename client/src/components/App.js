import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import ChatBot from "./pages/ChatBot";

import "../utilities.css";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatBot />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
