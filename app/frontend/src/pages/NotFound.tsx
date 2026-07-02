import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Cross } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Cross className="text-primary/30" size={24} />
        </div>
        <h1 className="font-serif text-7xl md:text-8xl font-bold text-primary/20 mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          It seems this page has wandered off the path. Let us guide you back to
          where you need to be.
        </p>
        <div className="scripture-quote mb-8 text-left max-w-xs mx-auto">
          <p className="text-sm">&ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;</p>
          <p className="text-xs mt-1 not-italic">— Psalm 119:105</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
              <Home className="mr-2" size={16} />
              Go Home
            </Button>
          </Link>
          <Link to="/book">
            <Button variant="outline" className="!bg-transparent border-2 border-primary text-primary">
              View the Book
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}