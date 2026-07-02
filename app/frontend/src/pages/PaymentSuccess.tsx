import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CheckCircle, ArrowRight, Loader2, XCircle } from "lucide-react";
import { createClient } from "@metagptx/web-sdk";

const client = createClient();

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setVerifying(false);
      setError("No payment session found.");
      return;
    }

    const verify = async () => {
      try {
        const response = await client.apiCall.invoke({
          url: "/api/v1/payment/verify_payment",
          method: "POST",
          data: { session_id: sessionId },
        });

        const data = response.data;
        if (data.status === "paid") {
          setSuccess(true);
          setOrderId(data.order_id);
        } else {
          setError(`Payment status: ${data.status}. Please contact support if you believe this is an error.`);
        }
      } catch (err: any) {
        const msg = err?.data?.detail || err?.response?.data?.detail || err?.message || "Verification failed.";
        setError(msg);
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
        <AnimatedSection className="text-center max-w-md mx-auto px-4">
          <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Verifying Payment...
          </h2>
          <p className="text-muted-foreground">
            Please wait while we confirm your payment.
          </p>
        </AnimatedSection>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
        <AnimatedSection className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="text-red-500" size={40} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Payment Not Confirmed
          </h2>
          <p className="text-muted-foreground text-lg mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/order">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Try Again
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="!bg-transparent border-2 border-primary text-primary">
                Contact Support
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
      <AnimatedSection className="text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
          Payment Successful!
        </h2>
        <p className="text-muted-foreground text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Thank you for your purchase. A confirmation email has been sent to your email address.
        </p>
        <div className="my-6 p-5 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Your Order ID</p>
          <p className="text-3xl font-bold text-primary font-serif">#{orderId}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Save this ID to track your order status
          </p>
        </div>
        <p className="text-muted-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          May the Lord bless you abundantly as you read this book.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/track-order">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
              Track Your Order
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="!bg-transparent border-2 border-primary text-primary">
              Back to Home
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}