import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTop } from "@/components/BackToTop";
import Index from "@/pages/Index";
import BookDetails from "@/pages/BookDetails";
import About from "@/pages/About";
import Order from "@/pages/Order";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Admin from "@/pages/Admin";
import TrackOrder from "@/pages/TrackOrder";
import PaymentSuccess from "@/pages/PaymentSuccess";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/NotFound";
import AuthCallback from "@/pages/AuthCallback";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book" element={<BookDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<Order />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;