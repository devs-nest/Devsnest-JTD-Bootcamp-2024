import React from "react";
import { ProductsResponse } from "../types";
import { useLoaderData } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertToRupee, formatPercentage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function loader() {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
}

export default function Dashboard() {
  const { products } = useLoaderData() as ProductsResponse;
  console.log(products);

  return (
    <section className="px-4">
      <h1>Dashboard</h1>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {products.map(({ title, description, id, thumbnail, price, discountPercentage }) => {
          return (
            <Card key={id} className="flex flex-col">
              <CardHeader className="-m-6">
                <img className="rounded-t-xl object-contain aspect-square" src={thumbnail} alt={title} />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 mt-4">
                <article className="flex items-center gap-2">
                  <p className="relative">
                    <span className="absolute text-xs font-semibold left-0 top-1/2 -translate-y-1/2">₹</span>
                    <span className="ml-2 text-xl">{convertToRupee(price)}</span>
                  </p>
                  {discountPercentage > 1 ? (
                    <Badge className="text-green-400" variant={"outline"}>
                      {formatPercentage(discountPercentage)}% off
                    </Badge>
                  ) : null}
                </article>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription className="line-clamp-1">{description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </section>
  );
}
