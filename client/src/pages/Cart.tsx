import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";

export default function Cart() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container py-4">
          <Link href="/">
            <a className="flex items-center gap-2 text-accent hover:text-accent/80">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link href="/products">
                <a>
                  <Button className="mt-4 bg-accent hover:bg-accent/90">
                    Continue Shopping
                  </Button>
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-accent">$0.00</span>
            </div>
            <Button disabled className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
