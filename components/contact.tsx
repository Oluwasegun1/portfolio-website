/** Contact — rich layout with floating-label inputs, availability status, and animated success state. */
"use client";

import type React from "react";
import { useState, useRef, useId } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Floating label input ───
interface FloatingInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

/** Input with CSS-animated floating label that lifts on focus/fill */
function FloatingInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete="off"
        className="peer w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/30 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isLifted
            ? "top-1.5 text-[10px] font-semibold text-violet-400"
            : "top-4 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

// ─── Floating label textarea ───
interface FloatingTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  maxLength?: number;
}

/** Textarea with floating label and character counter */
function FloatingTextarea({
  id,
  name,
  label,
  value,
  onChange,
  required,
  maxLength = 500,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={5}
        maxLength={maxLength}
        className="peer w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pt-8 pb-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/30 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isLifted
            ? "top-2 text-[10px] font-semibold text-violet-400"
            : "top-5 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
      {/* Character counter */}
      <span className="absolute bottom-3 right-4 text-[10px] text-muted-foreground/60">
        {value.length}/{maxLength}
      </span>
    </div>
  );
}

// ─── Contact info item ───
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
      <Wrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-4 group"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all duration-200 group-hover:bg-violet-500/20 group-hover:border-violet-500/40">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold text-foreground">{value}</p>
        </div>
      </Wrapper>
    </motion.div>
  );
}

// ─── Main component ───
export default function Contact() {
  const uid = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  /** Form field state */
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await emailjs.send(
        "service_o378fdi",
        "template_gb0z2ch",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Ogunbanjo Segun",
        },
        "P976aQ5n9mW_z0XaS"
      );
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch {
      setError("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/6 blur-[120px]" />
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Great</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Have a project in mind, or just want to say hello? I&apos;d love to
            hear from you.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.4fr]">
          {/* Left — contact info */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  Available for work
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently open to freelance projects and full-time roles. My
                response time is typically within 24 hours.
              </p>
            </div>

            {/* Contact details */}
            <div className="glass-card flex flex-col gap-5 rounded-2xl p-6">
              <ContactItem
                icon={Mail}
                label="Email"
                value="ogunbanjosegun@gmail.com"
                href="mailto:ogunbanjosegun@gmail.com"
              />
              <div className="h-px bg-white/5" />
              <ContactItem
                icon={Phone}
                label="Phone"
                value="+234 704 299 1133"
                href="tel:+2347042991133"
              />
              <div className="h-px bg-white/5" />
              <ContactItem
                icon={MapPin}
                label="Location"
                value="Lekki, Lagos — Nigeria"
              />
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Find me online
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/Oluwasegun1",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://x.com/OgunbanjoSegun2",
                    icon: Twitter,
                    label: "X / Twitter",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted-foreground transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            className="glass-card relative overflow-hidden rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Gradient accent top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

            <h3 className="font-display mb-6 text-xl font-bold">
              Send a Message
            </h3>

            {/* Success overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl bg-background/90 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40"
                  >
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-display text-xl font-bold text-foreground">
                      Message Sent!
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FloatingInput
                id={`${uid}-name`}
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FloatingInput
                id={`${uid}-email`}
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FloatingTextarea
                id={`${uid}-message`}
                name="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #06b6d4 100%)",
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
