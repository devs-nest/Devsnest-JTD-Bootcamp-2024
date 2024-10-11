import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Header() {
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

  return (
    <header>
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
