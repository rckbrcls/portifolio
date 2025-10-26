"use client";

import React from "react";
import { Text } from "@/components/atoms/Text";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark border-t border-gray-800/50">
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Text className="text-xs text-gray-500">
            © {currentYear} Erick Barcelos.
          </Text>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Text className="text-xs">Made in Brazil 🇧🇷</Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
