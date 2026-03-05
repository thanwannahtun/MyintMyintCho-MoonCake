import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container py-4">
          <Link href="/cart">
            <a className="flex items-center gap-2 text-accent hover:text-accent/80">
              <ChevronLeft className="w-4 h-4" />
              Back to Cart
            </a>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-8">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                  <Input placeholder="Email" type="email" className="md:col-span-2" />
                  <Input placeholder="Phone" className="md:col-span-2" />
                  <Input placeholder="Address" className="md:col-span-2" />
                  <Input placeholder="City" />
                  <Input placeholder="Postal Code" />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Options</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="delivery" className="mr-4" defaultChecked />
                    <span className="font-semibold">Standard Delivery (3-5 days)</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="delivery" className="mr-4" />
                    <span className="font-semibold">Express Delivery (1-2 days)</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="delivery" className="mr-4" />
                    <span className="font-semibold">Store Pickup</span>
                  </label>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="payment" className="mr-4" defaultChecked />
                    <span className="font-semibold">Bank Transfer</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="payment" className="mr-4" />
                    <span className="font-semibold">MobilePay</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input type="radio" name="payment" className="mr-4" />
                    <span className="font-semibold">Online Wallet</span>
                  </label>
                </div>
              </div>
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
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
