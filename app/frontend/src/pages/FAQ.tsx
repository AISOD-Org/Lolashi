import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ChevronDown, ChevronUp, Cross, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How can I order the book?",
    answer: "You can order directly from our website by visiting the Order page. We accept payments through Stripe, which supports all major credit and debit cards. After placing your order, you'll receive a confirmation email with your order ID.",
  },
  {
    question: "How much does the book cost?",
    answer: "The book is priced at $20 USD per copy. If you'd like to order multiple copies, you can adjust the quantity on the order page.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery times vary depending on your location. Within Namibia, delivery typically takes 5-7 business days. International orders may take 2-4 weeks depending on the destination country and customs processing.",
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order by visiting the Track Order page and entering your order ID or the email address you used when placing the order. You'll see the current status of your order along with a visual timeline.",
  },
  {
    question: "Is the book available in other languages?",
    answer: "Currently, the book is available in English only. We are exploring translations into other languages in the future. Sign up for our newsletter to be the first to know about new editions.",
  },
  {
    question: "Can I order multiple copies for my church or study group?",
    answer: "Absolutely! You can order multiple copies by adjusting the quantity on the order page. For bulk orders of 10 or more copies, please contact us directly at samtiliindje@gmail.com for special pricing.",
  },
  {
    question: "What is the book about?",
    answer: "The book exposes the agenda of the Illuminati's one world government and explains why, according to the everlasting gospel of the Lord Jesus Christ, this agenda is destined to fail. It combines deep religious insight with ancient history to provide a comprehensive understanding of world events through the lens of scripture.",
  },
  {
    question: "Who is the author?",
    answer: "Sam Tiliindje is a Namibian author, veteran of the Namibian Defence Force, and a devoted servant of the Lord Jesus Christ. This is his third book, written with the conviction that its message must reach billions of people worldwide.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards through our secure Stripe checkout. This includes Visa, Mastercard, American Express, and other major card networks. Your payment information is processed securely and never stored on our servers.",
  },
  {
    question: "What if I have a problem with my order?",
    answer: "If you experience any issues with your order, please contact us at samtiliindje@gmail.com or through our Contact page. We'll respond as quickly as possible to resolve any concerns.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="text-primary" size={16} />
              <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em]">
                Common Questions
              </p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Find answers to the most common questions about ordering, delivery,
              and the book.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <div className="warm-card !p-0 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Cross className="text-primary" size={14} />
                      </div>
                      <span className="font-medium text-foreground">{faq.question}</span>
                    </div>
                    {openIndex === i ? (
                      <ChevronUp className="text-muted-foreground flex-shrink-0" size={18} />
                    ) : (
                      <ChevronDown className="text-muted-foreground flex-shrink-0" size={18} />
                    )}
                  </button>
                  {openIndex === i && (
                    <div className="px-5 pb-5 pt-0 ml-11">
                      <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <p className="text-muted-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Still have questions? We&apos;d love to help.
            </p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Contact Us
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}