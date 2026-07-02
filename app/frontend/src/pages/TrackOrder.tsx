import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface TrackedOrder {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  total: number;
  date: string;
  status: string;
}

const statusSteps = [
  { key: "Pending", label: "Order Placed", icon: Clock },
  { key: "Processing", label: "Processing", icon: Package },
  { key: "Shipped", label: "Shipped", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: CheckCircle },
];

function getStatusIndex(status: string): number {
  const idx = statusSteps.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

export default function TrackOrder() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState<"email" | "id">("email");
  const [results, setResults] = useState<TrackedOrder[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("lolashi_orders");
    if (!stored) {
      setResults([]);
      setSearched(true);
      return;
    }

    const allOrders: TrackedOrder[] = JSON.parse(stored);
    let filtered: TrackedOrder[] = [];

    if (searchType === "email") {
      filtered = allOrders.filter(
        (o) => o.email.toLowerCase() === searchValue.toLowerCase().trim()
      );
    } else {
      const orderId = parseInt(searchValue.trim());
      filtered = allOrders.filter((o) => o.id === orderId);
    }

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Order Tracking
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enter your email address or order ID to check the status of your
              order.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-white border-b border-border/50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <form onSubmit={handleSearch} className="space-y-5">
              {/* Search Type Toggle */}
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("email");
                    setSearchValue("");
                    setSearched(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                    searchType === "email"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Search by Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("id");
                    setSearchValue("");
                    setSearched(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                    searchType === "id"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Search by Order ID
                </button>
              </div>

              {/* Search Input */}
              <div>
                <Label
                  htmlFor="search"
                  className="text-sm font-medium mb-2 block"
                >
                  {searchType === "email"
                    ? "Email Address"
                    : "Order ID Number"}
                </Label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    id="search"
                    type={searchType === "email" ? "email" : "number"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                    placeholder={
                      searchType === "email"
                        ? "your@email.com"
                        : "e.g. 1, 2, 3"
                    }
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12"
              >
                <Search className="mr-2" size={18} />
                Track Order
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {searched && results.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-muted-foreground" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  No Orders Found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchType === "email"
                    ? "No orders found with that email address. Please check and try again."
                    : "No order found with that ID. Please check your order number and try again."}
                </p>
                <Link to="/order">
                  <Button
                    variant="outline"
                    className="!bg-transparent border-2 border-primary text-primary"
                  >
                    Place an Order
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}

          {results.map((order) => {
            const currentStep = getStatusIndex(order.status);

            return (
              <AnimatedSection key={order.id} className="mb-8 last:mb-0">
                <div className="bg-card rounded-xl border border-border/50 p-6 md:p-8">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.id}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {order.name}
                      </h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Placed on {order.date}
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-foreground mb-6">
                      Order Status
                    </h4>
                    <div className="relative">
                      {/* Progress Bar Background */}
                      <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{
                            width: `${
                              currentStep === 0
                                ? 0
                                : (currentStep / (statusSteps.length - 1)) * 100
                            }%`,
                          }}
                        />
                      </div>

                      {/* Steps */}
                      <div className="relative flex justify-between">
                        {statusSteps.map((step, idx) => {
                          const StepIcon = step.icon;
                          const isCompleted = idx <= currentStep;
                          const isCurrent = idx === currentStep;

                          return (
                            <div
                              key={step.key}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                  isCompleted
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white border-border text-muted-foreground"
                                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                              >
                                <StepIcon size={18} />
                              </div>
                              <p
                                className={`mt-2 text-xs font-medium text-center ${
                                  isCompleted
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Quantity
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {order.quantity} book{order.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Total
                      </p>
                      <p className="text-sm font-medium text-primary">
                        ${order.total} USD
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {order.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Delivery Address
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </div>
  );
}