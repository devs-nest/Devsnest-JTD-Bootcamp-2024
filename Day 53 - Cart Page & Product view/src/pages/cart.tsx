import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CartItem from "@/components/ui/cart-item";
import { formatPrice, getCartItemCount } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = getCartItemCount(items);

  function getCartSubtotal() {
    const subtotal = items.reduce((prev, current) => prev + current.product.price * current.quantity, 0);
    return formatPrice(subtotal);
  }

  return (
    <article className="p-4 flex flex-col gap-4">
      <h1 className="text-xl">Shopping Cart</h1>
      <section className="grid grid-cols-[2fr_1fr] gap-4">
        <section className="grid grid-flow-row gap-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </section>
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Subtotal</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
              {totalItems > 1 ? (
                <span className="text-sm font-semibold">({totalItems} items)</span>
              ) : (
                <span className="text-sm font-semibold">({totalItems} item)</span>
              )}
              <span>₹{getCartSubtotal()}</span>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Buy</Button>
            </CardFooter>
          </Card>
        </section>
      </section>
    </article>
  );
}