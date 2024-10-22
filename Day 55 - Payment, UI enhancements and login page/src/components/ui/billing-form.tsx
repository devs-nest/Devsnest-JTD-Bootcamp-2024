import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectItem, SelectTrigger } from "./select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().min(4, { message: "Card number is required" }),
  expires: z.string().min(1, { message: "Expires is required" }),
  year: z.string().min(4, { message: "Year is required" }),
  cvc: z.string().min(3, { message: "CVC is required" }),
});
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export type BillingFormValues = z.infer<typeof formSchema>;
export default function BillingForm({ onFormSubmit }: { onFormSubmit: (data: BillingFormValues) => void }) {
  const form = useForm<BillingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  function onSubmit(data: BillingFormValues) {
    console.log(data);
    onFormSubmit(data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Enter your billing information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Last" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="4242 4242 4242 4242" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="expires"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <Select onValueChange={onChange} {...rest}>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map((month, index) => (
                            <SelectItem key={month} value={`${index + 1}`}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Select onValueChange={onChange} {...rest}>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, index) => (
                            <SelectItem key={index} value={`${new Date().getFullYear() + index}`}>
                              {new Date().getFullYear() + index}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <Button type="submit" className="w-full">
              Pay Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
``;
