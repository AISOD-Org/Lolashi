import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Lock, Package, Eye, EyeOff } from "lucide-react";

interface Order {
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

const ADMIN_PASSWORD = "lolashi2023";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered"];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem("lolashi_orders");
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem("lolashi_orders", JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center bg-muted/30">
        <AnimatedSection className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl border border-border/50 p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="text-primary" size={28} />
              </div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Admin Access
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Enter your password to view orders
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="h-12 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12"
              >
                Sign In
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="py-8 md:py-12 bg-muted/30 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Order Dashboard
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                View and manage all customer orders
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="!bg-transparent border-border text-muted-foreground"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-3xl font-bold text-foreground mt-1">
                {orders.length}
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold text-primary mt-1">
                ${orders.reduce((sum, o) => sum + o.total, 0)} USD
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <p className="text-sm text-muted-foreground">Books Sold</p>
              <p className="text-3xl font-bold text-foreground mt-1">
                {orders.reduce((sum, o) => sum + o.quantity, 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Package className="text-muted-foreground" size={28} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                No Orders Yet
              </h3>
              <p className="text-muted-foreground">
                Orders placed through the website will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      #
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Address
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Qty
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {order.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {order.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {order.phone || "—"}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground max-w-[200px] truncate">
                        {order.address}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {order.quantity}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">
                        ${order.total}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {order.date}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}