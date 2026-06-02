import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ServiceDetail from "./pages/ServiceDetail";
import BlogDetails from "./pages/BlogDetails";
import Unsubscribe from "./pages/Unsubscribe";
import Inbox from "./pages/Inbox";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from './components/AdminBlogs'
import AdminCreateNewBlog from './components/AdminCreateNewBlog'

const App = () => {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested inside Layout */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<Portfolio />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="unsubscribe/:token" element={<Unsubscribe />} />
          <Route path="signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="inbox" element={<Inbox />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/create" element={<AdminCreateNewBlog />} />  
              <Route path="blogs/:id/edit" element={<AdminCreateNewBlog />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
