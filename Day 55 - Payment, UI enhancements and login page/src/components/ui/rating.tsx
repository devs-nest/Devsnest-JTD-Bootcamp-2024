import { Star } from "lucide-react";

export default function Rating({ rating }: { rating: number }) {
  return (
    <section className="grid grid-flow-col gap-1 place-items-center">
      {new Array(Math.round(rating)).fill(0).map(() => (
        <Star className="size-4 fill-primary" />
      ))}
    </section>
  );
}
