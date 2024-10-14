import { Slider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formatPrice } from "@/lib/utils";

import { useState } from "react";

export default function Filters({
  minPrice,
  maxPrice,
  onPriceChange,
  onSortingChanged,
}: {
  maxPrice: number;
  minPrice: number;
  onPriceChange: (value: number[]) => void;
  onSortingChanged: (value: string) => void;
}) {
  const [value, setValue] = useState([minPrice, maxPrice]);
  function onValueChange(value: number[]) {
    setValue(value);
    onPriceChange(value);
  }
  function onSortChange(value: string) {
    onSortingChanged(value);
  }
  const maxValue = Math.round(maxPrice);
  return (
    <section className="grid grid-cols-2">
      <section>
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Products By</SelectLabel>
              <SelectItem value="low">Price: Low to High</SelectItem>
              <SelectItem value="high">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <section className="flex items-center gap-2">
        <span>{formatPrice(value[0])}</span>
        <Slider value={value} max={maxValue} step={1} onValueChange={onValueChange} />
        <span>{formatPrice(value[1])}</span>
      </section>
    </section>
  );
}
