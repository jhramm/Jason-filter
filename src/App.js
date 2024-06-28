import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import AddItem from "./components/AddItem";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Navbar /> */}
                <Content />
              </>
            }
          />
          <Route
            path="/additem"
            element={
              <>
                <Header />
                <AddItem />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
