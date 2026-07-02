import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CheckCircle, Facebook, Instagram, Mail, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Get in Touch
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about the book or want to get in touch with Sam
              Tiliindje? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection direction="left">
              {submitted ? (
                <div className="bg-card rounded-xl border border-border/50 p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="!bg-transparent border-2 border-primary text-primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border/50 p-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        required
                        placeholder="Enter your name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        required
                        placeholder="What is this about?"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        required
                        placeholder="Write your message here..."
                        rows={5}
                        className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                    >
                      <Send className="mr-2" size={18} />
                      Send Message
                    </Button>
                  </form>
                </div>
              )}
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection direction="right">
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Feel free to reach out through any of the channels below. Sam
                    Tiliindje is available for inquiries about the book,
                    speaking engagements, and translation partnerships.
                  </p>
                </div>

                {/* Email */}
                <a
                  href="mailto:samtiliindje@gmail.com"
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">
                      samtiliindje@gmail.com
                    </p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/sam.tiliindje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Facebook className="text-blue-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Facebook</p>
                    <p className="font-medium text-foreground">Sam Tiliindje</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/babylonhavefallen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-pink-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-pink-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <p className="font-medium text-foreground">
                      @babylonhavefallen
                    </p>
                  </div>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}