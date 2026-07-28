/** Contact — validated form (react-hook-form + zod) with floating labels, a honeypot spam trap, and accessible status announcements. */
"use client";

import type React from "react";
import { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "That's a bit long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(500, "Keep it under 500 characters"),
  // Honeypot — real users never see or fill this; a filled value means a bot submitted the form
  company: z.string().max(0, "").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── Floating label input ───
interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, id, ...rest }, ref) => (
    <div>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "peer w-full rounded-xl border bg-accent/30 px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-colors placeholder-transparent",
            error
              ? "border-destructive/60 focus:ring-1 focus:ring-destructive/40"
              : "border-border focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          )}
          {...rest}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-150 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
);
FloatingInput.displayName = "FloatingInput";

// ─── Floating label textarea ───
interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  currentLength: number;
  maxLength: number;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, id, currentLength, maxLength, ...rest }, ref) => (
    <div>
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          placeholder={label}
          rows={5}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "peer w-full resize-none rounded-xl border bg-accent/30 px-4 pt-8 pb-4 text-sm text-foreground outline-none transition-colors placeholder-transparent",
            error
              ? "border-destructive/60 focus:ring-1 focus:ring-destructive/40"
              : "border-border focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          )}
          {...rest}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-5 text-sm text-muted-foreground transition-all duration-150 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold"
        >
          {label}
        </label>
        <span className="absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground/60">
          {currentLength}/{maxLength}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
);
FloatingTextarea.displayName = "FloatingTextarea";

// ─── Contact info item ───
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  onCopy,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <div className="group flex items-center gap-4">
      <Wrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="focus-ring flex flex-1 items-center gap-4 rounded-xl"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold text-foreground">{value}</p>
        </div>
      </Wrapper>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

// ─── Main component ───
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  // Composed with register's own onChange so the character counter stays in sync
  // without subscribing the whole form to react-hook-form's watch() API
  const messageField = register("message", {
    onChange: (evt) => setMessageLength(evt.target.value.length),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message.");

      setIsSubmitted(true);
      setStatusAnnouncement("Message sent successfully. I'll get back to you within 24 hours.");
      reset();
      setMessageLength(0);
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message.";
      setSubmitError(message);
      setStatusAnnouncement(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <section id="contact" className="relative py-24" ref={sectionRef}>
      {/* Screen-reader-only live region — announces submit outcome even though the visual state is animated */}
      <div aria-live="polite" className="sr-only">
        {statusAnnouncement}
      </div>

      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-3">Contact</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Let&apos;s Build Something <span className="text-primary">Great</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Have a project in mind, or just want to say hello? I&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* Left — contact info */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="rounded-2xl border border-border p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <span className="text-sm font-semibold text-success">Available for work</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Currently open to freelance projects and full-time roles. My response time is
              typically within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-border p-6">
            <ContactItem
              icon={Mail}
              label="Email"
              value="ogunbanjosegun@gmail.com"
              href="mailto:ogunbanjosegun@gmail.com"
              onCopy={() => copyToClipboard("ogunbanjosegun@gmail.com", "Email")}
            />
            <div className="h-px bg-border" />
            <ContactItem
              icon={Phone}
              label="Phone"
              value="+234 704 299 1133"
              href="tel:+2347042991133"
              onCopy={() => copyToClipboard("+2347042991133", "Phone number")}
            />
            <div className="h-px bg-border" />
            <ContactItem icon={MapPin} label="Location" value="Lekki, Lagos — Nigeria" />
          </div>

          <div className="rounded-2xl border border-border p-6">
            <p className="font-mono mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Find me online
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://github.com/Oluwasegun1", icon: Github, label: "GitHub" },
                {
                  href: "https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                { href: "https://x.com/OgunbanjoSegun2", icon: Twitter, label: "X / Twitter" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — contact form */}
        <motion.div
          className="glass-card relative overflow-hidden rounded-2xl p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <h3 className="font-display mb-6 text-xl font-bold">Send a Message</h3>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl bg-background/95 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-success/40 bg-success/15">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <div className="text-center">
                  <p className="font-display text-xl font-bold text-foreground">Message Sent!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <FloatingInput
              id="contact-name"
              label="Your Name"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <FloatingInput
              id="contact-email"
              label="Email Address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <FloatingTextarea
              id="contact-message"
              label="Your Message"
              maxLength={500}
              currentLength={messageLength}
              error={errors.message?.message}
              {...messageField}
            />

            {/* Honeypot field — hidden from sighted users and unreachable by Tab, but bots that fill every field will trip it */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("company")}
              />
            </div>

            <AnimatePresence>
              {submitError && (
                <motion.p
                  role="alert"
                  className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="focus-ring group relative mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
