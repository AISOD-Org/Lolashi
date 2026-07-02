import { AnimatedSection } from "@/components/AnimatedSection";
import { Star, Quote, Cross } from "lucide-react";

const testimonials = [
  {
    name: "Pastor David K.",
    location: "Windhoek, Namibia",
    text: "This book opened my eyes to the spiritual realities behind world events. Sam Tiliindje has been blessed with a prophetic voice that every believer needs to hear.",
    rating: 5,
  },
  {
    name: "Maria L.",
    location: "Johannesburg, South Africa",
    text: "I couldn't put it down. The way Sam connects scripture with history is truly inspired. This is a must-read for every Christian seeking understanding.",
    rating: 5,
  },
  {
    name: "Rev. James O.",
    location: "London, UK",
    text: "A powerful and timely message. In a world full of confusion, this book brings clarity through the lens of the everlasting gospel. Highly recommended.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Cross className="text-primary" size={16} />
            <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em]">
              Reader Testimonials
            </p>
            <Cross className="text-primary" size={16} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Readers Are Saying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Hear from those whose lives have been touched by this powerful message.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="warm-card h-full flex flex-col hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <Quote className="text-primary/20 mb-4" size={32} />
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="text-amber-400 fill-amber-400" size={16} />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}