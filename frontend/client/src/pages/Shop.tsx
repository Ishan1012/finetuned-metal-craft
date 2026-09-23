import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { shopProducts as defaultProducts } from "@/data/products";
import { productAPI } from "@/lib/api-services";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product, materials } from "@/types/Types";

const shopCategories = [
  "All",
  "Name Plates",
  "Railings",
  "Gates & Grills",
  "Decorative Panels",
  "Elevation",
  "Custom"
];

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name-asc">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const result = await productAPI.getProducts();

        if (result && Array.isArray(result) && result.length > 0) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Network error while fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMaterial, sortBy]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      // 1. Search filter
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Category filter
      if (selectedCategory !== "All") {
        const cat = (p.category || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (sel === "gates & grills") {
          if (!cat.includes("gate") && !cat.includes("grill") && !name.includes("gate") && !name.includes("grill") && !desc.includes("grill") && !desc.includes("gate")) {
            return false;
          }
        } else if (sel === "decorative panels") {
          if (!cat.includes("panel") && !cat.includes("decorative") && !cat.includes("divider") && !cat.includes("wall art") && !cat.includes("art") && !name.includes("panel") && !desc.includes("panel")) {
            return false;
          }
        } else {
          if (!cat.includes(sel) && !name.includes(sel) && !desc.includes(sel)) {
            return false;
          }
        }
      }

      // 3. Material filter
      if (selectedMaterial !== "All") {
        const mat = (p.material || "").toLowerCase();
        const selMat = selectedMaterial.toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        if (!mat.includes(selMat) && !desc.includes(selMat) && !name.includes(selMat)) {
          return false;
        }
      }

      return true;
    });

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedMaterial, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedMaterial("All");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedMaterial !== "All" ||
    sortBy !== "featured";

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-[url('/images/img5.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Ready-Made Products
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-xl text-primary-foreground/80">
                Browse our curated collection of laser-cut name plates, decorative panels, and architectural elements.
                For bespoke dimensions, request a custom quote.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: Search, Category Pills, Filters & Sort */}
          <div className="space-y-6 mb-10">
            {/* Search Bar */}
            <ScrollReveal animation="fade-up">
              <div className="max-w-md mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search name plates, railings, panels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                    Clear
                  </Button>
                )}
              </div>
            </ScrollReveal>

            {/* Category Pills */}
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {shopCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full text-xs sm:text-sm transition-all"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </ScrollReveal>

            {/* Secondary Filter Row: Material & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border">
              {/* Material Dropdown / Quick Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Material:
                </span>
                {["All", "Stainless Steel", "Mild Steel", "Aluminium", "Brass"].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      selectedMaterial === mat
                        ? "bg-gold/15 text-gold font-semibold border border-gold/40"
                        : "text-muted-foreground hover:text-foreground bg-muted/50"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 ml-auto">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs text-muted-foreground hover:text-foreground h-8"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs bg-background border border-border rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Listing */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold mb-3" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                <span>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedProducts.length)} of{" "}
                  {filteredAndSortedProducts.length} items
                </span>
                {totalPages > 1 && (
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "gold" : "outline"}
                        size="sm"
                        className="w-9 h-9 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed border-border max-w-md mx-auto">
              <p className="text-lg font-medium text-foreground mb-2">No products match your criteria</p>
              <p className="text-sm text-muted-foreground mb-6">
                Try clearing active filters or searching for different keywords.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}