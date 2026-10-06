import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blogs.jsx";
import Experience from "./pages/Experience.jsx";  
import Testimonials from "./pages/Testimonials.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

// Public page 
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    // BrowserRouter enables routing in the React application
    <BrowserRouter>
      {/* Define all application routes */}
      <Routes>
        {/* Public home page */}
        <Route
          path="/"
          element={<Home />}
        />
        
        {/* Admin login page */}
        {/* Public login route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>

          {/* Common admin layout */}
          <Route element={<AdminLayout />}>

            {/* Dashboard page */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            {/* About page */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Skills page */}
            <Route
              path="/skills"
              element={<Skills/>}
            />

            {/* Projects page */}
            <Route
              path="/projects"
              element={<Projects/> }
              />
            {/* Blog page */}
            <Route
              path="/blogs"
              element={<Blog/> }
              />
            {/* Experience page */}
            <Route
              path="/experience"
              element={<Experience/> }
              />
            {/* Testimonials page */}
            <Route
              path="/testimonials"
              element={<Testimonials/> }
              />
            {/* Services page */}
            <Route
              path="/services"
              element={<Services/> }
              />
            {/* Contact page */}
            <Route
              path="/contact"
              element={<Contact/> }
              />
          </Route>
        </Route>  
  

        {/* Redirect unknown routes to dashboard */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;