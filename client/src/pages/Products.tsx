import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft } from "lucide-react";

/* =======================
   Mock Data
======================= */

const CATEGORIES = [
  { id: 1, name: "Mooncakes", slug: "mooncake" },
  { id: 2, name: "Snacks", slug: "snacks" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Coffee Mooncake",
    slug: "coffee-mooncake",
    description: "Rich coffee-flavored Burmese mooncake.",
    basePrice: 12.5,
    categorySlug: "mooncake",
  },
  {
    id: 2,
    name: "Classic Mooncake",
    slug: "classic-mooncake",
    description: "Traditional Burmese mooncake recipe.",
    basePrice: 10,
    categorySlug: "mooncake",
  },
];

/* =======================
   Data Functions
======================= */

function getCategories() {
  return CATEGORIES;
}

function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.categorySlug === slug).map((p) => ({
    products: p, // ⬅️ keep original shape
  }));
}

/* =======================
   Component
======================= */

export default function Products() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const categorySlug = params.get("category") || "mooncake";

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    setProducts(getProductsByCategory(categorySlug));
  }, [categorySlug]);

  const filteredProducts =
    products.filter((p) =>
      p.products.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-accent/10 py-12">
        <div className="container">
          <Link href="/">
            <a className="flex items-center gap-2 text-accent hover:text-accent/80 mb-4">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Link>
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Browse our delicious collection of authentic Burmese snacks
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 border sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/products?category=${cat.slug}`}>
                    <a
                      className={`block px-4 py-2 rounded-lg ${categorySlug === cat.slug
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                        }`}
                    >
                      {cat.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Link
                    key={item.products.id}
                    href={`/products/${item.products.slug}`}
                  >
                    <a className="group">
                      <div className="bg-card rounded-xl border hover:shadow-lg transition">
                        <div className="h-64 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                          <div className="text-6xl">🥐</div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent">
                            {item.products.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {item.products.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-accent">
                              ${item.products.basePrice}
                            </span>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
