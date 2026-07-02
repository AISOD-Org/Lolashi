import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem("lolashi_subscribers") || "[]");
    subscribers.push({ email, date: new Date().toLocaleDateString() });
    localStorage.setItem("lolashi_subscribers", JSON.stringify(subscribers));
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20 bg-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {subscribed ? (
            <div>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-400" size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                You&apos;re Subscribed!
              </h3>
              <p className="text-white/70">
                Thank you for joining our newsletter. You&apos;ll receive updates
                about new books and events.
              </p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                <Mail className="text-primary" size={24} />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                Stay Updated
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for updates on new releases, events,
                and the latest from Sam Tiliindje.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                />
                <Button
                  type="submit"
                  className="h-12 bg-primary hover:bg-primary/90 text-white font-semibold px-6 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-white/40 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}