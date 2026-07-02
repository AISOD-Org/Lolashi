import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, BookOpen, Facebook, Instagram } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
                  <img
                    src="/assets/author-sam-tiliindje.jpeg"
                    alt="Sam Tiliindje - Author"
                    className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                About the Author
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Sam Tiliindje
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Author, veteran, and servant of the Lord Jesus Christ. Dedicated
                to spreading the everlasting gospel to all four corners of the
                world.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/sam.tiliindje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Facebook size={16} />
                  Facebook
                </a>
                <a
                  href="https://instagram.com/babylonhavefallen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Biography
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Sam Tiliindje was born on August 15, 1980, in Lubango, Angola,
                during the Namibian struggle for independence. Both his mother,
                Tshaalula ya Nuumbosho, and his father, Nande ya Nghilifilwa,
                are veterans of the Namibian liberation.
              </p>
              <p>
                During his early years, Sam and 99 other children were sent to
                school in the then GDR (East Germany) in a small town called
                Stassfurt, where they attended primary school until Namibia
                gained independence on March 21, 1990.
              </p>
              <p>
                After independence, they were sent to their motherland to reunite
                with their families. Sam continued his schooling, first at
                Acacia Secondary School in Windhoek before moving to the north
                where he continued his primary education at both Ehafo and
                Oshipumbu Combined School.
              </p>
              <p>
                He then went to Okatana Secondary School and later to
                Mweshipandeka High School, where he completed his matrics in
                1999.
              </p>
              <p>
                After matrics, Sam joined the Namibian Defence Force where he
                served for 17 years and retired with the rank of Lance Corporal
                to become an author.
              </p>
              <p>
                He has written two books previously and this is his third book,
                which he is considering to promote and reach if not millions but
                billions of people in this world because of the message of the
                book.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Previous Books */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Previous Works
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="p-6 rounded-xl bg-white border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  The Eternal Knowledge of God
                </h3>
                <p className="text-muted-foreground">
                  Sam&apos;s first published work exploring the depths of divine
                  wisdom and eternal truth.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-xl bg-white border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  The Gardener
                </h3>
                <p className="text-muted-foreground">
                  Sam&apos;s second book, continuing his journey of sharing
                  spiritual insights through the written word.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <Link to="/order">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-10 py-6 shadow-lg shadow-primary/25"
              >
                Get His Latest Book — $20 USD
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}