import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CheckCircle, ShieldCheck, BookOpen } from "lucide-react";

export default function Order() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save order to localStorage for admin dashboard
    const existingOrders = JSON.parse(localStorage.getItem("lolashi_orders") || "[]");
    const newOrder = {
      id: existingOrders.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      quantity: parseInt(formData.quantity || "1"),
      total: parseInt(formData.quantity || "1") * 20,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    existingOrders.push(newOrder);
    localStorage.setItem("lolashi_orders", JSON.stringify(existingOrders));
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
        <AnimatedSection className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Order Received!
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Thank you for your order. We will contact you at{" "}
            <strong>{formData.email}</strong> with payment and delivery details
            shortly.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", address: "", quantity: "1" });
            }}
            variant="outline"
            className="!bg-transparent border-2 border-primary text-primary"
          >
            Place Another Order
          </Button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Order Your Copy
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Buy Now
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Order your copy of &ldquo;Illuminati One World Government Agenda Will
              Fail&rdquo; directly from the author.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection direction="left">
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Order Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+264 ..."
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium mb-2 block">
                      Delivery Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Your full address"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-sm font-medium mb-2 block">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="h-12 w-24"
                    />
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-4 p-4 bg-primary/5 rounded-lg">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${parseInt(formData.quantity || "1") * 20} USD
                      </span>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-6 shadow-lg shadow-primary/25"
                    >
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Order Summary */}
            <AnimatedSection direction="right">
              <div className="sticky top-28">
                {/* Book Preview */}
                <div className="bg-card rounded-xl border border-border/50 p-6 mb-6">
                  <div className="flex gap-5">
                    <img
                      src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrk6ycaipq/book-cover-illuminati-agenda.png"
                      alt="Book Cover"
                      className="w-24 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                        Illuminati One World Government Agenda Will Fail
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        By Sam Tiliindje
                      </p>
                      <p className="text-xl font-bold text-primary">$20 USD</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">
                      Secure direct purchase from the author
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <BookOpen className="text-primary flex-shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">
                      177 pages of prophetic revelation
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">
                      ISBN: 978-99945-59-97-8
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}