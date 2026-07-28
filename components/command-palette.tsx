/** CommandPalette — Cmd/Ctrl+K launcher for quick navigation, theme toggling, and shortcuts to contact/resume/project links. */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Home,
  User,
  Briefcase,
  Layers,
  Mail,
  Moon,
  Sun,
  Copy,
  Download,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { PROJECTS } from "@/lib/projects";

const SECTION_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "k" && (evt.metaKey || evt.ctrlKey)) {
        evt.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    // Lets the header's visible "⌘K" trigger open the palette without prop-drilling shared state
    const handleOpenRequest = () => setOpen(true);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenRequest);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenRequest);
    };
  }, []);

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const goToSection = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ogunbanjosegun@gmail.com");
    toast.success("Email copied to clipboard");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, projects, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {SECTION_ITEMS.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => runCommand(() => goToSection(item.id))}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {PROJECTS.map((project) => (
            <CommandItem
              key={project.slug}
              onSelect={() =>
                runCommand(() => router.push(`/work/${project.slug}`))
              }
            >
              <ExternalLink className="h-4 w-4" />
              <span>{project.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(copyEmail)}>
            <Copy className="h-4 w-4" />
            <span>Copy email address</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setTheme(theme === "dark" ? "light" : "dark");
              })
            }
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>Toggle {theme === "dark" ? "light" : "dark"} mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open("/Oluwasegun-Ogunbanjo-Resume.pdf", "_blank");
              })
            }
          >
            <Download className="h-4 w-4" />
            <span>Download resume</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open("https://github.com/Oluwasegun1", "_blank");
              })
            }
          >
            <Github className="h-4 w-4" />
            <span>Open GitHub profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.open(
                  "https://www.linkedin.com/in/ogunbanjo-oluwasegun-b02831114/",
                  "_blank"
                );
              })
            }
          >
            <Linkedin className="h-4 w-4" />
            <span>Open LinkedIn profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-end gap-1 border-t border-border px-3 py-2 text-xs text-muted-foreground">
        <span>Press</span>
        <CommandShortcut className="ml-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
          Esc
        </CommandShortcut>
        <span>to close</span>
      </div>
    </CommandDialog>
  );
}
