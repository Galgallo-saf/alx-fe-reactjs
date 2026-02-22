import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BlogPost from "./components/BlogPost";

function Home() {
  return <h2>Home Page</h2>;
}

function Profile() {
  return <h2>Profile Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog/1">Blog 1</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;