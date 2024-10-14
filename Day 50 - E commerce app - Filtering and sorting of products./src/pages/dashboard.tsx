import React, { useEffect, useState } from "react";
import { ProductsResponse } from "../types";
import { useLoaderData } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertToRupee, formatPercentage, formatPrice, sortProductsByPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Reviews from "@/components/ui/reviews";
import { ShoppingCart } from "lucide-react";
import Filters from "@/components/ui/filters";

function processResponse(data: ProductsResponse) {
  return {
    ...data,
    products: data.products.map((product) => ({ ...product, price: convertToRupee(product.price) })),
  };
}

export function loader({ request }: { request: any }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  if (category && category !== "all") {
    return fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then(processResponse);
  }
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then(processResponse);
}

export default function Dashboard() {
  const { products } = useLoaderData() as ProductsResponse;

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const sortedProducts = sortProductsByPrice(products);

  function onSortingChanged(value: string) {
    if (value === "low") {
      setSortBy("asc");
      setFilteredProducts(sortProductsByPrice(filteredProducts));
    } else if (value === "high") {
      setFilteredProducts(sortProductsByPrice(filteredProducts, "desc"));
      setSortBy("desc");
    }
  }
  function onPriceChange([minPrice, maxPrice]: number[]) {
    console.log({ minPrice, maxPrice });
    const filteredItems = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    if (sortBy) {
      setFilteredProducts(sortProductsByPrice(filteredItems, sortBy as "asc" | "desc"));
    } else {
      setFilteredProducts(filteredItems);
    }
  }

  return (
    <section className="px-4">
      <h1>Dashboard</h1>
      <Filters
        minPrice={sortedProducts.at(0)?.price}
        maxPrice={sortedProducts.at(-1)?.price}
        onPriceChange={onPriceChange}
        onSortingChanged={onSortingChanged}
      />
      <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {filteredProducts.map(({ title, description, id, thumbnail, price, discountPercentage, tags, reviews }) => {
          return (
            <Card key={id} className="flex flex-col">
              <CardHeader className="-m-6">
                <img className="rounded-t-xl object-contain aspect-square" src={thumbnail} alt={title} />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 mt-4">
                <article className="flex items-center gap-2">
                  <p className="relative">
                    <span className="absolute text-xs font-semibold left-0 top-1/2 -translate-y-1/2">₹</span>
                    <span className="ml-2 text-xl">{formatPrice(price)}</span>
                  </p>
                  {discountPercentage > 1 ? (
                    <Badge className="text-green-400" variant={"outline"}>
                      {formatPercentage(discountPercentage)}% off
                    </Badge>
                  ) : null}
                </article>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription className="line-clamp-1">{description}</CardDescription>
                <HoverCard>
                  <HoverCardTrigger className="underline">View More</HoverCardTrigger>
                  <HoverCardContent>
                    <article className="flex flex-col gap-2">
                      <h1 className="font-semibold">{title}</h1>
                      <p className="text-sm">{description}</p>
                      <section className="flex gap-2 items-center">
                        {tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </section>
                      <Reviews reviews={reviews} />
                    </article>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </section>
  );
}
