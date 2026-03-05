import { useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Package, Truck, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function OrderTracking() {
  const params = useParams();
  const orderNumber = params?.orderNumber;
  const [searchOrder, setSearchOrder] = useState(orderNumber || "");

  const { data: order } = trpc.orders.getByNumber.useQuery(
    { orderNumber: searchOrder },
    { enabled: !!searchOrder }
  );

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
        <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <Input
              placeholder="Enter order number (e.g., ORD-XXXXX)"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
            />
            <Button className="bg-accent hover:bg-accent/90">Search</Button>
          </div>
        </div>

        {order ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold mb-4">Order #{order.orderNumber}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-accent capitalize">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold">${order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ordered On</p>
                  <p className="text-lg font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Type</p>
                  <p className="text-lg font-semibold capitalize">{order.deliveryType}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="text-xl font-bold mb-6">Shipping Address</h3>
              <p className="font-semibold">{order.customerName}</p>
              <p className="text-muted-foreground">{order.deliveryAddress}</p>
              <p className="text-muted-foreground">{order.customerPhone}</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${order.status !== 'pending' ? 'bg-accent border-accent' : 'border-muted'}`} />
                  <div>
                    <p className="font-semibold">Processing</p>
                    <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${['shipped', 'delivered'].includes(order.status) ? 'bg-accent border-accent' : 'border-muted'}`} />
                  <div>
                    <p className="font-semibold">Shipped</p>
                    <p className="text-sm text-muted-foreground">On its way to you</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${order.status === 'delivered' ? 'bg-accent border-accent' : 'border-muted'}`} />
                  <div>
                    <p className="font-semibold">Delivered</p>
                    <p className="text-sm text-muted-foreground">Order completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : searchOrder ? (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">Order not found</p>
            <p className="text-sm text-muted-foreground">Please check your order number and try again</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">Enter your order number to track your shipment</p>
          </div>
        )}
      </div>
    </div>
  );
}
