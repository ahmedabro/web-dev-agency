import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";
import useNavLinks from "../hooks/useNavLinks";
import { Link } from "react-router";

const Footer = () => {
  const navLinks = useNavLinks()

  const socialLinks = [
    {
      name: "GitHub",
      href: `${import.meta.env.VITE_GITHUB_URL}`,
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: `${import.meta.env.VITE_LINKEDIN_URL}`,
      icon: FaLinkedinIn,
    },
    {
      name: "Email",
      href: `mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`,
      icon: MdEmail,
    },
    {
        name: "Phone",
        href: `tel:${import.meta.env.VITE_PHONE_NUMBER}`,
        icon: MdPhoneInTalk,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#37e062]/5 blur-[120px]" />

      <div className="section-container relative">
        {/* ================= CTA ================= */}
        <section className="relative flex min-h-[650px] flex-col items-center justify-center overflow-hidden border-b border-white/10 py-32 text-center">
          {/* Giant background A.F */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <span className="whitespace-nowrap text-[180px] font-black leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[260px] md:text-[360px] lg:text-[460px]">
              A.F
            </span>
          </motion.div>

          {/* Small label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#37e062]"
          >
            Have an idea?
          </motion.p>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Let&apos;s build
            <br />
            <span className="text-[#37e062]">something great.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative mt-8 max-w-xl text-base leading-7 text-white/55 md:text-lg"
          >
            Have a project, an idea, or a problem that needs solving?
            Let&apos;s turn it into a fast, scalable web experience.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#37e062] px-7 py-4 font-semibold text-[#111111]"
          >
            <span className="relative z-10">Start a Project</span>

            <motion.span
              variants={{
                hover: {
                  x: 4,
                  y: -4,
                },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative z-10"
            >
              <LuArrowUpRight size={20} />
            </motion.span>

            {/* Hover fill */}
            <motion.span
              variants={{
                hover: {
                  scale: 1,
                },
              }}
              initial={{ scale: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 origin-bottom-left rounded-full bg-white"
            />
          </motion.a>
        </section>

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid gap-16 py-20 md:grid-cols-[1.5fr_1fr_1fr] lg:py-24">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              <Link to="/"><img src="/images/logo.png" alt="A.F Dev" className="w-40" /></Link>
            </motion.div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
              From frontend to full-stack, I build high-quality digital experiences designed for performance, usability, and growth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Navigation
            </p>

            <nav className="flex flex-col items-start gap-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 6 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  
                >
                  <Link to={link.path} className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
                  <span>{link.name}</span>

                  <LuArrowUpRight
                    size={14}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Connect
            </p>

            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={
                      social.name === "Email" ? undefined : "_blank"
                    }
                    rel={
                      social.name === "Email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    whileHover={{ x: 6 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    className="group flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <Icon
                      size={17}
                      className="transition-colors group-hover:text-[#37e062]"
                    />

                    <span>{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} A.F Dev. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {/* <span>Built with React</span> */}

            <motion.a
              href="#home"
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 transition-colors hover:text-[#37e062]"
            >
              Back to top
              <LuArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;