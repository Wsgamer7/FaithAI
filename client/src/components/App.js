import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound";
import ChatBot from "./pages/ChatBot";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import "../utilities.css";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userAvater, setUserAvater] = useState(undefined);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    console.log(`avatar: ${decodedCredential.picture}`);

    // setUserId("user");
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
    setUserAvater(decodedCredential.picture);
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChatBot
            userId={userId}
            userAvater={userAvater}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
