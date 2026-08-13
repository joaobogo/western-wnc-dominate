import { Facebook, Instagram, Linkedin } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    label: "Visit Highlander Building Services on LinkedIn",
    short: "LinkedIn",
    href: "https://www.linkedin.com/company/highlander-roofing-services-inc/",
    icon: Linkedin,
  },
  {
    label: "Visit Highlander Building Services on Facebook",
    short: "Facebook",
    href: "https://www.facebook.com/highlanderroof/reels/",
    icon: Facebook,
  },
  {
    label: "Visit Highlander Building Services on Instagram",
    short: "Instagram",
    href: "https://www.instagram.com/highlanderroofingservices/",
    icon: Instagram,
  },
];

interface SocialLinksProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}

const SocialLinks = ({ variant = "light", size = "md", className = "" }: SocialLinksProps) => {
  const dimensions = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-[18px] h-[18px]";

  const base =
    variant === "dark"
      ? "border-white/20 text-white/85 hover:text-[hsl(var(--gold-ink))] hover:border-[hsl(var(--highland-gold)/0.5)] hover:bg-white/5"
      : "border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5";

  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map(({ label, short, href, icon: Icon }) => (
        <li key={short}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={short}
            className={`${dimensions} inline-flex items-center justify-center rounded-sm border transition-all duration-200 ${base}`}
          >
            <Icon className={iconSize} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;