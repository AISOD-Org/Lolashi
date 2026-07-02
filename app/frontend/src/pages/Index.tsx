import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookOpen, Globe, Shield, ArrowRight } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrmeycaipq/hero-banner-divine-light.png"
            alt="Divine light breaking through darkness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
              >
                A Prophetic Revelation
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              >
                Illuminati One World Government Agenda{" "}
                <span className="text-primary">Will Fail</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              >
                By Sam Tiliindje — Spreading the everlasting gospel of the Lord
                Jesus Christ to the four corners of the world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/order">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-lg shadow-primary/25"
                  >
                    Buy Now — $20
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/book">
                  <Button
                    size="lg"
                    variant="outline"
                    className="!bg-transparent border-2 border-foreground/20 text-foreground font-semibold text-lg px-8 py-6 hover:border-primary hover:text-primary"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
                <img
                  src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrk6ycaipq/book-cover-illuminati-agenda.png"
                  alt="Illuminati One World Government Agenda Will Fail - Book Cover"
                  className="relative w-64 md:w-80 rounded-lg shadow-2xl shadow-black/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why This Book Matters
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A powerful message that exposes hidden agendas and points to the
              eternal truth of the Gospel.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="p-8 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Prophetic Truth
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reveals the hidden agenda of the one world government and why
                  it is destined to fail according to scripture.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="p-8 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Globe className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Global Message
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Written to reach billions of people across the world with the
                  everlasting gospel of the Lord Jesus Christ.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="p-8 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Ancient History
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Combines religion and ancient history to provide a
                  comprehensive understanding of world events.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Book Preview Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrmrqcaipq/bible-study-atmosphere.png"
                alt="Bible study atmosphere"
                className="rounded-xl shadow-xl w-full"
              />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                About the Book
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                177 Pages of Revelation
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This is Sam Tiliindje&apos;s third book, and it carries a
                  message he believes must reach not just millions, but billions
                  of people across the world.
                </p>
                <p>
                  Combining deep religious insight with ancient history, this
                  book exposes the agenda of the Illuminati&apos;s one world
                  government and explains why, according to the everlasting
                  gospel, it is destined to fail.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-border/50">
                  <p className="text-2xl font-bold text-foreground">177</p>
                  <p className="text-sm text-muted-foreground">Pages</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border/50">
                  <p className="text-2xl font-bold text-foreground">2023</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </div>
              <Link to="/book" className="inline-block mt-8">
                <Button variant="outline" className="!bg-transparent border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white">
                  View Full Details
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Your Copy Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of readers who have discovered the truth. Order your
              copy directly and start your journey of revelation.
            </p>
            <Link to="/order">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-6 shadow-lg shadow-primary/25"
              >
                Order Now — $20 USD
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}