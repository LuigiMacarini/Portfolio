export const GITHUB_USERNAME = "LuigiMacarini";
export const RESUME_EMAIL = "luigimacarini1900@gmail.com";

// linkedin, instagram and discord are left blank on purpose: guessing a
// person's social URLs is worse than omitting them. Fill in real links here
// and the footer / contact section will pick them up automatically.
export const SOCIALS = [
  { id: "github", label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}` },
  { id: "email", label: "Email", href: `mailto:${RESUME_EMAIL}` },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/5548998062270" },
  { id: "linkedin", label: "LinkedIn", href: "" },
  { id: "instagram", label: "Instagram", href: "" },
  { id: "discord", label: "Discord", href: "" },
] as const;
