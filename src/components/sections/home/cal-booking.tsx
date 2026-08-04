"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PhraseAnimation from "@/components/common/phrase-reveal";
import { Mail, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917861888848";
const EMAIL = "aasimff786@gmail.com";

const CalBooking = () => {
  const containerRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Logic
  const yCard = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full py-10 md:py-20 overflow-hidden px-4 md:px-8"
    >
      {/* Heading with scroll-triggered reveal */}
      <div
        ref={headerRef}
        className="container relative z-10 mb-16 px-6 text-center mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-medium text-primary uppercase tracking-widest"
        >
          Let&apos;s talk
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <PhraseAnimation phrase="Let's  Make  Something " />
            <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              <PhraseAnimation
                phrase="Awesome  Together"
                className="text-primary"
              />
            </span>
          </h3>
        </motion.div>

        {/* Sweeping line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="mx-auto mt-6 h-px max-w-xs bg-linear-to-r from-primary/60 via-primary/20 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Tell me about your project — I usually reply within a few hours.
        </motion.div>
      </div>

      {/* CTA cards */}
      <motion.div
        style={{ y: yCard }}
        className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row"
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hi Aasim! I found your portfolio and I'd like to talk about a project.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center gap-4 rounded-2xl border border-border bg-muted/30 p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
            <MessageCircle className="size-5 text-[#25D366]" />
          </span>
          <span>
            <span className="block font-semibold text-foreground">
              Message on WhatsApp
            </span>
            <span className="block text-sm text-muted-foreground">
              Fastest way to reach me
            </span>
          </span>
        </a>

        <a
          href={`mailto:${EMAIL}`}
          className="group flex flex-1 items-center gap-4 rounded-2xl border border-border bg-muted/30 p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <Mail className="size-5 text-primary" />
          </span>
          <span>
            <span className="block font-semibold text-foreground">
              Send an Email
            </span>
            <span className="block text-sm text-muted-foreground">
              {EMAIL}
            </span>
          </span>
        </a>
      </motion.div>
    </div>
  );
};

export default CalBooking;

