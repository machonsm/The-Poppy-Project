"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

export function AnimatedBiography({ name, role, bio }: { name: string; role: string; bio: string }) {
  const [open, setOpen] = useState(true);
  const id = useId();
  const reduced = useReducedMotion();
  const motionOff = reduced || (typeof document !== "undefined" && document.documentElement.dataset.motion === "off");
  return <div className={`pp-team__bio${open ? " is-open" : ""}`}>
    <h3><button type="button" className="pp-team__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <span>{name}<span className="pp-team__role">{role}</span></span><Plus size={22} aria-hidden="true" />
    </button></h3>
    <motion.div id={id} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: motionOff ? 0 : .38, ease: [.22, 1, .36, 1] }} inert={!open} aria-hidden={!open} style={{ overflow: "hidden" }}>
      <div className="pp-team__description"><p>{bio}</p></div>
    </motion.div>
  </div>;
}
