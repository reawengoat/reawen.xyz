"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  delay?: number;
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}