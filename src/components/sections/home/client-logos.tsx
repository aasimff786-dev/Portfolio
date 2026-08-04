"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Add more clients here as you work with them — each just needs a name and
// a logo path from /public/clients/.
const clients = [
  { name: "Hindflix", logo: "/clients/hindflix.png" },
];

const ClientLogosSection = () => {
  return (
    <section className="w-full border-y border-border/60 bg-background py-14 md:py-16">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Worked With
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-16 w-48 grayscale opacity-70 transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20 sm:w-56"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                sizes="150px"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
