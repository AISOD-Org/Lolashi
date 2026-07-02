import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CheckCircle, ShieldCheck, BookOpen, ArrowRight, Cross, Loader2 } from "lucide-react";
import { createClient } from "@metagptx/web-sdk";

const client = createClient();

export default function Order() {
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await client.apiCall.invoke({
        url: "/api/v1/payment/create_payment_session",
        method: "POST",
        data: {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address: formData.address,
          quantity: parseInt(formData.quantity || "1"),
        },
      });

      const { order_id, url } = response.data;

      // Also save to localStorage for tracking compatibility
      const existingOrders = JSON.parse(localStorage.getItem("lolashi_orders") || "[]");
      existingOrders.push({
        id: order_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        quantity: parseInt(formData.quantity || "1"),
        total: parseInt(formData.quantity || "1") * 20,
        date: new Date().toLocaleDateString(),
        status: "Pending",
      });
      localStorage.setItem("lolashi_orders", JSON.stringify(existingOrders));

      setOrderId(order_id);

      // Redirect to Stripe checkout
      client.utils.openUrl(url);
    } catch (err: any) {
      const msg = err?.data?.detail || err?.response?.data?.detail || err?.message || "Failed to start checkout. Please try again.";
      setError(msg);
      setLoading(false);
    }
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
          <p className="text-muted-foreground text-lg mb-2">
            Thank you for your order. A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>.
          </p>
          <div className="my-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Your Order ID</p>
            <p className="text-3xl font-bold text-primary font-serif">#{orderId}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Save this ID to track your order status
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/track-order">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Track Your Order
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setSubmitted(false);
                setOrderId(null);
                setFormData({ name: "", email: "", phone: "", address: "", quantity: "1" });
              }}
              variant="outline"
              className="!bg-transparent border-2 border-primary text-primary"
            >
              Place Another Order
            </Button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Cross className="text-primary" size={16} />
              <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em]">
                Order Your Copy
              </p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Buy Now
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Order your copy of &ldquo;Illuminati One World Government Agenda Will
              Fail&rdquo; directly from the author. Secure checkout powered by Stripe.
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
              <div className="warm-card">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Order Details
                </h2>

                {error && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-4 p-4 bg-primary/5 rounded-lg">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary font-serif">
                        ${parseInt(formData.quantity || "1") * 20} USD
                      </span>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-6 shadow-lg shadow-primary/20"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={20} />
                          Redirecting to Checkout...
                        </>
                      ) : (
                        <>
                          Proceed to Secure Checkout
                          <ArrowRight className="ml-2" size={20} />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      You will be redirected to Stripe for secure payment
                    </p>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Order Summary */}
            <AnimatedSection direction="right">
              <div className="sticky top-28">
                {/* Book Preview */}
                <div className="warm-card mb-6">
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
                      <p className="text-xl font-bold text-primary font-serif">$20 USD</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-muted-foreground">
                      Secure checkout powered by Stripe
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
                      Order confirmation sent via email
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