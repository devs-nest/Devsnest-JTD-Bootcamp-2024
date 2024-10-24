import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Rating from "@/components/ui/rating";
import Reviews from "@/components/ui/reviews";
import { Separator } from "@/components/ui/separator";
import { addToCart } from "@/features/cartSlice";
import { convertToRupee, formatPercentage, formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export function loader({ params }: LoaderFunctionArgs<{ productId: string }>) {
  const { productId } = params;

  return fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => ({ ...product, price: convertToRupee(product.price) }));
}

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return firstName.charAt(0) + lastName.charAt(0);
}
export default function ProductInfo() {
  const product = useLoaderData() as Product;

  const {
    images,
    title,
    description,
    price,
    brand,
    warrantyInformation,
    reviews,
    dimensions,
    shippingInformation,
    discountPercentage,
    returnPolicy,
    rating,
  } = product;

  const dispatch = useDispatch();

  function addProductToCart() {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  return (
    <article className="p-4">
      <Card>
        <CardContent className="mt-6 grid grid-cols-[1fr_2fr] gap-4">
          <Card>
            <CardContent>
              <img className="aspect-square" src={images[0]} alt={title} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <section className="flex items-center gap-2 cursor-pointer">
                    <span>{rating}</span>
                    <Rating rating={rating} />
                    <ChevronDown />
                    <Separator className="h-6 w-[.125rem]" orientation="vertical" />
                    {reviews.length} reivews
                  </section>
                </HoverCardTrigger>
                <HoverCardContent align="start">
                  <Reviews reviews={reviews} />
                </HoverCardContent>
              </HoverCard>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="space-y-10">
              <article className="flex items-center gap-2">
                <p className="relative">
                  <span className="absolute text-xs font-semibold left-0 top-1/2 -translate-y-1/2">₹</span>
                  <span className="ml-2 text-xl">{formatPrice(price)}</span>
                </p>
                {discountPercentage > 1 ? (
                  <Badge className="text-green-400" variant="outline">
                    {formatPercentage(discountPercentage)}% off
                  </Badge>
                ) : null}
              </article>
              <section className="grid grid-cols-2 gap-4">
                <article className="flex flex-col gap-2">
                  <h1 className="text-lg">Brand - {brand}</h1>
                  <h2 className="text-lg font-semibold">Dimensions</h2>
                  <p className="text-sm font-medium">
                    {dimensions.height} x {dimensions.width} x {dimensions.depth}
                  </p>
                </article>
                <article className="flex flex-col gap-2 font-semibold">
                  <h1>{warrantyInformation}</h1>
                  <h2>{shippingInformation}</h2>
                  <h2>{returnPolicy}</h2>
                </article>
                <Button onClick={addProductToCart} className="col-span-2 w-full flex items-center gap-2">
                  <ShoppingCart className="size-6 " />
                  Add to cart
                </Button>
              </section>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <article className="flex flex-col gap-4">
                  {reviews.map(({ reviewerName, reviewerEmail, comment, date, rating }, index) => (
                    <>
                      <article className="flex flex-col gap-4" key={reviewerEmail}>
                        <header className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{getInitials(reviewerName)}</AvatarFallback>
                          </Avatar>
                          <h1>{reviewerName}</h1>
                          <Separator className="h-6 w-[.125rem]" orientation="vertical" />
                          <p>{reviewerEmail}</p>
                          <Separator className="h-6 w-[.125rem]" orientation="vertical" />
                          <p>{new Date(date).toDateString()}</p>
                        </header>
                        <section className="flex gap-2 items-center">
                          <Rating rating={rating} />
                          <p>{comment}</p>
                        </section>
                      </article>
                      {index !== reviews.length - 1 && <Separator />}
                    </>
                  ))}
                </article>
              ) : (
                <h2>No reviews available</h2>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </article>
  );
}
