import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export function loader({ params }: LoaderFunctionArgs<{ productId: string }>) {
  const { productId } = params;

  return fetch(`https://dummyjson.com/products/${productId}`).then((res) => res.json());
}
export default function ProductInfo() {
  const product = useLoaderData() as Product;
  console.log(product);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: {formatPrice(product.price)}</p>
      </CardContent>
    </Card>
  );
}
