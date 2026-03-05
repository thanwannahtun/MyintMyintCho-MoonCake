import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

/* =======================
   Sample Mock Data
======================= */

const PRODUCTS = [
  {
    id: 1,
    slug: "coffee-mooncake",
    name: "Coffee Mooncake",
    description: "A rich coffee-flavored mooncake.",
    longDescription:
      "A premium Burmese-style mooncake infused with deep coffee aroma.",
    basePrice: 12.5,
    stock: 120,
    rating: 4.6,
    reviewCount: 24,
  },
];

const VARIANTS = [
  {
    id: 1,
    productId: 1,
    name: "Classic",
    weight: "150g",
  },
  {
    id: 2,
    productId: 1,
    name: "Premium",
    weight: "200g",
  },
];

const REVIEWS = [
  { id: 1, productId: 1, rating: 5 },
  { id: 2, productId: 1, rating: 4 },
];

/* =======================
   Data Functions
======================= */

function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

function getVariantsByProduct(productId: number) {
  return VARIANTS.filter((v) => v.productId === productId);
}

function getReviewsByProduct(productId: number) {
  return REVIEWS.filter((r) => r.productId === productId);
}

/* =======================
   Component
======================= */

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const foundProduct = getProductBySlug(slug);
    setProduct(foundProduct);

    if (foundProduct) {
      setVariants(getVariantsByProduct(foundProduct.id));
      setReviews(getReviewsByProduct(foundProduct.id));
    }
  }, [slug]);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container py-4">
          <Link href="/products">
            <a className="flex items-center gap-2 text-accent hover:text-accent/80">
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </a>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-8xl">🥐</div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold text-accent mb-2">
                ${product.basePrice}
              </p>
              <p className="text-muted-foreground">
                In stock: {product.stock} units
              </p>
            </div>

            <p className="mb-8 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Choose Variant</h3>
                <div className="grid grid-cols-2 gap-4">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`p-4 rounded-lg border-2 ${selectedVariant === variant.id
                        ? "border-accent bg-accent/10"
                        : "border-border"
                        }`}
                    >
                      <p className="font-semibold">{variant.name}</p>
                      {variant.weight && (
                        <p className="text-sm text-muted-foreground">
                          {variant.weight}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded-lg"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-accent py-6 text-lg"
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
