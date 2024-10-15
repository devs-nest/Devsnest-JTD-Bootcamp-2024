import React, { useEffect, useState } from "react";
import { ProductsResponse } from "../types";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertToRupee, formatPercentage, formatPrice, sortProductsByPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Reviews from "@/components/ui/reviews";
import { ShoppingCart } from "lucide-react";
import Filters from "@/components/ui/filters";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function processResponse(data: ProductsResponse) {
  return {
    ...data,
    products: data.products.map((product) => ({ ...product, price: convertToRupee(product.price) })),
  };
}

export function loader({ request }: { request: any }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const defaultLimit = 15;
  const page = url.searchParams.get("page");
  const skip = page ? defaultLimit * (parseInt(page) - 1) : 0;

  if (search) {
    return fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then(processResponse);
  }
  if (category && category !== "all") {
    return fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then(processResponse);
  }
  return fetch(`https://dummyjson.com/products?limit=${defaultLimit}&skip=${skip}`)
    .then((res) => res.json())
    .then(processResponse);
}

export default function Dashboard() {
  const { products, total, skip, limit } = useLoaderData() as ProductsResponse;

  const numberOfPages = Math.round(total / limit);
  const pageNumber = Math.ceil(skip / limit) + 1;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

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
    } else {
      setSortBy("");
      setFilteredProducts(products);
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

  function onPageChange(pageNumber: number, event: React.MouseEvent) {
    event.preventDefault();
    console.log({ pageNumber });
    navigate(`/?page=${pageNumber}`);
  }

  return (
    <section className="px-4 flex flex-col gap-4">
      <header className="flex items-center justify-end">
        <Filters
          minPrice={sortedProducts.at(0)?.price}
          maxPrice={sortedProducts.at(-1)?.price}
          onPriceChange={onPriceChange}
          onSortingChanged={onSortingChanged}
        />
      </header>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {[...Array(numberOfPages).fill(0)].map((_, index) => (
            <PaginationItem>
              <PaginationLink
                onClick={(event) => onPageChange(index + 1, event)}
                isActive={pageNumber === index + 1}
                href="#"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
