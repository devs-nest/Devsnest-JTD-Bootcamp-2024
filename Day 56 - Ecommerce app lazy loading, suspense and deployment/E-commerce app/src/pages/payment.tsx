import AddressForm, { AddressFormValues } from "@/components/ui/address-form";
import BillingForm, { BillingFormValues } from "@/components/ui/billing-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clearCart } from "@/features/cartSlice";
import { getCartSubtotal } from "@/lib/utils";
import { RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Payment() {
  const { items } = useSelector((state: RootState) => state.cart);
  const [activeTab, setActiveTab] = useState("address");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onAddressFormSubmit(data: AddressFormValues) {
    console.log(data);
    setActiveTab("billing");
  }
  function onBillingFormSubmit(data: BillingFormValues) {
    console.log(data);

    const promise = new Promise<{ subTotal: string }>((resolve) => {
      setTimeout(() => {
        resolve({ subTotal: getCartSubtotal(items) });
      }, 2000);
    });
    toast.promise(promise, {
      loading: "Placing order...",
      success: ({ subTotal }) => {
        dispatch(clearCart());
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return `Order placed! Payment of: ₹${subTotal} is successful.`;
      },
    });
  }
  return (
    <Tabs defaultValue="address" value={activeTab} onValueChange={setActiveTab} className="w-[400px] mx-auto">
      <TabsList>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="address">
        <AddressForm onFormSubmit={onAddressFormSubmit} />
      </TabsContent>
      <TabsContent value="billing">
        <BillingForm onFormSubmit={onBillingFormSubmit} />
      </TabsContent>
    </Tabs>
  );
}
