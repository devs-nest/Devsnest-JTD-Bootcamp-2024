import AddressForm, { AddressFormValues } from "@/components/ui/address-form";
import BillingForm from "@/components/ui/billing-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Payment() {
  const [activeTab, setActiveTab] = useState("address");

  function onAddressFormSubmit(data: AddressFormValues) {
    console.log(data);
    setActiveTab("billing");
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
        <BillingForm />
      </TabsContent>
    </Tabs>
  );
}
