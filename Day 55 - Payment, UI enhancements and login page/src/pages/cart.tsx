import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CartItem from "@/components/ui/cart-item";
import { formatPrice, getCartItemCount, getCartSubtotal } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = getCartItemCount(items);
  const navigate = useNavigate();

  function proceedToPayment() {
    navigate("/payment");
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
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Subtotal</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
              {totalItems > 1 ? (
                <span className="text-sm font-semibold">({totalItems} items)</span>
              ) : (
                <span className="text-sm font-semibold">({totalItems} item)</span>
              )}
              <span>₹{getCartSubtotal(items)}</span>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={proceedToPayment}>
                Buy
              </Button>
            </CardFooter>
          </Card>
        </section>
      </section>
    </article>
  );
}
