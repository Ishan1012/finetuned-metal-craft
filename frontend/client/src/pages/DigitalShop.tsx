import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { shopProducts as defaultProducts } from "@/data/products";

import { productAPI } from "@/lib/api-services";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Types";

export default function DigitalShop() {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>(defaultProducts);
    const [isLoading, setIsLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(3500);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const result = await productAPI.getDigitalProducts();

                if (result) {
                    setProducts(result);
                } else {
                    console.error("Failed to fetch products:", result.message);
                }
            } catch (error) {
                console.error("Network error while fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <section className="relative py-16 lg:py-24 gradient-hero overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-[url('/images/digital_products.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"
                    aria-hidden="true"
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <ScrollReveal animation="fade-up" delay={0.1}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                                Digital Shop
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={0.2}>
                            <p className="text-xl text-primary-foreground/80">
                                Browse our Pre-designed CNC vector design file Here.
                                For custom designs, request a quote.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal animation="fade-up" className="mb-8">
                        <div className="max-w-md mx-auto flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="gold" type="button">
                                Search
                            </Button>
                        </div>
                    </ScrollReveal>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading products...</p>
                        </div>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <StaggerItem key={product.id}>
                                    <ProductCard product={product} />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No products found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}