"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Self-assessed skill levels — tweak these numbers whenever you feel like it.
const skills = [
  { name: "Video Editing", level: 90 },
  { name: "Motion Graphics", level: 82 },
  { name: "Graphic Design", level: 85 },
  { name: "Color Grading & Correction", level: 78 },
  { name: "Adobe Premiere Pro", level: 90 },
  { name: "Adobe After Effects", level: 80 },
  { name: "Adobe Photoshop", level: 85 },
  { name: "Adobe Illustrator", level: 78 },
];

const SkillBarsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 w-fit rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary"
          >
            Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-black uppercase tracking-tighter md:text-6xl"
          >
            My <span className="text-primary">Skills.</span>
          </motion.h2>
        </div>

        <div ref={sectionRef} className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: skill.level / 100 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full origin-left rounded-full bg-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillBarsSection;
