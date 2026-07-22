import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./LoginForm.jsx";
import Notes from "./Notes.jsx";
import { Routes , Route } from "react-router-dom";
import Signup from "./signup.jsx";
const App = () => {
  return (
    <Routes>
        <Route path="/" element = {<Signup/>}/>
        <Route path="/login" element = {<LoginForm/>}/>
        <Route path="/notes" element = {<Notes/>}/>
    </Routes>
  );
};
export default App;
