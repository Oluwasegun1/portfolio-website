"use client";

import type React from "react";
import "leaflet/dist/leaflet.css";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setError("Failed to send message. Please try again later.");
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };
  // Inside Contact component
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section id="contact" className="py-20" ref={sectionRef}>
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          <span className="relative">
            Get In Touch
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-400"></span>
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full overflow-hidden border-none bg-gradient-to-br from-primary/5 via-background to-purple-500/5 shadow-lg dark:from-primary/10 dark:to-purple-500/10">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Here's how you can reach me directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">ogunbanjosegun@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+234 7042991133</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Lekki, Lagos</p>
                </div>
              </motion.div>

              <div className="mt-8 h-40 w-full overflow-hidden rounded-lg">
                <div className="h-full w-full bg-gray-200 dark:bg-gray-800 relative">
                  {hasMounted && <div className="absolute inset-0"></div>}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border-none shadow-lg">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 animate-pulse-bg"></div>

            <CardHeader className="relative">
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-primary/20 focus:border-primary/50 transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-primary/20 focus:border-primary/50 transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="border-primary/20 focus:border-primary/50 transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}

                    {/* Button hover effect */}
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </motion.div>

                {error && (
                  <motion.div
                    className="mt-4 rounded-md bg-red-100 p-3 text-center text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}

                {isSubmitted && (
                  <motion.div
                    className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
