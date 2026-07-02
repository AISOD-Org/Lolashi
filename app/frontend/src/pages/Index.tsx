import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, BookOpen, Globe, Shield, Cross, Heart } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrmeycaipq/hero-banner-divine-light.png"
            alt="Divine light breaking through darkness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF0]/85 via-[#FFFBF0]/70 to-[#FFFBF0]" />
        </div>

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <Cross className="text-primary" size={18} />
                <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em]">
                  A Prophetic Revelation
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6"
              >
                Illuminati One World Government Agenda{" "}
                <span className="text-primary">Will Fail</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4 max-w-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                By Sam Tiliindje — Spreading the everlasting gospel of the Lord
                Jesus Christ to the four corners of the world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="scripture-quote mb-8"
              >
                <p className="text-base">&ldquo;And this gospel of the kingdom shall be preached in all the world for a witness unto all nations.&rdquo;</p>
                <p className="text-sm mt-1 not-italic">— Matthew 24:14</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/order">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-lg shadow-primary/20"
                  >
                    Buy Now — $20
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/book">
                  <Button
                    size="lg"
                    variant="outline"
                    className="!bg-transparent border-2 border-foreground/15 text-foreground font-semibold text-lg px-8 py-6 hover:border-primary hover:text-primary"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/8 rounded-3xl blur-2xl" />
                <div className="absolute -inset-3 border border-primary/10 rounded-xl" />
                <img
                  src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrk6ycaipq/book-cover-illuminati-agenda.png"
                  alt="Illuminati One World Government Agenda Will Fail - Book Cover"
                  className="relative w-64 md:w-80 rounded-lg shadow-2xl shadow-black/15"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ornamental Divider */}
      <div className="ornament-divider max-w-4xl mx-auto px-8">
        <Cross className="text-primary/40" size={16} />
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em] mb-3">Why This Book Matters</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Truth Shall Set You Free
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              A powerful message that exposes hidden agendas and points to the
              eternal truth of the Gospel.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="warm-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Shield className="text-primary" size={26} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Prophetic Truth
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                  Reveals the hidden agenda of the one world government and why
                  it is destined to fail according to scripture.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="warm-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Globe className="text-primary" size={26} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Global Message
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                  Written to reach billions of people across the world with the
                  everlasting gospel of the Lord Jesus Christ.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="warm-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <BookOpen className="text-primary" size={26} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Ancient History
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                  Combines religion and ancient history to provide a
                  comprehensive understanding of world events.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="py-12 bg-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;And ye shall know the truth, and the truth shall make you free.&rdquo;
            </p>
            <p className="mt-3 text-white/60 text-sm uppercase tracking-widest">— John 8:32 (KJV)</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Book Preview Section */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <img
                  src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrmrqcaipq/bible-study-atmosphere.png"
                  alt="Bible study atmosphere"
                  className="rounded-xl shadow-xl w-full"
                />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-primary/20 rounded-xl -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                About the Book
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                177 Pages of Revelation
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
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
                <div className="p-4 bg-white rounded-lg border border-border/50 text-center">
                  <p className="text-2xl font-bold text-foreground font-serif">177</p>
                  <p className="text-sm text-muted-foreground">Pages</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border/50 text-center">
                  <p className="text-2xl font-bold text-foreground font-serif">2023</p>
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
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Heart className="text-primary/30 mx-auto mb-4" size={32} />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Your Copy Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Join thousands of readers who have discovered the truth. Order your
              copy directly and start your journey of revelation.
            </p>
            <Link to="/order">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-6 shadow-lg shadow-primary/20"
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