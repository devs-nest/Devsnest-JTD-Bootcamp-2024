import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <h1>Cart</h1>
      {items.map((item) => (
        <div key={item.product.id}>
          <h2>{item.product.title}</h2>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
