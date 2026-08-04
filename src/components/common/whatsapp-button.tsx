"use client";

import { motion } from "framer-motion";

// TODO: update if the number changes
const WHATSAPP_NUMBER = "917861888848"; // +91 7861888848, no spaces/plus for wa.me
const DEFAULT_MESSAGE = "Hi Aasim! I found your portfolio and I'd like to talk about a project.";

const WhatsAppButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE,
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 sm:bottom-8 sm:right-8"
    >
      {/* Subtle pulse ring to draw the eye without being obnoxious */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping [animation-duration:2.5s]" />

      <svg
        viewBox="0 0 32 32"
        className="relative h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 0C7.164 0 0 7.163 0 16c0 2.822.738 5.583 2.14 8.012L.06 32l8.2-2.148A15.9 15.9 0 0 0 16.004 32C24.84 32 32 24.837 32 16S24.84 0 16.004 0Zm0 29.09a13.03 13.03 0 0 1-6.646-1.822l-.477-.283-4.867 1.275 1.3-4.746-.31-.487A13.02 13.02 0 0 1 2.91 16c0-7.216 5.874-13.09 13.094-13.09 7.216 0 13.086 5.874 13.086 13.09 0 7.22-5.87 13.09-13.086 13.09Zm7.17-9.802c-.393-.196-2.325-1.147-2.686-1.278-.36-.13-.622-.196-.884.196-.262.393-1.014 1.278-1.243 1.54-.229.262-.458.295-.85.098-.393-.196-1.657-.61-3.156-1.947-1.167-1.04-1.955-2.325-2.184-2.718-.229-.393-.024-.605.172-.8.177-.176.393-.458.59-.687.196-.229.261-.393.392-.655.13-.262.065-.49-.033-.687-.098-.196-.884-2.13-1.212-2.917-.319-.767-.644-.663-.884-.676-.229-.01-.49-.012-.752-.012-.262 0-.687.098-1.047.49-.36.393-1.375 1.343-1.375 3.277 0 1.933 1.408 3.801 1.604 4.063.196.262 2.771 4.233 6.716 5.934.938.405 1.67.647 2.24.828.941.3 1.797.257 2.474.156.755-.113 2.325-.95 2.653-1.868.328-.917.328-1.703.229-1.868-.098-.164-.36-.262-.752-.458Z" />
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;
