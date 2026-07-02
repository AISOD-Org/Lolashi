import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export function ShareButtons({ url = typeof window !== "undefined" ? window.location.href : "", title = "Illuminati One World Government Agenda Will Fail by Sam Tiliindje" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-700 hover:text-white",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground font-medium mr-1">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-200 ${link.color}`}
          title={`Share on ${link.label}`}
        >
          <link.icon size={16} />
        </a>
      ))}
      <button
        onClick={copyLink}
        className={`w-9 h-9 rounded-full border border-border/50 flex items-center justify-center transition-all duration-200 ${
          copied ? "bg-green-100 text-green-600 border-green-200" : "text-muted-foreground hover:bg-muted"
        }`}
        title="Copy link"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}