import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-lg">
              Please read these terms carefully before purchasing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <div className="p-6 rounded-xl bg-card border border-border/50">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    1. Resale Restriction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This book is not to be sold for the second time after it has
                    been bought. The purchase grants you personal reading rights
                    only. Redistribution for commercial purposes is strictly
                    prohibited.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border/50">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    2. Translation Rights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This book can be translated into any language so that the
                    everlasting gospel of the Lord Jesus Christ can reach His
                    people from all four corners of the world. Translation is
                    permitted and encouraged for the purpose of spreading the
                    gospel message.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border/50">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    3. Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content within this book is the intellectual property of
                    Sam Tiliindje. The text, ideas, and research presented are
                    protected by copyright law. Any reproduction beyond
                    translation for gospel purposes requires written permission
                    from the author.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border/50">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    4. Purchase Agreement
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By purchasing this book, you agree to abide by these terms
                    and conditions. The price of the book is $20 USD. All sales
                    are final. For any questions regarding these terms, please
                    contact us at{" "}
                    <a
                      href="mailto:samtiliindje@gmail.com"
                      className="text-primary hover:underline"
                    >
                      samtiliindje@gmail.com
                    </a>
                    .
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border/50">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    5. Contact
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For any inquiries regarding these terms and conditions,
                    translation partnerships, or other matters, please contact:
                  </p>
                  <ul className="mt-3 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Contact Person:</strong> Sam Tiliindje
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:samtiliindje@gmail.com"
                        className="text-primary hover:underline"
                      >
                        samtiliindje@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}