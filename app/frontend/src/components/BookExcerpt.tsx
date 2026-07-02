import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookOpen, ChevronDown, ChevronUp, Cross } from "lucide-react";

const excerpts = [
  {
    chapter: "Chapter 1",
    title: "The Beginning of the End",
    text: "From the dawn of civilization, there have been those who sought to consolidate power under a single authority. The scriptures warn us of a time when a one world government will rise, promising peace but delivering bondage. Yet the Word of God assures us that this agenda will not prevail against the eternal kingdom of our Lord Jesus Christ.",
  },
  {
    chapter: "Chapter 5",
    title: "The Hidden Hand",
    text: "Throughout history, secret societies have operated in the shadows, influencing nations and leaders. The Illuminati, founded in 1776, represents one of the most significant forces working toward a unified global order. But their plans are not hidden from those who walk in the light of truth.",
  },
  {
    chapter: "Chapter 12",
    title: "The Promise of Victory",
    text: "The book of Revelation makes it clear: the forces of darkness will not triumph. The Lamb who was slain will return as the Lion of Judah, and every knee shall bow. This is not merely a hope — it is a divine certainty written in the blood of the covenant.",
  },
];

export function BookExcerpt() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="text-primary" size={16} />
            <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em]">
              Read a Preview
            </p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sample the Book
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Get a taste of the powerful message within these pages.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {excerpts.map((excerpt, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="warm-card">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Cross className="text-primary" size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider">{excerpt.chapter}</p>
                      <p className="font-serif text-lg font-semibold text-foreground">{excerpt.title}</p>
                    </div>
                  </div>
                  {expandedIndex === i ? (
                    <ChevronUp className="text-muted-foreground flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-muted-foreground flex-shrink-0" size={20} />
                  )}
                </button>
                {expandedIndex === i && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
                      {excerpt.text}
                    </p>
                    <p className="text-xs text-primary/60 mt-3 uppercase tracking-wider">
                      — Excerpt from &ldquo;Illuminati One World Government Agenda Will Fail&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}