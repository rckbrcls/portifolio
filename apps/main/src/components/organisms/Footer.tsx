"use client";

import Link from "next/link";
import React from "react";
import { Text } from "@/components/atoms/Text";
import SubTitle from "@/components/atoms/SubTitle";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    {
      path: "/",
      name: "🏠 Home",
    },
    {
      path: "/projects",
      name: "💼 Projects",
    },
    {
      path: "/about-me",
      name: "👨‍💻 About Me",
    },
    {
      path: "/contact",
      name: "📬 Contact",
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/rckbrcls",
      icon: <AiFillGithub className="text-2xl" />,
      name: "GitHub",
    },
    {
      href: "https://linkedin.com/in/brcls",
      icon: <AiFillLinkedin className="text-2xl" />,
      name: "LinkedIn",
    },
    {
      href: "mailto:erickbarcelosdev@gmail.com",
      icon: <AiFillMail className="text-2xl" />,
      name: "Email",
    },
  ];

  return (
    <footer className="glass-dark border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <div className="space-y-4">
            <SubTitle className="text-lg" gradient>
              Erick Barcelos
            </SubTitle>
            <Text className="text-sm leading-relaxed text-gray-400">
              Junior software developer passionate about building creative
              projects and learning new technologies. Always exploring and
              growing!
            </Text>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <SubTitle className="text-lg text-gray-200">Navigation</SubTitle>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <SubTitle className="text-lg text-gray-200">Let's Connect</SubTitle>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-200 hover:text-purple-400"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <Text className="text-xs leading-relaxed text-gray-500">
              Open to collaborations and always excited to discuss new ideas!
            </Text>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800/50 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Text className="text-xs text-gray-500">
              © {currentYear} Erick Patrick Barcelos. Built with Next.js & lots
              of ☕
            </Text>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Text className="text-xs">Made with passion in Brazil 🇧🇷</Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
