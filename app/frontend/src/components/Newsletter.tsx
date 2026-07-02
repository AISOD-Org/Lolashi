import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail, CheckCircle, Cross } from "lucide-react";
import { createClient } from "@metagptx/web-sdk";

const client = createClient();

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.entities.newsletter_subscribers.create({
        data: { email },
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      // Fallback to localStorage
      const subscribers = JSON.parse(localStorage.getItem("lolashi_subscribers") || "[]");
      subscribers.push({ email, date: new Date().toLocaleDateString() });
      localStorage.setItem("lolashi_subscribers", JSON.stringify(subscribers));
      setSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {subscribed ? (
            <div>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-400" size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                You&apos;re Subscribed!
              </h3>
              <p className="text-white/70" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Thank you for joining our newsletter. You&apos;ll receive updates
                about new books and events.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-5">
                <Cross className="text-primary/60" size={14} />
                <p className="text-primary/80 font-semibold text-sm uppercase tracking-[0.15em]">Stay Updated</p>
                <Cross className="text-primary/60" size={14} />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                Walk in the Light
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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
                  disabled={loading}
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 bg-primary hover:bg-primary/90 text-white font-semibold px-6 whitespace-nowrap"
                >
                  <Mail className="mr-2" size={16} />
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