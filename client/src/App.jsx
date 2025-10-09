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
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
