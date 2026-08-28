import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
import AdminBlogs from "./components/AdminBlogs";
import AdminCreateNewBlog from "./components/AdminCreateNewBlog";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);
  
  useEffect(() => {
    

    const lenis = new Lenis({
      lerp: 0.04,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis

    // Keep ScrollTrigger updated
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP with Lenis
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null
    };


  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop lenisRef={lenisRef} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<Portfolio />} />

          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />

          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="blogs/:id" element={<BlogDetails />} /> */}

          <Route path="contact" element={<Contact />} />

          <Route path="unsubscribe/:token" element={<Unsubscribe />} />

          <Route path="signin" element={<SignIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="inbox" element={<Inbox />} />
              {/* <Route path="blogs" element={<AdminBlogs />} /> */}
              {/* <Route
                path="blogs/create"
                element={<AdminCreateNewBlog />}
              />
              <Route
                path="blogs/:id/edit"
                element={<AdminCreateNewBlog />}
              /> */}
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;