import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, BookOpen, Calendar, Globe, Hash, Layers, User, Cross } from "lucide-react";

export default function BookDetails() {
  const bookInfo = [
    { icon: BookOpen, label: "Title", value: "Illuminati One World Government Agenda Will Fail" },
    { icon: User, label: "Author", value: "Sam Tiliindje" },
    { icon: Hash, label: "ISBN", value: "978-99945-59-97-8" },
    { icon: Layers, label: "Publisher", value: "Self Published" },
    { icon: Calendar, label: "Publication Date", value: "September 20, 2023" },
    { icon: BookOpen, label: "Pages", value: "177" },
    { icon: Globe, label: "Language", value: "English" },
    { icon: BookOpen, label: "Genre", value: "Religion, Ancient History" },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-16 md:py-20 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-6 bg-primary/5 rounded-2xl blur-xl" />
                  <div className="absolute -inset-3 border border-primary/10 rounded-xl" />
                  <img
                    src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrk6ycaipq/book-cover-illuminati-agenda.png"
                    alt="Illuminati One World Government Agenda Will Fail - Book Cover"
                    className="relative w-72 md:w-80 rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-2 mb-3">
                <Cross className="text-primary" size={16} />
                <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em]">
                  The Book
                </p>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                Illuminati One World Government Agenda Will Fail
              </h1>
              <p className="text-muted-foreground text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                By Sam Tiliindje
              </p>
              <p className="text-3xl font-bold text-primary mb-6 font-serif">$20 USD</p>
              <Link to="/order">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-lg shadow-primary/20"
                >
                  Buy Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Book Details */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Book Information
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookInfo.map((item, index) => (
              <AnimatedSection key={item.label} delay={index * 0.05}>
                <div className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Divider */}
      <section className="py-10 bg-secondary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            &ldquo;The truth shall make you free.&rdquo;
          </p>
          <p className="mt-2 text-white/60 text-sm uppercase tracking-widest">— John 8:32</p>
        </div>
      </section>

      {/* Synopsis */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Book Synopsis
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
              <p>
                This is Sam Tiliindje&apos;s third book, and it carries a message he
                believes must reach not just millions, but billions of people
                across the world because of the profound nature of its content.
              </p>
              <p>
                The book combines deep religious insight with ancient history to
                expose the agenda of the Illuminati&apos;s one world government. It
                explains why, according to the everlasting gospel of the Lord
                Jesus Christ, this agenda is destined to fail.
              </p>
              <p>
                Drawing from scripture and historical evidence, Sam Tiliindje
                presents a compelling case for why believers should stand firm in
                their faith and understand the times we live in. The book serves
                as both a warning and an encouragement to Christians worldwide.
              </p>
              <p>
                Written in English and spanning 177 pages, this self-published
                work in the genres of Religion and Ancient History is accessible
                to readers from all backgrounds who seek to understand the
                spiritual dimensions of world events.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12 text-center">
            <Link to="/order">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-6 shadow-lg shadow-primary/20"
              >
                Order Your Copy — $20 USD
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}