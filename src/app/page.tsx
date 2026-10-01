"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  ChevronDown,
  MonitorSmartphone,
  ArrowRight,
  Send,
  Menu,
  X,
  Moon,
  Sun,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import emailjs from "@emailjs/browser";

/* ═══════════════ Tech SVG Icons ═══════════════ */
function TechIcon({ name }: { name: string }) {
  const iconMap: Record<string, string> = {
    React:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z",
    "Next.js": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    TypeScript:
      "M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 2.68 1.73 1.07 0 1.75-.55 1.75-1.33 0-.92-.56-1.28-1.86-1.82l-.63-.27c-1.84-.78-2.87-1.77-2.87-3.37 0-1.68 1.28-2.96 3.27-2.96.94 0 1.62.27 2.17.66l-.68 1.98c-.38-.27-.92-.62-1.56-.62-.64 0-1 .38-1 .9 0 .62.4.89 1.26 1.3l.63.27c2.17.93 3.03 1.88 3.03 3.6 0 2.06-1.62 3.15-3.78 3.15-1.26 0-2.5-.45-3.33-1.14l.7-2.1zm-7.42.02h5.28v-1.9H9.44V14.5h2.28v-1.9H9.44v-1.66h3.13V8.06H6.29v9.82z",
    "Tailwind CSS":
      "M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.45 10.9 14.63 12.17 17 12.17c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.55 7.26 14.37 6 12 6zM7 12.17c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.45 17.07 9.63 18.33 12 18.33c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.55 13.43 9.37 12.17 7 12.17z",
    "Node.js":
      "M12 2.25c-.3 0-.6.08-.86.23L4.2 6.13c-.53.3-.86.86-.86 1.46v8.82c0 .6.33 1.16.86 1.46l6.94 3.65c.53.3 1.19.3 1.72 0l6.94-3.65c.53-.3.86-.86.86-1.46V7.59c0-.6-.33-1.16-.86-1.46L12.86 2.48c-.26-.15-.56-.23-.86-.23zm0 2.18L17.5 7v8l-5.5 2.9L6.5 15V7l5.5-2.57z",
    Express:
      "M24 18.88c-2.08 1.34-5.38 2.12-8.55 2.12C7.56 21 2 15.52 2 12c0-1.48.76-3.16 2.05-4.84.18-.24.48-.3.72-.18.24.12.3.42.18.66C4.16 9.12 3.6 10.56 3.6 12c0 5.4 5.88 9.6 11.85 9.6 2.58 0 5.28-.6 7.05-1.68.24-.12.54-.06.72.18.12.24.06.54-.22.78zM21.6 5.4c-.12-.24-.42-.3-.66-.18-2.1 1.08-4.38 1.68-6.72 1.68-3.48 0-6.48-1.38-8.52-3.6-.18-.18-.48-.18-.66 0-.18.18-.18.48 0 .66 2.22 2.46 5.46 3.96 9.18 3.96 2.58 0 5.1-.66 7.38-1.86.24-.12.3-.42.18-.66h-.18z",
    MongoDB:
      "M17.19 2.09c-.09 0-.15.06-.18.12l-1.47 4.32c-.03.09.03.18.12.18h3.09c.09 0 .15-.09.12-.18l-1.5-4.32c-.03-.06-.12-.12-.18-.12zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-12h-6c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z",
    SQLite:
      "M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z",
    Git: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.72.72.72 1.884 0 2.604-.72.719-1.885.719-2.604 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
    GitHub:
      "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    Vercel: "M12 2L2 22h20L12 2zm0 4l7.53 15H4.47L12 6z",
    Linux:
      "M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.074 1.741-.332 2.538-.667.389-.164.78-.33 1.066-.46.469-.199.918-.285 1.199-.07.34.26.58.56.904.737.263.137.587.169.898.068.312-.098.553-.333.717-.607.326-.55.354-1.166.346-1.795a10.05 10.05 0 00-.116-1.534c.564-.475.879-1.086.973-1.773.094-.686-.029-1.414-.378-2.093-.699-1.36-2.083-2.56-3.292-3.54a7.8 7.8 0 00-.464-.352c.3-1.258.49-2.585.466-3.86-.029-1.636-.537-3.139-1.695-4.064C15.447.553 13.986.003 12.504 0z",
    "API REST":
      "M4 6h2v2H4V6zm4 0h2v2H8V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM4 10h2v2H4v-2zm4 0h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z",
  };
  const d = iconMap[name];
  if (!d) {
    return (
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-foreground/70"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ═══════════════ Animated Section Wrapper ═══════════════ */
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  scale?: number;
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 35,
  duration = 1.1,
  scale = 0.96,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale,
        ...initialPos,
      }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 0, scale, ...initialPos }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════ Navbar ═══════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const links = [
    { label: "Accueil", href: "#hero" },
    { label: "Réalisations", href: "#projects" },
    { label: "Parcours", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          votre-nom<span className="text-foreground/40">.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-1 h-8 w-8"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="h-8 w-8"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ═══════════════ Hero ═══════════════ */
function HeroSection() {
  const titles = [
    "Expert & Consultant",
    "Designer & Créatif",
    "Développeur & Chef de Projet",
  ];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center pt-16"
    >
      <div className="w-full max-w-5xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground"
            >
              Disponible pour de nouveaux projets
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Salut, je suis{" "}
              <span className="text-foreground/90">Votre Nom</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 h-8 text-lg text-muted-foreground sm:text-xl"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 max-w-md leading-relaxed text-muted-foreground/80 mx-auto lg:mx-0"
            >
              Je conçois des projets sur-mesure, alliant créativité, stratégie
              et performance pour répondre à vos besoins professionnels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href="#projects">
                <Button size="lg" variant="default" className="gap-2 px-7">
                  Voir mes projets <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="gap-2 px-7">
                  <Mail className="h-4 w-4" /> Me contacter
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex justify-center gap-3 lg:justify-start"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:contact@exemple.com",
                  label: "Email",
                },
              ].map((social) => (
                <TooltipProvider key={social.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                      >
                        <social.icon className="h-[18px] w-[18px]" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{social.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-b from-muted/80 via-muted/40 to-background p-6 shadow-xl sm:h-64 sm:w-64 lg:h-72 lg:w-72">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border/80 bg-background/80 shadow-inner sm:h-36 sm:w-36 lg:h-40 lg:w-40">
                <User className="h-16 w-16 text-muted-foreground/70 sm:h-20 sm:w-20 lg:h-22 lg:w-22" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#projects"
          className="text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}

/* ═══════════════ Project Image (Tailwind-friendly) ═══════════════ */
function ProjectImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

/* ═══════════════ Réalisations (Skills + Projects unified) ═══════════════ */
function ProjectsSection() {
  const skillGroups = [
    {
      category: "Domaines d'expertise",
      techs: ["Design UI/UX", "Gestion de Projet", "Stratégie Digitale", "Développement Web"],
    },
    {
      category: "Outils & Logiciels",
      techs: ["Figma", "React", "Next.js", "Suite Adobe", "Git"],
    },
    {
      category: "Savoir-faire",
      techs: ["Méthodes Agiles", "Direction Artistique", "Analyse de Données", "Communication"],
    },
  ];

  const projects = [
    {
      title: "Plateforme Digital & Design System",
      description:
        "Conception complète d'un produit numérique intégrant une interface utilisateur moderne, un design system évolutif et une expérience utilisateur optimisée.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      tags: [
        "Design System",
        "UI/UX",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "Plateforme de Formation & E-Learning",
      description:
        "Application d'apprentissage en ligne moderne et responsive offrant une expérience utilisateur fluide pour consulter des contenus et suivre sa progression.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
      tags: [
        "E-Learning",
        "React",
        "Node.js",
        "UX Research",
      ],
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "Gestionnaire de Projets Collaboratif",
      description:
        "Outil de productivité avec organisation visuelle, suivi en temps réel, assignation de tâches et tableau de bord de performance.",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop",
      tags: [
        "Gestion de Projet",
        "Agile",
        "React",
        "PostgreSQL",
      ],
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "Site Vitrine & CMS de Marque",
      description:
        "Site web élégant avec système de gestion de contenu, recherche instantanée et optimisation SEO complète pour maximiser la visibilité.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop",
      tags: ["Branding", "Next.js", "SEO", "Design"],
      github: "https://github.com",
      demo: "https://example.com",
      featured: false,
    },
    {
      title: "Audit & Architecture de Services",
      description:
        "Analyse approfondie des besoins, modélisation de solutions structurées et intégration de services sécurisés et performants.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      tags: ["Audit", "API REST", "Architecture", "Sécurité"],
      github: "https://github.com",
      demo: "https://example.com",
      featured: false,
    },
    {
      title: "Landing Page & Campagne Digitale",
      description:
        "Page d'atterrissage responsive conçue pour maximiser l'engagement et la conversion avec visuels soignés et formulaires interactifs.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      tags: ["Marketing", "React", "Tailwind CSS", "Analytics"],
      github: "https://github.com",
      demo: "https://example.com",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Réalisations
            </p>
            <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl">
              Ce que je fais
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Découvrez une sélection de mes réalisations les plus marquantes.
              Qu&apos;il s&apos;agisse de projets créatifs, d&apos;études de cas ou
              de missions stratégiques, chaque projet reflète mon savoir-faire et
              mon engagement.
            </p>
          </div>
        </AnimatedSection>

        {/* Skills overview (compact badges) */}
        <div className="mb-10 space-y-4">
          {skillGroups.map((group, groupIdx) => (
            <AnimatedSection
              key={group.category}
              delay={0.05 + groupIdx * 0.08}
              direction="up"
              distance={25}
            >
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted"
                    >
                      <TechIcon name={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.1}>
          <div className="mb-12 flex items-start gap-3 rounded-xl border border-border/40 bg-muted/50 p-4">
            <MonitorSmartphone className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/60" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Chaque réalisation est conçue avec soin. L&apos;expérience utilisateur
              et la présentation sont optimisées pour tous les supports.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mb-12 max-w-2xl">
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              Projets réalisés
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Une sélection représentative de projets menés avec succès, du
              cadrage initial à la livraison finale.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured */}
        <div className="mb-16 space-y-10">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <AnimatedSection
                key={project.title}
                delay={i * 0.12}
                direction="up"
                distance={40}
                scale={0.97}
              >
                <Card className="overflow-hidden border-border/60 transition-shadow group hover:shadow-md">
                  <div className="grid gap-0 lg:grid-cols-2">
                    <div className="relative">
                      <ProjectImage
                        src={project.image}
                        alt={project.title}
                        className="h-56 lg:h-full"
                      />
                      <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-background/70 lg:block" />
                    </div>
                    <CardContent className="flex flex-col justify-center p-6 sm:p-8">
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md border border-border/50 bg-muted px-2.5 py-1 text-xs font-medium text-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mb-3 text-xl font-bold">
                        {project.title}
                      </h3>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            <Github className="h-3.5 w-3.5" /> Code
                          </Button>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="gap-2">
                            <ExternalLink className="h-3.5 w-3.5" /> Demo
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
        </div>

        {/* Grid */}
        <AnimatedSection delay={0.15}>
          <h3 className="mb-8 text-lg font-semibold text-muted-foreground">
            Autres projets
          </h3>
        </AnimatedSection>
        <div className="grid gap-5 md:grid-cols-3">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <AnimatedSection
                key={project.title}
                delay={0.05 + i * 0.08}
                direction="up"
                distance={30}
                scale={0.95}
              >
                <Card className="h-full overflow-hidden border-border/60 transition-shadow group hover:shadow-md">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    className="h-36"
                  />
                  <CardContent className="p-5">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded border border-border/50 bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {project.title}
                    </h4>
                    <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1.5 text-xs text-muted-foreground"
                        >
                          <Github className="h-3 w-3" /> Code
                        </Button>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1.5 text-xs text-muted-foreground"
                        >
                          <ExternalLink className="h-3 w-3" /> Demo
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Experience ═══════════════ */
function ExperienceSection() {
  const experiences = [
    {
      title: "Consultant / Spécialiste Senior",
      company: "Entreprise / Organisation",
      location: "Paris, France (Remote)",
      period: "2023 — Présent",
      description:
        "Pilotage de projets stratégiques, gestion des relations partenaires, conception de solutions innovantes et encadrement des opérations.",
      tags: [
        "Gestion de projet",
        "Stratégie",
        "Design UI/UX",
        "Développement",
        "Agile",
      ],
      current: true,
    },
    {
      title: "Chef de Projet / Designer",
      company: "Studio / Agence",
      location: "Lyon, France (Remote)",
      period: "2022 — 2023",
      description:
        "Réalisation de livrables sur-mesure pour divers clients, de la phase de cadrage jusqu'à la livraison finale et le suivi qualité.",
      tags: ["Branding", "UI/UX", "Conseil", "Communication"],
      current: false,
    },
    {
      title: "Chargé de Mission Junior",
      company: "Organisation / Startup",
      location: "Bordeaux, France",
      period: "2021 — 2022",
      description:
        "Participation active à la mise en œuvre des projets, résolution de problèmes opérationnels et contribution aux objectifs d'équipe.",
      tags: ["Analyse", "Gestion", "Recherche"],
      current: false,
    },
  ];

  const education = [
    {
      degree: "Master / Diplôme Supérieur",
      school: "Grande École / Université",
      period: "2021 — 2023",
      description:
        "Spécialisation professionnelle, gestion de projets complexes, méthodologies avancées et conduite du changement.",
    },
    {
      degree: "Licence / Diplôme Universitaire",
      school: "Université / Établissement Supérieur",
      period: "2018 — 2021",
      description:
        "Acquisition des fondamentaux académiques, travaux pratiques, analyse critique et gestion de projets fondamentaux.",
    },
  ];

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Parcours
            </p>
            <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl">
              Mon expérience
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Mon parcours professionnel et académique, illustrant la diversité
              de mes expériences et les compétences acquises au fil de ma
              carrière.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-16">
          {/* Formation */}
          <div>
            <AnimatedSection>
              <h3 className="mb-8 flex items-center gap-2 text-base font-semibold text-muted-foreground">
                <Star className="h-4 w-4" /> Formation
              </h3>
            </AnimatedSection>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <AnimatedSection
                  key={edu.degree}
                  delay={0.05 + idx * 0.08}
                  direction="up"
                  distance={25}
                >
                  <Card className="border-border/60 transition-shadow hover:shadow-sm">
                    <CardContent className="p-5">
                      <h4 className="text-sm font-semibold">{edu.degree}</h4>
                      <p className="mb-0.5 text-sm font-medium text-muted-foreground">
                        {edu.school}
                      </p>
                      <p className="mb-3 text-xs text-muted-foreground">
                        {edu.period}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Expérience professionnelle */}
          <div>
            <AnimatedSection delay={0.1}>
              <h3 className="mb-8 flex items-center gap-2 text-base font-semibold text-muted-foreground">
                <Calendar className="h-4 w-4" /> Expérience professionnelle
              </h3>
            </AnimatedSection>
            <div className="relative">
              <div className="absolute bottom-2 left-[11px] top-2 w-px bg-border" />
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <AnimatedSection
                    key={exp.company}
                    delay={0.1 + i * 0.1}
                    direction="left"
                    distance={35}
                  >
                    <div className="relative pl-10">
                      <div
                        className={`absolute left-0 top-2 h-[23px] w-[23px] rounded-full border-[3px] ${exp.current
                          ? "border-background bg-foreground"
                          : "border-border bg-background"
                          }`}
                      />
                      <Card className="border-border/60 transition-shadow hover:shadow-sm">
                        <CardContent className="p-5">
                          <div className="mb-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h4 className="font-semibold">{exp.title}</h4>
                              <p className="text-sm font-medium text-muted-foreground">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </span>
                              <span>{exp.period}</span>
                            </div>
                          </div>
                          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded border border-border/50 bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Contact ═══════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSending(true);

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "VOTRE_SERVICE_ID";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "VOTRE_TEMPLATE_ID";
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "VOTRE_PUBLIC_KEY";

    if (
      serviceId === "VOTRE_SERVICE_ID" ||
      templateId === "VOTRE_TEMPLATE_ID" ||
      publicKey === "VOTRE_PUBLIC_KEY"
    ) {
      toast.info(
        "Mode template : configurez vos identifiants EmailJS pour activer l'envoi de messages réels.",
      );
      setSending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Nouveau message du portfolio",
          message: formData.message,
        },
        publicKey,
      );
      toast.success("Message envoyé avec succès ! Je vous répondrai sous 24h.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error(
        "Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement par email.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Contact
            </p>
            <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl">
              Travaillons ensemble
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Vous avez un projet en tête ou souhaitez collaborer ?
              Contactez-moi et discutons-en. Je suis disponible pour des
              opportunités, des missions freelance ou des conseils.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-5">
          <AnimatedSection
            className="lg:col-span-2"
            delay={0.1}
            direction="right"
            distance={35}
          >
            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "contact@exemple.com",
                  href: "mailto:contact@exemple.com",
                },
                {
                  icon: MapPin,
                  label: "Localisation",
                  value: "Paris, France / Remote",
                  href: null,
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/votre-username",
                  href: "https://github.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/votre-profil",
                  href: "https://linkedin.com",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <item.icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="lg:col-span-3"
            delay={0.2}
            direction="left"
            distance={35}
          >
            <Card className="border-border/60">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      placeholder="Sujet du message"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Votre message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full gap-2"
                  >
                    {sending ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Footer ═══════════════ */

function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          votre-nom<span className="text-foreground/40">.dev</span>
        </a>
        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com" },
            {
              icon: Linkedin,
              href: "https://linkedin.com",
            },
            { icon: Mail, href: "mailto:contact@exemple.com" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio Template. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <Toaster richColors position="top-right" />
    </main>
  );
}
