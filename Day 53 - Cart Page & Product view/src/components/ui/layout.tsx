import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./input";
import { Search, ShoppingCart } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Badge } from "./badge";
import { Button } from "./button";
import { getCartItemCount } from "@/lib/utils";

function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = getCartItemCount(items);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    function loadCategories() {
      fetch("https://dummyjson.com/products/category-list")
        .then((res) => res.json())
        .then(setCategories);
    }
    loadCategories();
  }, []);

  function onCategoryChange(updatedCategory: string) {
    console.log(updatedCategory);
    if (updatedCategory === "all") {
      navigate("/");
    } else {
      navigate(`/?category=${updatedCategory}`);
    }
  }
  function searchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    if (event.target.value === "") {
      navigate("/");
    }
  }

  function onSearchClick() {
    if (search) {
      navigate(`/?search=${search}`);
    }
  }

  return (
    <header className="p-4 grid grid-cols-[auto_1fr_auto] gap-2">
      <section className="flex items-center">App logo</section>
      <section className="grid grid-cols-[auto_1fr] gap-2 place-content-center">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder={"All"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="capitalize">
              all
            </SelectItem>
            {categories?.length > 0
              ? categories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
        <section className="shadow-sm transition-colors border border-input rounded-lg px-2 flex items-center focus-within:ring-1 focus-within:ring-primary">
          <Input
            type="search"
            value={search}
            onChange={searchChange}
            className="border-none shadow-none focus-visible:ring-0  outline-none"
            placeholder="Search..."
          />
          <Search className="size-6 text-muted-foreground" onClick={onSearchClick} />
        </section>
      </section>
      <section className="flex items-center gap-2">
        <section className="relative size-10 flex ">
          {items.length > 0 ? (
            <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-[.5rem] size-4 p-2 rounded-full bg-primary/80 grid place-content-center">
              <span>{totalItems}</span>
            </Badge>
          ) : null}
          <Button onClick={() => navigate("/cart")} className="w-full h-full" variant={"ghost"} size={"sm"}>
            <ShoppingCart className="size-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          </Button>
        </section>
        <Avatar>
          <AvatarImage src="" alt="username" />
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
      </section>
    </header>
  );
}
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>this is the footer</footer>
    </>
  );
}
